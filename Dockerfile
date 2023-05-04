FROM node:18-buster-slim

WORKDIR /app

# Install Xvfb, wget and curl
RUN apt-get update && apt-get install -yq xvfb wget curl

# Install Google Chrome
RUN wget https://dl.google.com/linux/direct/google-chrome-stable_current_amd64.deb && apt install -yq ./google-chrome-stable_current_amd64.deb

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application files
COPY . .

# Set the entrypoint
ENTRYPOINT ["./entry.sh"]
