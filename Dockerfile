FROM node:8.11.1

WORKDIR /todoapp

COPY package*.json .
RUN yarn install

EXPOSE 8090
COPY . .
CMD npm run dev
