FROM node:15.13.0-alpine as base

USER node
EXPOSE 5002

WORKDIR "/"

COPY ./package.json ./

RUN npm install

COPY . .



FROM base as devserver

ENV NODE_ENV=development
ENV PORT=5002
ENV DB=postgres
ENV PASSWORD=secret
ENV DB_URL=postgresql://root:<PASSWORD>@172.18.0.2:5432/devref-ts-express-rest-pg-auth?sslmode=disable
ENV CORS=http://localhost:3000
ENV JWT_KEY=yhgewy5ehuyrhbe56y65465hyy547u456t34y57uy45ytewth654uy45wy
ENV JWT_TTL=365d



CMD ["npm", "run", "dev"]
