import { Module } from '@nestjs/common';
import { RecoverService } from './recover.service';

@Module({
  providers: [RecoverService],
  exports: [RecoverService],
})
export class RecoverModule {}
