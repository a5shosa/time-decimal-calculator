FROM node:16.14.2-alpine

COPY app /app/
WORKDIR /app/

RUN yarn && yarn build

CMD [ "yarn", "start" ]