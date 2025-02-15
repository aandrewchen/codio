# alpine for small image sizes
FROM oven/bun:1-alpine as base
WORKDIR /usr/src/app

FROM base AS install
RUN mkdir -p /usr/src/app

# install with --production (exclude devDependencies)
RUN mkdir -p /temp/prod
COPY package.json bun.lock /temp/prod/
WORKDIR /temp/prod
RUN bun install --frozen-lockfile --production
WORKDIR /usr/src/app

# copy node_modules from temp directory
# then copy all (non-ignored) project files into the image
FROM base AS prerelease
# COPY --from=install /temp/dev/node_modules node_modules
COPY . .

# copy production dependencies and source code into final image
FROM base AS release
COPY --from=install /temp/prod/node_modules node_modules
COPY --from=prerelease /usr/src/app/src src/
COPY --from=prerelease /usr/src/app/drizzle drizzle/
COPY --from=prerelease /usr/src/app/tsconfig.json .
COPY --from=prerelease /usr/src/app/drizzle.config.ts .
COPY --from=prerelease /usr/src/app/.npmrc .
COPY --from=prerelease /usr/src/app/package.json .

# run the app
EXPOSE 8080/tcp
ENTRYPOINT [ "bun", "run", "start" ]
