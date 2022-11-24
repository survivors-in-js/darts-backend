import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UploadedFile,
  UseInterceptors,
  ParseFilePipe,
  FileTypeValidator,
  MaxFileSizeValidator,
  UseGuards,
} from '@nestjs/common';
import { ParticipantsService } from './participants.service';
import { CreateParticipantDto } from './dto/create-participant.dto';
import { UpdateParticipantDto } from './dto/update-participant.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { Participant } from './entities/participant.entity';
import { FindParticipantDto } from './dto/find-participant.dto';
import { JwtGuard } from 'src/auth/guards/jwt.guard';

@Controller('participants')
export class ParticipantsController {
  constructor(private readonly participantsService: ParticipantsService) {}

  @UseGuards(JwtGuard)
  @Post()
  public create(
    @Body() createParticipantDto: CreateParticipantDto,
  ): Promise<Participant> {
    return this.participantsService.create(createParticipantDto);
  }

  @UseGuards(JwtGuard)
  @Post(':id/upload-file')
  @UseInterceptors(FileInterceptor('image'))
  public uploadFile(
    @Param('id') id: string,
    @UploadedFile(
      new ParseFilePipe({
        validators: [
          new MaxFileSizeValidator({ maxSize: 10000000 }),
          new FileTypeValidator({ fileType: /(jpg|jpeg|png|gif)$/ }),
        ],
      }),
    )
    image: Express.Multer.File,
  ): Promise<{ fileNameUuid: string }> {
    return this.participantsService.uploadFile(parseInt(id), image);
  }

  @UseGuards(JwtGuard)
  @Post('search')
  public find(
    @Body() findParticipantDto: FindParticipantDto,
  ): Promise<Participant[]> {
    return this.participantsService.findByQuery(findParticipantDto);
  }

  @UseGuards(JwtGuard)
  @Get()
  public findAll(): Promise<Participant[]> {
    return this.participantsService.findAll();
  }

  @UseGuards(JwtGuard)
  @Get(':id')
  public findOne(@Param('id') id: string): Promise<Participant> {
    return this.participantsService.findOne(parseInt(id));
  }

  @UseGuards(JwtGuard)
  @Patch(':id')
  public update(
    @Param('id') id: string,
    @Body() updateParticipantDto: UpdateParticipantDto,
  ): Promise<Participant> {
    return this.participantsService.update(parseInt(id), updateParticipantDto);
  }

  @UseGuards(JwtGuard)
  @Delete(':id')
  public remove(@Param('id') id: string): Promise<void> {
    return this.participantsService.remove(parseInt(id));
  }
}
