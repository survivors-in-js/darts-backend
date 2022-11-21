import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FilesService } from 'src/files/files.service';
import { Repository } from 'typeorm';
import { CreateParticipantDto } from './dto/create-participant.dto';
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

  async find(options: any) {
    return this.participantsRepository.find(options);
  }
}
