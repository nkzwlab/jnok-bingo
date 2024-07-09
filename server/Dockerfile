# Use the official Deno image as the base image
FROM denoland/deno:alpine

# Set the working directory
WORKDIR /app

# Copy the Deno application code to the container
COPY . .

# Cache the dependencies
RUN deno cache main.ts

# Set the command to run the Deno application
CMD ["deno", "run", "-A", "main.ts"]

# Expose the port the application runs on
EXPOSE 8000
EXPOSE 8001
