FROM node:10

WORKDIR /usr/src/app/backend

COPY ./backend/package*.json ./

RUN npm install

COPY . ../

EXPOSE 3000
  
WORKDIR /usr/src/app/backend

CMD ["npm", "start"]