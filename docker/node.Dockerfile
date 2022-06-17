FROM node:16

WORKDIR /code/quiz-api

RUN npm i -g @nestjs/cli

USER node
