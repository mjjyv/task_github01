# Stage 1: Runtime environment using ultra-lightweight Nginx Alpine
FROM nginx:alpine

# Set working directory
WORKDIR /usr/share/nginx/html

# Remove default nginx static assets
RUN rm -rf ./*

# Copy custom Nginx configuration
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Copy application files (HTML, CSS, JS modules)
COPY index.html ./
COPY style.css ./
COPY src/ ./src/

# Expose standard HTTP port
EXPOSE 80

# Run nginx in foreground
CMD ["nginx", "-g", "daemon off;"]
