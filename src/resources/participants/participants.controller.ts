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
  @UseInterceptors(FileInterceptor('image'))
  create(
    @Body() createParticipantDto: CreateParticipantDto,
    @UploadedFile(
      new ParseFilePipe({
        validators: [
          // TODO узнать какой макс размер
          // TODO разобраться с логикой добавления/удаления фото.
          new MaxFileSizeValidator({ maxSize: 10000000 }),
          new FileTypeValidator({ fileType: /(jpg|jpeg|png|gif)$/ }),
        ],
      }),
    )
    image,
  ) {
    return this.participantsService.create(createParticipantDto, image);
  }

  @Get()
  findAll() {
    return this.participantsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.participantsService.findOne(+id);
  }

  @Patch(':id')
  @UseInterceptors(FileInterceptor('image'))
  update(
    @Param('id') id: string,
    @Body() updateParticipantDto: UpdateParticipantDto,
    @UploadedFile(
      new ParseFilePipe({
        validators: [
          // TODO узнать какой макс размер
          new MaxFileSizeValidator({ maxSize: 10000000 }),
          new FileTypeValidator({ fileType: /(jpg|jpeg|png|gif)$/ }),
        ],
      }),
    )
    image,
  ) {
    return this.participantsService.update(+id, updateParticipantDto, image);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.participantsService.remove(+id);
  }
}
