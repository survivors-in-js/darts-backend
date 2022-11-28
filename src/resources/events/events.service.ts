import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { In, Repository } from 'typeorm';

import { CreateEventDto } from './dto/create-event.dto';
import { UpdateEventDto } from './dto/update-event.dto';
import { Event } from './entities/event.entity';
import { ParticipantsService } from '../participants/participants.service';
import { Participant } from '../participants/entities/participant.entity';
import { FilterEventDto } from './dto/filterEventsDto';
@Injectable()
export class EventsService {
  constructor(
    private participiantService: ParticipantsService,
    @InjectRepository(Event)
    private eventRepository: Repository<Event>,
  ) {}

  public async create(createEventDto: CreateEventDto): Promise<Event> {
    const participants = await this.findParticipantsByIds(
      createEventDto.participants,
    );
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
      where: { id },
      relations: ['participants'],
    });
  }

  public async findWithFilters(
    filterEventDto: FilterEventDto,
  ): Promise<Event[]> {
    const { order, orderColumn, ...rest } = filterEventDto;
    return this.eventRepository.find({
      where: {
        ...rest,
      },
      order: {
        [orderColumn || 'createdAt']: order || 'ASC',
      },
    });
  }

  public async update(
    id: number,
    updateEventDto: UpdateEventDto,
  ): Promise<Event> {
    const participants = await this.findParticipantsByIds(
      updateEventDto.participants,
    );
    await this.eventRepository.save({ ...updateEventDto, participants, id });
    return this.findOneById(id);
  }

  public async remove(id: number): Promise<void> {
    await this.eventRepository.delete({ id });
  }

  private async findParticipantsByIds(
    participantIds: number[] = [],
  ): Promise<Participant[]> {
    return this.participiantService.find({
      where: { id: In(participantIds) },
    });
  }
}
