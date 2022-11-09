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

  async create(
    createParticipantDto: CreateParticipantDto,
    image: any,
  ): Promise<Participant> {
    let participant: Participant;
    const { email } = createParticipantDto;
    const findedParticipant = await this.participantsRepository.findOneBy({
      email,
    });

    if (image && !findedParticipant) {
      const fileName = await this.filesService.createFile(image);

      participant = await this.participantsRepository.create({
        ...createParticipantDto,
        image: fileName,
      });
    } else {
      participant = await this.participantsRepository.create({
        ...createParticipantDto,
      });
    }

    return this.participantsRepository.save(participant);
  }

  findAll() {
    return this.participantsRepository.find();
  }

  async findOne(id: number): Promise<Participant> {
    return this.participantsRepository.findOneBy({ id });
  }

  async update(id: number, updateParticipantDto: UpdateParticipantDto, image) {
    let participant: Participant;
    if (image) {
      const findedParticipant = await this.participantsRepository.findOneBy({
        id,
      });
      const imageName = findedParticipant.image;

      if (imageName) {
        await this.filesService.deleteFile(imageName);
      }

      const fileName = await this.filesService.createFile(image);

      participant = await this.participantsRepository.create({
        ...updateParticipantDto,
        image: fileName,
      });
    } else {
      participant = await this.participantsRepository.create({
        ...updateParticipantDto,
      });
    }

    return this.participantsRepository.update({ id }, participant);
  }

  async remove(id: number): Promise<void> {
    await this.participantsRepository.delete({ id });
  }
}
