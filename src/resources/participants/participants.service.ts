import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FilesService } from 'src/files/files.service';
import { Between, FindOperator, Repository } from 'typeorm';
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
    return this.participantsRepository.find({ relations: ['events'] });
  }

  public async findOne(id: number): Promise<Participant> {
    return this.participantsRepository.findOne({
      where: { id },
      relations: ['events'],
    });
  }

  private getRangeOfDateBirthes(age: number): FindOperator<Date> | null {
    const now = new Date();
    const year = now.getFullYear();
    const month = now.getMonth() + 1;
    const day = now.getDay();

    const yearFrom = year - age - 1;
    const yearTo = year - age;

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
  ): Promise<Participant[]> {
    const { age, ...rest } = findParticipantDto;
    const rangeOfDateBirthes = this.getRangeOfDateBirthes(age);

    return this.participantsRepository.find({
      where: { ...rest, dateOfBirth: rangeOfDateBirthes },
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

  public async find(options: any): Promise<Participant[]> {
    return this.participantsRepository.find(options);
  }
}
