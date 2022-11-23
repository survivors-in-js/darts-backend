import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { EventsService } from './events.service';
import { CreateEventDto } from './dto/create-event.dto';
import { UpdateEventDto } from './dto/update-event.dto';
import { Event } from './entities/event.entity';
import { JwtGuard } from 'src/auth/guards/jwt.guard';

@Controller('events')
export class EventsController {
  constructor(private readonly eventsService: EventsService) {}

  @UseGuards(JwtGuard)
  @Post()
  create(@Body() createEventDto: CreateEventDto): Promise<Event> {
    return this.eventsService.create(createEventDto);
  }

  @UseGuards(JwtGuard)
  @Get()
  findAll(): Promise<Event[]> {
    return this.eventsService.findAll();
  }
  @UseGuards(JwtGuard)
  @Get(':id')
  findOne(@Param('id') id: string): Promise<Event> {
    return this.eventsService.findOneByIdWithRelations(parseInt(id));
  }
  @UseGuards(JwtGuard)
  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateEventDto: UpdateEventDto,
  ): Promise<Event> {
    return this.eventsService.update(parseInt(id), updateEventDto);
  }
  @UseGuards(JwtGuard)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.eventsService.remove(parseInt(id));
  }
}
