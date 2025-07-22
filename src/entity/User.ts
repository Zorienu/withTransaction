import { Entity, PrimaryGeneratedColumn, Column, Index } from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ nullable: true })
  empresaId!: number;

  @Column()
  name!: string;

  @Column()
  email!: string;
}
