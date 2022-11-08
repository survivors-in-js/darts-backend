import { PrimaryGeneratedColumn, Column, Entity } from 'typeorm';
import { IsEmail } from 'class-validator';
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
}
