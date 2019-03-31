FROM node:8


# Create app directory
WORKDIR /usr/src/app

COPY package*.json ./

# Install app dependencies
RUN npm install

# Bundle app source
COPY . .

RUN npm run front-end-install

RUN npm run front-end-build

EXPOSE 8080

ENTRYPOINT [ "npm", "start" ]