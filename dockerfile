# Step 1: Build the application
FROM node:20-alpine AS builder

# Thiết lập thư mục làm việc
WORKDIR /app

# Sao chép các file cần thiết để cài đặt dependencies
COPY package.json package-lock.json ./

# Cài đặt dependencies với `npm ci --production --force`
RUN npm ci --production --force

# Sao chép mã nguồn và build ứng dụng
COPY . .
RUN npm run build

# Step 2: Serve the application
FROM node:20-alpine

# Thiết lập thư mục làm việc
WORKDIR /app

# Sao chép output từ bước build
COPY --from=builder /app .

# Xóa các file không cần thiết
RUN rm -rf src package-lock.json

# Cài đặt lại dependencies chỉ cho production (force nếu cần)
RUN npm ci --production --force

# Đặt biến môi trường production
ENV NODE_ENV=production

# Mở cổng 3000
EXPOSE 3000

# Khởi chạy ứng dụng
CMD ["npm", "start"]
