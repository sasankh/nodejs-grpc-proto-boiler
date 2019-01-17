
# Base Image
FROM node:10.15.0-alpine

WORKDIR /srv/www/nodejs_service/

# Install dependencies
COPY ./package.json ./
RUN npm install
COPY ./ ./

# Start command
CMD ["npm", "start"]
