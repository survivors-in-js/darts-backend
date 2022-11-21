import { PrimaryGeneratedColumn, Column, Entity } from 'typeorm';
import { IsEmail } from 'class-validator';
import { RoleEnum } from 'src/config/role.enum';

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
    default: RoleEnum.ADMIN,
    type: 'enum',
    enum: RoleEnum,
  })
  public role: RoleEnum;
}
