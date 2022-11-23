import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import * as fs from 'fs';
import * as path from 'path';
import * as uuid from 'uuid';

@Injectable()
export class FilesService {
  public async createFile(file: Express.Multer.File): Promise<string> {
    try {
      const fileNameUuid =
        uuid.v4() + '.' + file.originalname.match(/\.([^.]+)$/)?.[1];
      const filePath = path.resolve(__dirname, '..', 'static');
      if (!fs.existsSync(filePath)) {
        fs.mkdirSync(filePath, { recursive: true });
      }
      fs.writeFileSync(path.join(filePath, fileNameUuid), file.buffer);
      return fileNameUuid;
    } catch (error) {
      throw new HttpException(
        'Произошла ошибка при записи файла',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  public async deleteFile(fileNameUuid: string): Promise<string> {
    try {
      const filePath = path.resolve(__dirname, '..', 'static');

      fs.rmSync(path.join(filePath, fileNameUuid));
      return 'файл удален';
    } catch (error) {
      throw new HttpException(
        'Произошла ошибка при удалении файла',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
