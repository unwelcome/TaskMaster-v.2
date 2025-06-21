FROM node:23-slim

# RUN apt-get update && apt-get install -y iputils-ping

WORKDIR /app

COPY package*.json ./

COPY tsconfig.json ./

RUN npm install

COPY . .

# CMD ["npm", "run", "prod"]