/*
 ** Description :
 */

import {
	Entity,
	BaseEntity,
	PrimaryGeneratedColumn,
	Index,
	Column,
	CreateDateColumn,
	UpdateDateColumn,
	DeleteDateColumn
} from 'typeorm'

// ---

@Entity('users')
export class User extends BaseEntity {
	//

	@PrimaryGeneratedColumn()
	id: number

	@Index({ unique: true })
	@Column({ type: 'varchar', nullable: false, length: 50, unique: true })
	email: string

	@Column({ type: 'text', nullable: false })
	password: string

	@Column({ type: 'bool', nullable: false, default: false })
	confirmed: boolean

	@Column({ type: 'varchar', length: 50, default: 'free-trial' })
	type: string

	@Column({ type: 'bool', default: false })
	deleted: boolean

	@CreateDateColumn({ name: 'created_at' })
	createdAt: Date

	@UpdateDateColumn({ name: 'updated_at' })
	updatedAt: Date

	@DeleteDateColumn({ name: 'deleted_at' })
	deletedAt?: Date
}
