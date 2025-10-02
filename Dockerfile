FROM node:18-alpine
WORKDIR /app
COPY package.json .
RUN npm install
COPY proxy-media.js .
CMD ["node", "proxy-media.js"]
