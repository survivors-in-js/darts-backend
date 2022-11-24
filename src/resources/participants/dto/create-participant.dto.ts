import {
  IsDateString,
  IsEmail,
  IsEnum,
  IsInt,
  IsNotEmpty,
  IsOptional,
  IsString,
  Length,
} from 'class-validator';
import { GenderEnum } from 'src/config/events.enum';

export class CreateParticipantDto {
  @IsNotEmpty()
  @IsString()
  public surname: string;

  @IsNotEmpty()
  @IsString()
  public name: string;

  @IsOptional()
  @IsString()
  public patronymic?: string;

  @IsNotEmpty()
  @IsDateString()
  public dateOfBirth: Date;

  @IsNotEmpty()
  @IsEnum(GenderEnum)
  public gender: GenderEnum;

  @IsOptional()
  @IsString()
  public address?: string;

  @IsNotEmpty()
  @IsString()
  @IsEmail()
  public email: string;

  @IsOptional()
  @IsInt()
  public phone?: number;

  @IsOptional()
  @IsInt()
  public seriesAndNumber?: number;

  @IsOptional()
  @IsDateString()
  public dateOfIssue?: Date;

  @IsOptional()
  @IsString()
  public issuedBy?: string;

  @IsOptional()
  public divisionCode?: string;

  @IsOptional()
  @IsString()
  public snils?: string;

  @IsOptional()
  @IsString()
  @Length(12)
  public INN?: string;

  @IsOptional()
  @IsString()
  public subjectRF?: string;

  @IsOptional()
  @IsString()
  public category?: string;

  @IsOptional()
  @IsDateString()
  public аssigned?: Date;

  @IsOptional()
  @IsString()
  public nameOfTrainer?: string;

  @IsOptional()
  @IsString()
  public leadingHand?: string;

  @IsOptional()
  @IsString()
  public producerOfDart?: string;

  @IsOptional()
  @IsInt()
  public weightOfDart?: number;

  @IsOptional()
  @IsInt()
  public policyNumber?: number;

  @IsOptional()
  @IsDateString()
  public startOfAction?: Date;

  @IsOptional()
  @IsDateString()
  public endOfAction?: Date;

  @IsOptional()
  @IsInt()
  public weightOfPlayer?: number;

  @IsOptional()
  @IsInt()
  public heightOfPlayer?: number;

  @IsOptional()
  @IsString()
  public hobby?: string;

  @IsOptional()
  @IsString()
  public educationalInstitution?: string;

  @IsOptional()
  @IsDateString()
  public endOfEducation?: Date;

  @IsOptional()
  @IsString()
  public educationLevel?: string;

  @IsOptional()
  @IsString()
  public speciality?: string;
}

/* {
  "surname": "fjgfgf",
  "name": "fgfgfgfg",
  "patronymic": "jhdsjhdf",
  "dateOfBirth":"1984-10-19",
  "gender": "мужской",
  "address": "fkdsfkfs",
  "email": "test@yandex.ru",
  "phone": "123456789",
  "seriesAndNumber": "4005123456",
  "dateOfIssue": "2004-10-19",
  "issuedBy": "fdjsdfjkfsd",
  "divisionCode": "fdfds",
  "snils": "fdsfds",
  "INN": 123456789123,
  "subjectRF": "fdsfdsfdsfd",
  "category": "hghghg",
  "аssigned": "2004-10-19",
  "nameOfTrainer": "dfsfdsfdsfds",
  "leadingHand": "fdfdsfdsf",
  "producerOfDart": "fffff",
  "weightOfDart": 3,
  "policyNumber":5,
  "startOfAction": "2004-10-19",
  "endOfAction": "2004-10-19",
  "weightOfPlayer": 90,
  "heightOfPlaye": 180,
  "hobby": "dfsfdsfdsfds",
  "educationalInstitution": "dfsfdsfdsfds",
  "endOfEducation": "2004-10-19",
  "educationLevel": "dfsfdsfdsfds",
  "speciality": "dfsfdsfdsfds"
}
 */
