import { AgeEnum, GenderEnum, GridEnum } from 'src/config/events.enum';

export class CreateEventDto {
  public id: number;
  public isVisible: boolean;
  public name: string;
  public rules: string;
  public address: string;
  public dateOfStart: Date;
  public dateOfEnd: Date;
  public startTime: string;
  public discipline: string;
  public gameType: string;
  public permissibleDischarge: string;
  public gender: GenderEnum;
  public age: AgeEnum;
  public groupsNumber: number;
  public circlesNumber: number;
  public legs: number;
  public gridType: GridEnum;
  public initialGrid: string;
  public thirdPlaceGame: boolean;
  public targetsNumber: number;
  public participants: number[];
  public judge: string;
  public secretary: string;
  public EKP: number;
  public place: number;
  public degree: string;
}
