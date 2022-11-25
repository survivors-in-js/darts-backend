import {
  IsBoolean,
  IsDateString,
  IsEnum,
  IsInt,
  IsNotEmpty,
  IsOptional,
  IsString,
} from 'class-validator';

import { AgeEnum, GenderEnum, GridEnum } from 'src/config/events.enum';

export class CreateEventDto {
  public id: number;
  @IsNotEmpty()
  @IsBoolean()
  public isVisible: boolean;

  @IsNotEmpty()
  @IsString()
  public name: string;

  @IsNotEmpty()
  @IsString()
  public rules: string;

  @IsNotEmpty()
  @IsString()
  public address: string;

  @IsNotEmpty()
  @IsDateString()
  public dateOfStart: Date;

  @IsNotEmpty()
  @IsDateString()
  public dateOfEnd: Date;

  @IsNotEmpty()
  @IsString()
  public startTime: string;

  @IsNotEmpty()
  @IsString()
  public discipline: string;

  @IsNotEmpty()
  @IsString()
  public gameType: string;

  @IsNotEmpty()
  @IsString()
  public permissibleDischarge: string;

  @IsNotEmpty()
  @IsEnum(GenderEnum)
  public gender: GenderEnum;

  @IsNotEmpty()
  @IsEnum(AgeEnum)
  public age: AgeEnum;

  @IsOptional()
  @IsInt()
  public groupsNumber: number;

  @IsOptional()
  @IsInt()
  public circlesNumber: number;

  @IsOptional()
  @IsInt()
  public legs: number;

  @IsNotEmpty()
  @IsEnum(GridEnum)
  public gridType: GridEnum;

  @IsNotEmpty()
  @IsString()
  public initialGrid: string;

  @IsNotEmpty()
  @IsBoolean()
  public thirdPlaceGame: boolean;

  @IsNotEmpty()
  @IsInt()
  public targetsNumber: number;

  public participants: number[];

  @IsNotEmpty()
  @IsString()
  public judge: string;

  @IsNotEmpty()
  @IsString()
  public secretary: string;

  @IsNotEmpty()
  @IsInt()
  public EKP: number;

  @IsNotEmpty()
  @IsInt()
  public place: number;

  @IsNotEmpty()
  @IsString()
  public degree: string;
}

/* {
  "name": "fjgfgf",
  "rules": "fgfgfgfg",
  "address": "jhdsjhdf",
  "dateOfStart":"2004-10-19 10:23:54",
  "dateOfEnd": "2004-10-19 10:23:54",
  "startTime": "5:30",
  "discipline": "beg",
  "gameType": "hhhh",
  "permissibleDischarge": "jjj",
  "gender": "мужской",
  "age": "юниоры",
  "groupsNumber": 8,
  "circlesNumber": 8,
  "legs": 9,
  "gridType": "выбывание после поражения",
  "initialGrid": "hghghg",
  "thirdPlaceGame": true,
  "targetsNumber": 5,
  "participiants":[1],
  "judge": "fffff",
  "secretary": "fggffrgf",
  "EKP":5,
  "place":5,
  "degree": "ghfgg"
}
 */
