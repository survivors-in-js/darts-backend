import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FilesService } from 'src/files/files.service';
import { Between, Repository } from 'typeorm';
import { CreateParticipantDto } from './dto/create-participant.dto';
import { FindParticipantDto } from './dto/find-participant.dto';
import { UpdateParticipantDto } from './dto/update-participant.dto';
import { Participant } from './entities/participant.entity';

@Injectable()
export class ParticipantsService {
  constructor(
    @InjectRepository(Participant)
    private participantsRepository: Repository<Participant>,
    private filesService: FilesService,
  ) {}

  public async create(
    createParticipantDto: CreateParticipantDto,
  ): Promise<Participant> {
    const participant = await this.participantsRepository.create({
      ...createParticipantDto,
    });

    return this.participantsRepository.save(participant);
  }

  public async findAll() {
    return this.participantsRepository.find();
  }

  public async findOne(id: number): Promise<Participant> {
    return this.participantsRepository.findOneBy({ id });
  }

  private async getRangeOfDateBirthes(age: number) {
    const now = new Date();
    const year = now.getFullYear();
    const month = now.getMonth() + 1;
    const day = now.getDay();

    const yearFrom = year - age;
    const yearTo = year - age + 1;

    const dateFrom = `${yearFrom}-${month}-${day}`;
    const dateTo = `${yearTo}-${month}-${day}`;

    if (age) {
      return Between(new Date(dateFrom), new Date(dateTo));
    } else {
      return null;
    }
  }

  public async findByQuery(
    findParticipantDto: FindParticipantDto,
  ): Promise<any> {
    const { surname, name, patronymic, age, gender } = findParticipantDto;

    const dateOfBirth = await this.getRangeOfDateBirthes(age);

    return this.participantsRepository.find({
      where: {
        surname: surname,
        name: name,
        patronymic: patronymic,
        gender: gender,
        dateOfBirth: dateOfBirth,
      },
    });
  }

  public async update(
    id: number,
    updateParticipantDto: UpdateParticipantDto,
  ): Promise<Participant> {
    await this.participantsRepository.update({ id }, updateParticipantDto);
    return this.findOne(id);
  }

  public async uploadFile(
    id: number,
    image: Express.Multer.File,
  ): Promise<{ fileNameUuid: string }> {
    const foundParticipant = await this.participantsRepository.findOneBy({
      id,
    });

    if (foundParticipant.image) {
      await this.filesService.deleteFile(foundParticipant.image);
    }

    const fileNameUuid = await this.filesService.createFile(image);

    await this.participantsRepository.update(
      { id },
      {
        image: fileNameUuid,
      },
    );
    return { fileNameUuid };
  }

  public async remove(id: number): Promise<void> {
    await this.participantsRepository.delete({ id });
  }
}
