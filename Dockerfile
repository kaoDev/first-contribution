FROM node:10-slim

LABEL version="1.0.0"
LABEL repository="https://github/kaoDev/first-contribution"
LABEL maintainer="Kalle Ott <kalle.ott@cap3.de>"

LABEL com.github.actions.name="first-contribution"
LABEL com.github.actions.description="Will create a comment on opened PRs from first contributors"
LABEL com.github.actions.icon="message-circle"
LABEL com.github.actions.color="#1910a9"

ADD package.json /package.json
ADD package-lock.json /package-lock.json
WORKDIR /
COPY . /

RUN npm ci

ENTRYPOINT ["node", "/index.js"]