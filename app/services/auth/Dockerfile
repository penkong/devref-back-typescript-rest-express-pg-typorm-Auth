FROM node:15.13.0-alpine as base


RUN mkdir -p /app
WORKDIR "/app"

COPY package*.json ./

RUN npm config set unsafe-perm true
# we use npm ci here so only the package-lock.json file is used
RUN npm config list \
    && npm ci \
    && npm cache clean --force

COPY . .



FROM base as builder

EXPOSE 5002
RUN rm -rf node_modules
RUN npm install --production

ENV NODE_ENV=production

# ENV PORT=5002
# ENV DB=postgres
# ENV PASSWORD=secret
# ENV DB_URL=postgresql://root:<PASSWORD>@172.18.0.2:5432/devrefauth?sslmode=disable
# ENV CORS=http://localhost:3000
# ENV JWT_KEY=yhgewy5ehuyrhbe56y65465hyy547u456t34y57uy45ytewth654uy45wy
# ENV JWT_TTL=365d



USER node

CMD ["npm", "run", "build"]
# https://medium.com/@ankit.wal/the-why-and-how-of-multi-stage-docker-build-with-typescript-example-bcadbce2686c
# https://stackoverflow.com/questions/59682961/asked-to-install-typescript-when-already-installed-when-building-docker-image