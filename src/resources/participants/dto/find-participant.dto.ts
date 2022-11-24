import { GenderEnum } from 'src/config/events.enum';

export class FindParticipantDto {
  public surname?: string;
  public name?: string;
  public patronymic?: string;
  public age?: number;
  public gender?: GenderEnum;
}
