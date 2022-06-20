FROM node:16

WORKDIR /code/quiz-api

RUN npm install -g npm@8.12.2
RUN npm i -g @nestjs/cli

USER node
