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
    git \
    python3.4 \
    python3-pip \
    python3-git
RUN python3 clone_repo.py
CMD ["npx", "quartz", "build", "--serve"]
