FROM node:10

WORKDIR /app

COPY package.json ./

RUN npm install --silent

COPY . . 

ENV NODE_ENV development

EXPOSE 5000

CMD ["./entrypoint.sh"]