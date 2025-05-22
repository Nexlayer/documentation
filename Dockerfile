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
# Copy our custom nginx configuration
COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]