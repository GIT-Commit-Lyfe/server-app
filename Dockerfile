FROM --platform=linux/amd64 node:lts-buster

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

EXPOSE 3000
EXPOSE 80

CMD ["npm", "start"]
