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
} from '@nestjs/common';
import { ParticipantsService } from './participants.service';
import { CreateParticipantDto } from './dto/create-participant.dto';
import { UpdateParticipantDto } from './dto/update-participant.dto';
import { FileInterceptor } from '@nestjs/platform-express';

console.log(FileTypeValidator);

@Controller('participants')
export class ParticipantsController {
  constructor(private readonly participantsService: ParticipantsService) {}

  @Post()
  public create(@Body() createParticipantDto: CreateParticipantDto) {
    return this.participantsService.create(createParticipantDto);
  }

  @Post(':id/upload-file')
  @UseInterceptors(FileInterceptor('image'))
  public uploadFile(
    @Param('id') id: string,
    @UploadedFile(
      new ParseFilePipe({
        validators: [
          // TODO узнать какой макс размер
          new MaxFileSizeValidator({ maxSize: 10000000 }),
          new FileTypeValidator({ fileType: /(jpg|jpeg|png|gif)$/ }),
        ],
      }),
    )
    image: Express.Multer.File,
  ) {
    return this.participantsService.uploadFile(+id, image);
  }

  @Get()
  public findAll() {
    return this.participantsService.findAll();
  }

  @Get(':id')
  public findOne(@Param('id') id: string) {
    return this.participantsService.findOne(+id);
  }

  @Patch(':id/upload-file')
  @UseInterceptors(FileInterceptor('image'))
  public updateFile(
    @Param('id') id: string,
    @UploadedFile(
      new ParseFilePipe({
        validators: [
          // TODO узнать какой макс размер
          new MaxFileSizeValidator({ maxSize: 10000000 }),
          new FileTypeValidator({ fileType: /(jpg|jpeg|png|gif)$/ }),
        ],
      }),
    )
    image: Express.Multer.File,
  ) {
    return this.participantsService.uploadFile(+id, image);
  }

  @Patch(':id')
  public update(
    @Param('id') id: string,
    @Body() updateParticipantDto: UpdateParticipantDto,
  ) {
    return this.participantsService.update(+id, updateParticipantDto);
  }

  @Delete(':id')
  public remove(@Param('id') id: string) {
    return this.participantsService.remove(+id);
  }
}
