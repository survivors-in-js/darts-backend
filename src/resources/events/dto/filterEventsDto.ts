import { AgeEnum, GenderEnum } from 'src/config/events.enum';

export class FilterEventDto {
  public isVisible: boolean;
  public gender: GenderEnum;
  public age: AgeEnum;
  ///состояние события
  public gameType: string;
  public discipline: string;
  public order?: string;
  public order_column?: string;
}
