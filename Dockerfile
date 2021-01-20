FROM node:lts
  WORKDIR /home/ubuntu/valevaledor
  COPY . .  
  RUN npm install
  CMD npm start