# From the rootdirectory of monorepo you can run
#  docker build -t dixre/click-workspaces -f ./docker/dev/Dockerfile.workspace.builder .

ARG APP_ROOT="/srv/dixre"
ARG ALPINE_VERSION="16-alpine"

FROM node:${ALPINE_VERSION}
ARG APP_ROOT

RUN apk --no-cache --update add \
    autoconf \
    automake \
    bash \
    build-base \
    font-noto-emoji \
    g++ \
    gcc \
    gcompat \
    libstdc++ \
    libtool \
    make \
    nasm \
    py-pip \
    python3 \
    rsync \
    curl \
    && rm -rf /var/cache/apk/* \
    && rm -rf /var/lib/apt/lists/*

WORKDIR ${APP_ROOT}

COPY ./package*.json .

COPY ./libs ./libs

COPY ./eslint ./eslint

RUN npm ci --no-audit

RUN npm run build --workspaces

