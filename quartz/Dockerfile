FROM node:20-slim as builder
WORKDIR /usr/src/app
COPY package.json .
COPY package-lock.json* .
RUN npm ci

FROM node:20-slim
WORKDIR /usr/src/app
COPY --from=builder /usr/src/app/ /usr/src/app/
COPY . .
RUN apt-get update && apt-get install -y \
    git
RUN mkdir -p /doc && chown -R 1000:1000 /doc
RUN mkdir -p /home/node/.npm && chown -R 1000:1000 /home/node/.npm

RUN chmod +x /usr/src/app/start.sh
CMD ["bash", "/usr/src/app/start.sh"]
