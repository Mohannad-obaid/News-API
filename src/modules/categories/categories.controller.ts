import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import { CreateCategoryDto } from './dto/create-category.dto';
import { CategoriesService } from './categories.service';
import { ParesMongoIdPipe } from '../../common/pipes/mongo/pars-mongo-id.pipe';
import { JwtAuthGuard } from '../../common/guards/jwt.guard';
import { IsPublic, Roles } from '../../common/decorators/public.decorator';
import { Role } from '../../common/enums/role.enum';

@Controller('category')
@UseGuards(JwtAuthGuard)
export class CategoriesController {
  constructor(private readonly categoriesService: CategoriesService) {}

  @Roles(Role.ADMIN, Role.EDITOR)
  @Post()
  async create(@Body() category: CreateCategoryDto) {
    return this.categoriesService.createCategory(category);
  }

  @IsPublic()
  @Get()
  async findAll() {
    return this.categoriesService.findAll();
  }

  @IsPublic()
  @Get(':id')
  async findOne(@Param('id', ParesMongoIdPipe) id: string) {
    return this.categoriesService.findOne(id);
  }

  @Roles(Role.ADMIN, Role.EDITOR)
  @Patch(':id')
  async update(
    @Param('id', ParesMongoIdPipe) id: string,
    @Body() category: CreateCategoryDto,
  ) {
    return this.categoriesService.update(id, category);
  }

  @Roles(Role.ADMIN, Role.EDITOR)
  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async remove(@Param('id', ParesMongoIdPipe) id: string) {
    return this.categoriesService.remove(id);
  }
}
