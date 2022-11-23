import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { In, Repository } from 'typeorm';

import { CreateEventDto } from './dto/create-event.dto';
import { UpdateEventDto } from './dto/update-event.dto';
import { Event } from './entities/event.entity';
import { ParticipantsService } from '../participants/participants.service';
@Injectable()
export class EventsService {
  constructor(
    private participiantService: ParticipantsService,
    @InjectRepository(Event)
    private eventRepository: Repository<Event>,
  ) {}

  public async create(createEventDto: CreateEventDto): Promise<Event> {
    const participants = await this.participiantService.find({
      where: { id: In(createEventDto.participants || []) },
    });
    const event = this.eventRepository.create({
      ...createEventDto,
      participants,
    });
    return this.eventRepository.save(event);
  }

  public async findAll() {
    return this.eventRepository.find({
      relations: ['participants'],
    });
  }

  public async findOneById(id: number) {
    return this.eventRepository.findOneBy({ id });
  }

  public async findOneByIdWithRelations(id: number) {
    return this.eventRepository.findOne({
      where: {
        id: id,
      },
      relations: ['participants'],
    });
  }

  public async update(
    id: number,
    updateEventDto: UpdateEventDto,
  ): Promise<Event> {
    await this.eventRepository.update(id, updateEventDto);
    return this.findOneById(id);
  }

  public async remove(id: number) {
    await this.eventRepository.delete({ id });
  }
}
