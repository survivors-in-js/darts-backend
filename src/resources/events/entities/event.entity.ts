import {
  IsBoolean,
  IsDate,
  IsInt,
  IsNotEmpty,
  IsString,
  Min,
} from 'class-validator';
import { AgeEnum, GenderEnum, GridEnum } from 'src/config/events.enum';
import { Participant } from 'src/resources/participants/entities/participant.entity';
import { Column, Entity, ManyToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Event {
  @IsNotEmpty()
  @IsInt()
  @Min(0)
  @PrimaryGeneratedColumn()
  public id: number;

  @Column()
  @IsNotEmpty()
  @IsString()
  public name: string;

  @Column()
  @IsNotEmpty()
  @IsString()
  public rules: string;

  @Column()
  @IsNotEmpty()
  @IsString()
  public address: string;

  @Column()
  @IsNotEmpty()
  @IsDate()
  public dateOfStart: Date;

  @Column()
  @IsNotEmpty()
  @IsDate()
  public dateOfEnd: Date;

  @Column()
  @IsNotEmpty()
  @IsString()
  public startTime: string;

  @Column()
  @IsNotEmpty()
  @IsString()
  public discipline: string;

  @Column()
  @IsNotEmpty()
  @IsString()
  public gameType: string;

  @Column({ nullable: true })
  @IsNotEmpty()
  @IsString()
  public permissibleDischarge: string;

  @Column({
    type: 'enum',
    enum: GenderEnum,
    default: null,
  })
  public gender: GenderEnum;

  @Column({
    type: 'enum',
    enum: AgeEnum,
    default: null,
  })
  public age: AgeEnum;

  @Column({ nullable: true })
  @IsInt()
  public groupsNumber: number;

  @Column({ nullable: true })
  @IsInt()
  public circlesNumber: number;

  @Column({ nullable: true })
  @IsInt()
  public legs: number;

  @Column({
    type: 'enum',
    enum: GridEnum,
    default: null,
  })
  public gridType: GridEnum;

  @Column({ nullable: true })
  @IsNotEmpty()
  @IsString()
  public initialGrid: string;

  @Column({ nullable: true })
  @IsNotEmpty()
  @IsBoolean()
  public thirdPlaceGame: boolean;

  @Column({ nullable: true })
  @IsInt()
  @IsNotEmpty()
  public targetsNumber: number;

  @ManyToMany(() => Participant, (participants) => participants.events, {
    cascade: true,
  })
  public participants: Participant[];

  @Column({ nullable: true })
  @IsNotEmpty()
  @IsString()
  public judge: string;

  @Column({ nullable: true })
  @IsNotEmpty()
  @IsString()
  public secretary: string;

  @Column({ nullable: true })
  @IsInt()
  @IsNotEmpty()
  public EKP: number;

  @Column({ nullable: true })
  @IsInt()
  @IsNotEmpty()
  public place: number;

  @Column({ nullable: true })
  @IsNotEmpty()
  @IsString()
  public degree: string;
}
