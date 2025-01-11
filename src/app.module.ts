import { Module, ValidationPipe } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { schemaJois } from './config/config-module';
import { MongoModule } from './config/mongodb.config';
import { UserModule } from './modules/user/user.module';
import { AuthModule } from './modules/auth/auth.module';
import { APP_PIPE } from '@nestjs/core';
import { CategoriesModule } from './modules/categories/categories.module';
import { NewsModule } from './modules/news/news.module';
import { AdsModule } from './modules/ads/ads.module';
import { CommonModule } from './common/common.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      validationSchema: schemaJois,
      isGlobal: true,
    }),
    MongoModule,
    UserModule,
    AuthModule,
    CategoriesModule,
    NewsModule,
    AdsModule,
    CommonModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
