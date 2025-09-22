# app.py
import shutil
import logging
from pathlib import Path
from fastapi import FastAPI, UploadFile, File, Form
from fastapi.responses import FileResponse, JSONResponse
import uvicorn
import zipfile
import tempfile

from viton_pipeline import process_cloth_and_run, UPLOADS_DIR, VITON_DIR

logging.basicConfig(level=logging.INFO)
log = logging.getLogger("viton-api")

app = FastAPI(title="VITON-HD API")

ALLOWED_EXT = {".jpg", ".jpeg", ".png"}


def _secure_filename(name: str) -> str:
    name = Path(name).name
    name = name.replace(" ", "_")
    import re
    name = re.sub(r"[^A-Za-z0-9_.-]", "", name)
    if not name:
        raise ValueError("Invalid filename")
    return name


@app.post("/tryon")
async def tryon(cloth: UploadFile = File(...)):
    Path(UPLOADS_DIR).mkdir(parents=True, exist_ok=True)

    try:
        filename = _secure_filename(cloth.filename)
    except Exception:
        return JSONResponse({"error": "Invalid filename"}, status_code=400)

    if not Path(filename).suffix.lower() in ALLOWED_EXT:
        return JSONResponse({"error": "Unsupported file extension"}, status_code=400)

    upload_path = Path(UPLOADS_DIR) / filename
    with open(upload_path, "wb") as f:
        shutil.copyfileobj(cloth.file, f)

    try:
        result_paths = process_cloth_and_run(str(upload_path))
    except Exception as e:
        log.exception("Processing failed")
        return JSONResponse({"error": "Processing failed", "detail": str(e)}, status_code=500)

    # If only one result, return directly
    if len(result_paths) == 1:
        return FileResponse(result_paths[0], media_type="image/jpeg")

    # Otherwise zip all results
    tmp_zip = Path(tempfile.gettempdir()) / "results.zip"
    with zipfile.ZipFile(tmp_zip, "w") as zipf:
        for rp in result_paths:
            zipf.write(rp, Path(rp).name)

    return FileResponse(tmp_zip, media_type="application/zip", filename="results.zip")


if __name__ == "__main__":
    uvicorn.run("app:app", host="0.0.0.0", port=8000, reload=False)
