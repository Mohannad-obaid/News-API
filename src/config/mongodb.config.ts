import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        uri: configService.get<string>('MONGODB_URI'),
        connectionErrorFactory: (error) =>
          new Error(`MongoDB connection error: ${error}`),
      }),
      inject: [ConfigService],
    }),
  ],
})
export class MongoModule {}
