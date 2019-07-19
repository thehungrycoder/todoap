FROM node:jessie

WORKDIR /todoapp

#COPY package*.json ./
RUN yarn install

# copies source code to img
#COPY . .

#todo read port from .env
EXPOSE 8090
CMD npm run dev
