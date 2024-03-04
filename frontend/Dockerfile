# Use the official lightweight Node.js 14 image
FROM node:14-alpine

# Set working directory
WORKDIR /app

# Install dependencies
COPY package*.json ./

RUN npm install

# Copy frontend files
COPY . .

# Expose port
EXPOSE 3000

# Run frontend server
CMD ["npm", "start"]
