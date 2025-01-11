import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { NewsService } from './news.service';
import { CreateNewsDto } from './dto/create-news.dto';
import { UpdateCategoryDto } from '../categories/dto/update-category.dto';
import { ParesMongoIdPipe } from '../../common/pipes/mongo/pars-mongo-id.pipe';
import { IsPublic, Roles } from '../../common/decorators/public.decorator';
import { Role } from '../../common/enums/role.enum';

@Controller('news')
export class NewsController {
  constructor(private readonly newsService: NewsService) {}

  @Get()
  @IsPublic()
  async findAll() {
    return this.newsService.findAll();
  }

  @Post()
  @Roles(Role.ADMIN, Role.EDITOR)
  async create(@Body() newsData: CreateNewsDto) {
    return this.newsService.create(newsData);
  }

  @Patch(':id')
  @Roles(Role.ADMIN, Role.EDITOR)
  async update(
    @Param('id', ParesMongoIdPipe) id: string,
    @Body() newsData: UpdateCategoryDto,
  ) {
    return this.newsService.update(id, newsData);
  }

  @Delete(':id')
  @Roles(Role.ADMIN, Role.EDITOR)
  async delete(@Param('id', ParesMongoIdPipe) id: string) {
    return this.newsService.remove(id);
  }

  @Get('/Category/:id')
  async getNewsByCategory(@Param('id', ParesMongoIdPipe) id: string) {
    return this.newsService.getNewsByCategory(id);
  }

  @IsPublic()
  @Get(':id')
  async findOne(@Param('id', ParesMongoIdPipe) id: string) {
    return this.newsService.findOne(id);
  }
}
