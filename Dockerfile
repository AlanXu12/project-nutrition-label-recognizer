FROM node:8


# Create app directory
WORKDIR /usr/src/app

# Install app dependencies
COPY package*.json ./

# COPY JSON_Credential ./JSON_Credential

RUN npm install

# Bundle app source
COPY . .

RUN npm run front-end-install

RUN npm run front-end-build

EXPOSE 8080

# ENV IPADDRESS 172.17.0.2

ENTRYPOINT [ "npm", "start" ]