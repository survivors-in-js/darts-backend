import { PrimaryGeneratedColumn, Column, Entity } from 'typeorm';
import { IsEmail } from 'class-validator';
import Role from '../../../config/role.enum';
@Entity()
export class User {
  @PrimaryGeneratedColumn()
  public id: number;

  @Column({
    unique: true,
  })
  @IsEmail()
  public email: string;

  @Column()
  public password: string;

  @Column({
    default: Role.SIMPLE_USER,
    type: 'enum',
    enum: Role,
  })
  public role: Role;
}
