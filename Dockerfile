FROM node:10

WORKDIR /home/node/app

COPY rest-api /home/node/app/
RUN npm install

EXPOSE 3000

CMD ["npm", "run", "start"]
