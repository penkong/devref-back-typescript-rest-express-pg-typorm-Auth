import { ConnectionOptions } from 'typeorm/connection/ConnectionOptions'

import { config } from './index'

const { /* PGUSER,*/ DB_DOCKER, PGUSER, PASSWORD, DBNAME, __prod__ } = config

export const TYPEORM: ConnectionOptions = {
	type: 'postgres',
	host: DB_DOCKER || '172.18.0.2',
	port: 5432,
	username: PGUSER || 'root',
	password: PASSWORD || 'secret',
	synchronize: !__prod__,
	logging: !__prod__,
	database: DBNAME || 'devref-ts-express-rest-pg-auth',
	entities: ['./src/data/models/*.ts'],
	migrations: ['./src/data-layer/migrations/*.ts']
}
