# Build stage
FROM node:18-alpine AS builder
WORKDIR /app
COPY . .

# Set environment variables for the build
ENV DATABASE_URL="postgresql://postgres:password@postgres:5432/mydb"
ENV API_KEY="example_api_key_12345"
ENV NODE_OPTIONS="--require ./patches/database-url-fix.js"

RUN npm install --legacy-peer-deps
RUN npm run build

# Production stage
FROM nginx:alpine
# Create nginx config
RUN mkdir -p /etc/nginx/conf.d
COPY --from=builder /app/out /usr/share/nginx/html
# Create a custom nginx config
RUN echo 'server { \
    listen 80; \
    server_name _; \
    root /usr/share/nginx/html; \
    index index.html; \
    # Redirect root to /documentation as specified in Next.js config \
    location = / { \
        return 301 /documentation; \
    } \
    # Handle static files \
    location / { \
        try_files $uri $uri.html $uri/ =404; \
    } \
    # Handle Next.js app routes with basePath \
    location /documentation/ { \
        try_files $uri $uri.html $uri/ /documentation/index.html; \
    } \
}' > /etc/nginx/conf.d/default.conf

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]