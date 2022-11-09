import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import * as fs from 'fs';
import * as path from 'path';
import * as uuid from 'uuid';

@Injectable()
export class FilesService {
  async createFile(file): Promise<string> {
    try {
      const fileName =
        uuid.v4() + '.' + file.originalname.match(/\.([^.]+)$/)?.[1];
      const filePath = path.resolve(__dirname, '..', 'static');
      if (!fs.existsSync(filePath)) {
        fs.mkdirSync(filePath, { recursive: true });
      }
      fs.writeFileSync(path.join(filePath, fileName), file.buffer);
      return fileName;
    } catch (error) {
      throw new HttpException(
        'Произошла ошибка при записи файла',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async deleteFile(fileName): Promise<string> {
    try {
      //   const fileName =
      //     uuid.v4() + '.' + file.originalname.match(/\.([^.]+)$/)?.[1];
      const filePath = path.resolve(__dirname, '..', 'static');
      //   if (!fs.existsSync(filePath)) {
      //     fs.mkdirSync(filePath, { recursive: true });
      //   }
      fs.rmSync(path.join(filePath, fileName));
      return 'файл удален';
    } catch (error) {
      throw new HttpException(
        'Произошла ошибка при удалении файла',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
