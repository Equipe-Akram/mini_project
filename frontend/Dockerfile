# Use Node.js image for development
FROM node:18

# Set working directory
WORKDIR /usr/src/app

# Copy package files first for faster build
COPY package*.json ./

# Install Vue CLI globally and dependencies
RUN npm install -g @vue/cli && npm install

# Copy the rest of your source code
COPY . .

# Expose development server port
EXPOSE 8080

# Start Vue development server with hot reload
CMD ["npm", "run", "serve"]
