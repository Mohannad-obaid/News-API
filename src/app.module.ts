import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { schemaJois } from './config/config-module';
import { MongoModule } from './config/mongodb.config';
@Module({
  imports: [
    ConfigModule.forRoot({
      validationSchema: schemaJois,
      isGlobal: true,
    }),
    MongoModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
