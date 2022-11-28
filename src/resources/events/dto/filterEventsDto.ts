import { AgeEnum, GenderEnum } from 'src/config/events.enum';

export class FilterEventDto {
  public isVisible: boolean;
  public gender: GenderEnum;
  public age: AgeEnum;
  public gameType: string;
  public discipline: string;
  public order?: string;
  public orderColumn?: string;
}
