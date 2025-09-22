# Dockerfile
FROM pytorch/pytorch:2.4.0-cuda12.1-cudnn8-runtime

# Set working dir
WORKDIR /workspace

# Copy repo into image
COPY . /workspace

# Install system deps (small)
RUN apt-get update && apt-get install -y --no-install-recommends \
    git \
    ffmpeg \
    libgl1 \
    && rm -rf /var/lib/apt/lists/*

# Upgrade pip and install Python deps (excluding torch which is provided by base image)
RUN python -m pip install --upgrade pip
COPY requirements.txt /workspace/requirements.txt
RUN pip install -r /workspace/requirements.txt

# Ensure environment variable (used by viton_pipeline)
ENV VITON_DIR=/workspace

# Expose the FastAPI port
EXPOSE 8000

# Start the API
CMD ["uvicorn", "app:app", "--host", "0.0.0.0", "--port", "8000"]
