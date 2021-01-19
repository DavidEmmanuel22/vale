FROM ubuntu:20.04
  WORKDIR /home/ubuntu/valevaledor
  COPY . .  
  RUN npm install
  CMD npm start