FROM node

WORKDIR /usr/app

#de onde ta vindo para onde vai
COPY package.json ./

RUN npm install

COPY . .

EXPOSE 3333

CMD ["npm","run","dev"]