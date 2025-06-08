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
RUN chown -R 1000:1000 /usr/src/app
RUN mkdir -p /home/node/.npm && chown -R 1000:1000 /home/node/.npm

USER 1000

EXPOSE 8080

RUN chmod +x /usr/src/app/start.sh
RUN chmod +x /usr/src/app/clone_repo.sh
CMD ["bash", "/usr/src/app/start.sh"]
