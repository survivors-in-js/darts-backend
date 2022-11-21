import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateEventDto } from './dto/create-event.dto';
import { UpdateEventDto } from './dto/update-event.dto';
import { Event } from './entities/event.entity';

@Injectable()
export class EventsService {
  constructor(
    @InjectRepository(Event)
    private eventRepository: Repository<Event>,
  ) {}

  public async create(createEventDto: CreateEventDto): Promise<Event> {
    const event = await this.eventRepository.create({
      ...createEventDto,
    });
    return this.eventRepository.save(event);
  }

  public async findAll() {
    return this.eventRepository.find();
  }

  public async findOne(id: number) {
    return this.eventRepository.findOneBy({ id });
  }

  public async update(
    id: number,
    updateEventDto: UpdateEventDto,
  ): Promise<Event> {
    await this.eventRepository.update(id, updateEventDto);
    return this.findOne(id);
  }

  public async remove(id: number) {
    await this.eventRepository.delete({ id });
  }
}
