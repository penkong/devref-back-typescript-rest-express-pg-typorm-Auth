# step 1 : create internal network for whole app
dockerNetwork:
	docker network create pg-net

# step 2 : create named volume for db and cache
volume: 
	docker volume create pgvol

# step 3 : create database container 
postgres:
	docker run -d --network pg-net -p 5432:5432 --name pg13  -e POSTGRES_USER=root -e POSTGRES_PASSWORD=secret -v pgvol:/var/lib/postgresql/data postgres


# step 2 : --link pg13:pg13
pgadmin:
	docker run -d --network pg-net -p 80:80 --name pgadmin4  -e 'PGADMIN_DEFAULT_EMAIL=nazemi.works@gmail.com' -e 'PGADMIN_DEFAULT_PASSWORD=secret'  -d dpage/pgadmin4
# check connection ip with docker logs pgadmin4

# step 3
createdb: 
	docker exec -it pg13 createdb --username=root --owner=root devref-ts-express-rest-pg-auth

# step 4.A
apibuilddev:
	cd server && docker build -t apidev-image-authpg -f Dockerfile.dev . 

apirundev:
	docker run -d -p 5002:5002 --name authpg --network pg-net -v `pwd`/server/node_modules:/app/node_modules -v `pwd`/server/src:/app/src apidev-image-authpg

apicleanup:
	docker stop authpg && docker rm authpg && docker rmi apidev-image-authpg

# step 4.B
composeup:
	docker-compose -f docker-compose.dev.yaml up -d

composedown:
	docker-compose -f docker-compose.dev.yaml down

# step 5 - create migration modules already installed
migratetables:
	npm run migrate create table userinfo && npm run migrate create table creds && npm run migrate create table users
	
# step 5 - migrate up add creation for postgres - typeorm sync disabled
migrateup:
	npm run migrateup


buildprodimage:
	cd server && docker build -t penkong/devref-back-typescript-rest-express-pg-typeorm-auth:0.0.2 .

#  need login to docker hub in terminal before this step
pushimage:
	docker push penkong/devref-back-typescript-rest-express-pg-typeorm-auth:0.0.2

# docker exec -it mysql mysql -uroot -psecret <name of db>