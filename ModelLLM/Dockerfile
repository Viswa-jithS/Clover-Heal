FROM python:3.10-slim

# Set the working directory
WORKDIR /app

# Install system dependencies required for some Python packages
RUN apt-get update && apt-get install -y \
    gcc \
    libpq-dev \
    && rm -rf /var/lib/apt/lists/*

# Copy the requirements file the container
COPY requirements.txt .

# Install dependencies (ignoring the large unneeded ones for development if any, but installing everything from requirements.txt)
RUN pip install --no-cache-dir -r requirements.txt

# Create a non-root user (Hugging Face Spaces requirement for Docker, usually runs as user 1000)
RUN useradd -m -u 1000 user
USER user
ENV HOME=/home/user \
    PATH=/home/user/.local/bin:$PATH

# Change the working directory to the user's home directory
WORKDIR $HOME/app

# Copy the rest of the application code
COPY --chown=user . $HOME/app

# Expose port 7860, the default for Hugging Face Spaces
EXPOSE 7860

# Command to run the application
CMD ["uvicorn", "app.main:app", "--host", "0.0.0.0", "--port", "7860"]
