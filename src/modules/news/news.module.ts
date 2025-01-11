import { Module } from '@nestjs/common';
import { NewsController } from './news.controller';
import { NewsService } from './news.service';
import { MongooseModule } from '@nestjs/mongoose';
import { News, NewsSchema } from './schema/news.schema'; // استيراد المخطط
import { IsUserExists } from '../../common/validator/is-user-exists.validator';
import { DoCategoriesExist } from '../../common/validator/is-categories-exist.validator';
import UserSchema, { User } from '../user/schema/user.entity'; // استيراد المستخدم
import {
  Category,
  CategoriesSchema,
} from '../categories/schema/categories.schema';
import { CategoriesService } from '../categories/categories.service'; // استيراد التصنيفات

@Module({
  controllers: [NewsController],
  providers: [NewsService, CategoriesService, IsUserExists, DoCategoriesExist],
  imports: [
    MongooseModule.forFeature([
      { name: News.name, schema: NewsSchema }, // ربط اسم News
      { name: User.name, schema: UserSchema }, // ربط اسم User
      { name: Category.name, schema: CategoriesSchema }, // ربط اسم Category
    ]),
  ],
})
export class NewsModule {}
