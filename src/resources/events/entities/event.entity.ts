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

  @Column()
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

  @Column()
  @IsInt()
  public groupsNumber: number;

  @Column()
  @IsInt()
  public circlesNumber: number;

  @Column()
  @IsInt()
  public legs: number;

  @Column({
    type: 'enum',
    enum: GridEnum,
    default: null,
  })
  public gridType: GridEnum;

  @Column()
  @IsNotEmpty()
  @IsString()
  public initialGrid: string;

  @Column()
  @IsNotEmpty()
  @IsBoolean()
  public thirdPlaceGame: boolean;

  @Column()
  @IsInt()
  @IsNotEmpty()
  public targetsNumber: number;

  @ManyToMany(() => Participant, (participiant) => participiant.id)
  participiants: Participant[];

  @Column()
  @IsNotEmpty()
  @IsString()
  public judge: string;

  @Column()
  @IsNotEmpty()
  @IsString()
  public secretary: string;

  @Column()
  @IsInt()
  @IsNotEmpty()
  public EKP: number;

  @Column()
  @IsInt()
  @IsNotEmpty()
  public place: number;

  @Column()
  @IsNotEmpty()
  @IsString()
  public degree: string;
}
