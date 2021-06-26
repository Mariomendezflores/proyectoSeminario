FROM node
RUN mkdir -p /opt/app
WORKDIR /opt/app
RUN npm install nodemon -g --quiet
RUN npm install typescript -g
RUN npm install ts-node -g
COPY . .
RUN npm install
EXPOSE 8000
RUN npm run build
CMD ["nodemon", "dist/server.js"]