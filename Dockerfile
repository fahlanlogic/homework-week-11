FROM node:18-alpine3.19

WORKDIR /app

COPY package*.json .

COPY . .

RUN npm i

EXPOSE 8000

CMD ["npm", "run", "docker"]