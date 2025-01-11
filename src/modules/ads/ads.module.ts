import { Module } from '@nestjs/common';
import { AdController } from './ads.controller';
import { AdService } from './ads.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Ad, AdSchema } from './schema/categories.schema';

@Module({
  controllers: [AdController],
  providers: [AdService],
  imports: [MongooseModule.forFeature([{ name: Ad.name, schema: AdSchema }])],
})
export class AdsModule {}
