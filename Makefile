# step 1 : create internal network for whole app
dockerNetwork:
	docker network create pg-net

# step 2 : create named volume for db and cache
volume: 
	docker volume create authpgvol

# step 3 : create database container 
postgres:
	docker run --name pg13 --network pg-net -p 5432:5432 -e POSTGRES_USER=root -e POSTGRES_PASSWORD=secret -d postgres
# docker exec -it mysql mysql -uroot -psecret <name of db>
# step 2
pgadmin:
	docker run --name pgadmin4 --network pg-net -p 80:80 -e 'PGADMIN_DEFAULT_EMAIL=nazemi.works@gmail.com' -e 'PGADMIN_DEFAULT_PASSWORD=secret' --link pg13:pg13 -d dpage/pgadmin4
# check connection ip with docker logs pgadmin4

# step 3
createdb: 
	docker exec -it pg13 createdb --username=root --owner=root devref-ts-express-rest-pg-auth


# step 4 - create migration modules already installed
migratetables:
	npm run migrate create table userinfo && npm run migrate create table creds && npm run migrate create table users
	
# step 5 - migrate up add creation for postgres - typeorm sync disabled
migrateup:
	npm run migrateup
