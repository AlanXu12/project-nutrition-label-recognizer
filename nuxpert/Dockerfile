FROM node:8

# Create app directory
WORKDIR /usr/src/app

# Install app dependencies
COPY package*.json ./

RUN npm install

RUN npm install serve -g

# Bundle app source
COPY . .

# RUN npm run build

EXPOSE 3000

ENTRYPOINT [ "npm", "run", "dev"]