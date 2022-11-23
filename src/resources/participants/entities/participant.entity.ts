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
  public id: number;

  @Column()
  @IsNotEmpty()
  @IsString()
  public surname: string;

  @Column()
  @IsNotEmpty()
  @IsString()
  public name: string;

  @Column({ nullable: true })
  @IsString()
  public patronymic: string;

  @Column({ type: 'date' })
  @IsNotEmpty()
  @IsDate()
  public dateOfBirth: Date;

  @Column()
  @IsNotEmpty()
  @IsString()
  public gender: string;

  @Column({ nullable: true })
  @IsString()
  public address: string;

  @Column({ unique: true })
  @IsString()
  @IsNotEmpty()
  @IsEmail()
  public email: string;

  @Column({ nullable: true })
  @IsInt()
  public phone: number;

  @Column({ nullable: true })
  @IsInt()
  @Length(10)
  public seriesAndNumber: number;

  @Column({ nullable: true, type: 'date' })
  @IsDate()
  public dateOfIssue: Date;

  @Column({ nullable: true })
  @IsString()
  public issuedBy: string;

  @Column({ nullable: true })
  public divisionCode: string;

  @Column({ nullable: true })
  @IsString()
  public snils: string;

  @Column({ nullable: true })
  @IsString()
  @Length(12)
  public INN: string;

  @Column({ nullable: true })
  @IsString()
  public subjectRF: string;

  @Column({ nullable: true })
  @IsString()
  public category: string;

  @Column({ nullable: true, type: 'date' })
  @IsDate()
  public аssigned: Date;

  @Column({ nullable: true })
  @IsString()
  public nameOfTrainer: string;

  @Column({ nullable: true })
  @IsString()
  public leadingHand: string;

  @Column({ nullable: true })
  @IsString()
  public producerOfDart: string;

  @Column({ nullable: true })
  @IsInt()
  public weightOfDart: number;

  @Column({ nullable: true })
  @IsInt()
  @IsOptional()
  public policyNumber: number;

  @Column({ nullable: true, type: 'date' })
  @IsDate()
  public startOfAction: Date;

  @Column({ nullable: true, type: 'date' })
  @IsDate()
  public endOfAction: Date;

  @Column({ nullable: true })
  @IsInt()
  public weightOfPlayer: number;

  @Column({ nullable: true })
  @IsInt()
  public heightOfPlayer: number;

  @Column({ nullable: true })
  @IsString()
  public hobby: string;

  @Column({ nullable: true })
  @IsString()
  public educationalInstitution: string;

  @Column({ nullable: true, type: 'date' })
  @IsDate()
  public endOfEducation: Date;

  @Column({ nullable: true })
  @IsString()
  public educationLevel: string;

  @Column({ nullable: true })
  @IsString()
  public speciality: string;

  @Column({ nullable: true })
  public image: string;
}
