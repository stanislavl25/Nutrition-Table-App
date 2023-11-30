# Use the official Node.js image as the base
FROM node:16.13.0

# Set the working directory inside the container
WORKDIR /app

# Copy package.json and package-lock.json to the container and install dependencies
COPY package*.json ./
RUN npm install

# Copy the entire application code to the container
COPY . .

# Expose the port used by your application (if applicable)
EXPOSE 3000

# Define the startup command for your application
CMD ["npm", "start"]