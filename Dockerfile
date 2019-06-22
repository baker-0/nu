FROM node:10

WORKDIR /usr/src/app/backend

COPY ./backend/package*.json ./

RUN npm install

COPY . ../

EXPOSE 8888 3000
  
WORKDIR /usr/src/app/

CMD ["npm", "start"]