import {
  IsDate,
  IsEmail,
  IsInt,
  IsNotEmpty,
  IsOptional,
  IsString,
  Length,
  Min,
} from 'class-validator';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Participant {
  @IsNotEmpty()
  @IsInt()
  @Min(0)
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  @IsNotEmpty()
  @IsString()
  surname: string;

  @Column()
  @IsNotEmpty()
  @IsString()
  name: string;

  @Column({ nullable: true })
  @IsString()
  patronymic: string;

  @Column()
  @IsNotEmpty()
  @IsDate()
  dateOfBirth: Date;

  @Column()
  @IsNotEmpty()
  @IsString()
  gender: string;

  @Column({ nullable: true })
  @IsString()
  address: string;

  @Column({ unique: true })
  @IsString()
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @Column({ nullable: true })
  @IsInt()
  phone: number;

  @Column({ nullable: true })
  @IsInt()
  @Length(10)
  seriesAndNumber: number;

  @Column({ nullable: true })
  @IsDate()
  dateOfIssue: Date;

  @Column({ nullable: true })
  @IsString()
  issuedBy: string;

  @Column({ nullable: true })
  divisionCode: string;

  @Column({ nullable: true })
  @IsString()
  snils: string;

  @Column({ nullable: true })
  @IsString()
  @Length(12)
  INN: string;

  @Column({ nullable: true })
  @IsString()
  subjectRF: string;

  @Column({ nullable: true })
  @IsString()
  category: string;

  @Column({ nullable: true })
  @IsDate()
  аssigned: Date;

  @Column({ nullable: true })
  @IsString()
  nameOfTrainer: string;

  @Column({ nullable: true })
  @IsString()
  leadingHand: string;

  @Column({ nullable: true })
  @IsString()
  producerOfDart: string;

  @Column({ nullable: true })
  @IsInt()
  weightOfDart: number;

  @Column({ nullable: true })
  @IsInt()
  @IsOptional()
  policyNumber: number;

  @Column({ nullable: true })
  @IsDate()
  startOfAction: Date;

  @Column({ nullable: true })
  @IsDate()
  endOfAction: Date;

  @Column({ nullable: true })
  @IsInt()
  weightOfPlayer: number;

  @Column({ nullable: true })
  @IsInt()
  heightOfPlayer: number;

  @Column({ nullable: true })
  @IsString()
  hobby: string;

  @Column({ nullable: true })
  @IsString()
  educationalInstitution: string;

  @Column({ nullable: true })
  @IsDate()
  endOfEducation: Date;

  @Column({ nullable: true })
  @IsString()
  educationLevel: string;

  @Column({ nullable: true })
  @IsString()
  speciality: string;

  @Column({ nullable: true })
  image: string;
}
