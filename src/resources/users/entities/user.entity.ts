import { PrimaryGeneratedColumn, Column, Entity } from 'typeorm';
import { IsEmail } from 'class-validator';
import Role from '../../../config/role.enum';
@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    unique: true,
  })
  @IsEmail()
  email: string;

  @Column()
  password: string;

  @Column({
    default: Role.User,
    type: 'enum',
    enum: Role,
  })
  role: Role;
}
