# 1. Build Stage
FROM node:18-alpine AS builder
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm install
COPY . .
# This creates the 'dist' folder
RUN npm run build

# 2. Serve Stage
FROM nginx:alpine
# Copy the built files to Nginx
COPY --from=builder /app/dist /usr/share/nginx/html
# Remove default Nginx config
RUN rm /etc/nginx/conf.d/default.conf
# Copy our custom config (we will create this next)
COPY nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]