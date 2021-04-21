# devref-back-typescript-rest-express-pg-typorm-Auth

ready to go boilerplate for simple Authentication

### Task List :

- Add migrations
- Add RoleBase Authorization
- Tests

### Tech Stack :

- Api / Microservice
- Expressjs
- Typescript
- Postgresql13
- Typeorm
- CookieSession
- Clean-Architecture
- Jest
- Github Actions
- Documents
- Docker
- Kuberntetes
- Makefile
- Prettier
- Ingress / nginx

---

### Description :

this project leverage indexer pattern and full granulity on implementation that let us reuse this structure for other project .

also it give ability to us to embed part of this project in other projects .

### **Bootstrapper :**

#

#### **Development :**

we consider you already installed Docker . if this is not case for you
please establish connection for Postgres Database ver13.

in root of project

```

make postgres

make createdb


npm install

// in index.ts uncomment these lines (41,42)
// only for first time , it let tpyeorm sync with database with our model

synchronize: !__prod__,
logging: !__prod__,

npm run dev

```

**Docker-Compose :**

it make it easier for use in dev
