import requests
import zipfile
import io
import os

url = "https://core-missouri-quarterly-repeated.trycloudflare.com/tryon"

files = {
    "cloth": ("1.jpg", open("datasets/test/cloth/1.jpg", "rb"), "image/jpeg"),
}

print("📤 Sending request to API...")
resp = requests.post(url, files=files)

if resp.status_code == 200:
    content_type = resp.headers.get("content-type", "")

    if "image" in content_type:
        # Single result
        with open("result.jpg", "wb") as f:
            f.write(resp.content)
        print("✅ Single result saved as result.jpg")

    elif "zip" in content_type:
        # Multiple results
        zip_path = "results.zip"
        with open(zip_path, "wb") as f:
            f.write(resp.content)
        print(f"✅ Zip file saved as {zip_path}")

        # Extract zip
        out_dir = "results"
        os.makedirs(out_dir, exist_ok=True)
        with zipfile.ZipFile(zip_path, "r") as zip_ref:
            zip_ref.extractall(out_dir)
        print(f"📂 Extracted all results to {out_dir}/")

    else:
        print("⚠️ Unknown response type:", content_type)

else:
    print("❌ Error", resp.status_code, resp.text)
