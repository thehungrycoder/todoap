FROM node:jessie

WORKDIR ./

COPY package*.json ./
RUN yarn install

# copies source code to img
COPY . .

#todo read port from .env
EXPOSE 8080
CMD [ "npm", "start" ]
