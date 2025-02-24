# Use Node.js image for development
FROM node:18

# Set working directory
WORKDIR /usr/src/app

# Copy package files first for better cache usage
COPY package*.json ./

# Install dependencies globally and locally
RUN npm install -g nodemon && npm install

# Copy all source code
COPY . .

# Expose port for Express.js server
EXPOSE 3000

# Start backend in development mode with nodemon
CMD ["npm", "run", "dev"]
