FROM node:16.14.2-alpine

COPY app /app/
WORKDIR /app/

ARG NEXT_PUBLIC_GA_ID

ENV NEXT_TELEMETRY_DISABLED 1
ENV NEXT_PUBLIC_GA_ID ${NEXT_PUBLIC_GA_ID}

RUN yarn && yarn build

CMD [ "yarn", "start" ]