# Base image
FROM node:18

# Set working directory inside container
WORKDIR /app

# Copy package.json & package-lock.json
COPY package*.json ./

# Cài dependencies
RUN npm install

# Copy toàn bộ mã nguồn vào container
COPY . .

# Mở port 3000 (hoặc tùy port bạn dùng)
EXPOSE 4000

# Lệnh chạy app
CMD ["npm", "run", "dev"]
