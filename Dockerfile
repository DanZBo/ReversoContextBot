FROM node:13
COPY . .
RUN npm i
CMD ["npm", "start"]