# Use a Node.js base image
FROM node:20.10 as build

# Set working directory
WORKDIR /app

# Copy package.json and package-lock.json to the working directory
COPY package*.json ./

# Install dependencies
RUN npm install --force

# Copy the entire project to the working directory
COPY . .

# Build the React app
RUN npm run build

# Use Nginx as a lightweight server to serve the frontend
FROM nginx:latest

# Copy the built React app from the previous stage to the Nginx server directory
COPY --from=build /app/build /usr/share/nginx/html

# Expose port 80
EXPOSE 80

# Start Nginx
CMD ["nginx", "-g", "daemon off;"]
