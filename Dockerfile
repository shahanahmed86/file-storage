FROM node:18-bullseye-slim as base
LABEL maintainer="Shahan <shahan.khaan@gmail.com>"
LABEL description="This is a node-js boilerplate on typescript for file storage."
ENV NODE_ENV=production
RUN apt-get update --fix-missing \
  && apt-get install -y --no-install-recommends curl \
  && apt-get clean \
  && rm -rf /var/lib/apt/lists/*
EXPOSE 7000
RUN mkdir /app && chown -R node:node /app
WORKDIR /app
USER node
COPY --chown=node:node ./package*.json ./
RUN npm ci --omit=dev && npm cache clean --force
COPY docker-entrypoint.sh /usr/local/bin/
ENTRYPOINT ["docker-entrypoint.sh"]
HEALTHCHECK --retries=5 --timeout=5s CMD curl -f localhost:7000/api/healthcheck || exit 1

### dev stage
FROM base as dev
ENV NODE_ENV=development
ENV CHOKIDAR_USEPOLLING=true
ENV PATH=/app/node_modules/.bin:$PATH
RUN npm ci && npm cache clean --force
COPY --chown=node:node . .
ARG BUILD_FLAG
RUN if [ "$BUILD_FLAG" = "y" ]; then npm run build; \
    else echo "Skipping build step as per build argument"; \
    fi

### test stage
FROM base as test
ENV NODE_ENV=test
ENV PATH=/app/node_modules/.bin:$PATH
RUN npm ci && npm cache clean --force
COPY --chown=node:node . .

FROM base as source
COPY --chown=node:node . .
COPY --from=dev /app/dist ./dist

### production stage
FROM source as prod
CMD [ "node", "dist/index.js" ]
