import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { AdService } from './ads.service';
import { CreateAdDto } from './dto/create-ads.dto';
import { UpdateAdDto } from './dto/update-category.dto';
import { ParesMongoIdPipe } from '../../common/pipes/mongo/pars-mongo-id.pipe';
import { IsPublic, Roles } from '../../common/decorators/public.decorator';
import { Role } from '../../common/enums/role.enum';

@Controller('ads')
export class AdController {
  constructor(private readonly adService: AdService) {}

  @Roles(Role.ADMIN)
  @Post()
  create(@Body() createAdDto: CreateAdDto) {
    return this.adService.create(createAdDto);
  }

  @Get()
  @IsPublic()
  findAll() {
    return this.adService.findAll();
  }

  @Roles(Role.ADMIN)
  @Get(':id')
  findOne(@Param('id', ParesMongoIdPipe) id: string) {
    return this.adService.findOne(id);
  }

  @Roles(Role.ADMIN)
  @Patch(':id')
  update(
    @Param('id', ParesMongoIdPipe) id: string,
    @Body() updateAdDto: UpdateAdDto,
  ) {
    return this.adService.update(id, updateAdDto);
  }

  @Roles(Role.ADMIN)
  @Delete(':id')
  remove(@Param('id', ParesMongoIdPipe) id: string) {
    return this.adService.remove(id);
  }
}
