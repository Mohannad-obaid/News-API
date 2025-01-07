import { Controller, UseGuards } from '@nestjs/common';
import { UserService } from './user.service';
import { UpdateUserDto } from './dto/update-user.dto';
import { CreateUserDto } from './dto/create-user.dto';
import {
  Body,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  HttpStatus,
  HttpCode,
} from '@nestjs/common';
import { ParesMongoIdPipe } from '../../common/pipes/mongo/pars-mongo-id.pipe';
import { IsPublic, Roles } from 'src/common/decorators/public.decorator';
import { UserRole } from '../../common/enums/user-roles.enum';
import { JwtAuthGuard } from '../../common/guards/auth.guard';

@Controller('user')
@UseGuards(JwtAuthGuard)
export class UserController {
  constructor(private readonly usersService: UserService) {}

  //@Roles(UserRole.ADMIN)
  @Post()
  async create(@Body() createUserDto: CreateUserDto) {
    return this.usersService.createUser(createUserDto);
  }

  @IsPublic()
  @Get()
  async findAll() {
    return this.usersService.findUser();
  }

  @Get(':id')
  async findOne(@Param('id', ParesMongoIdPipe) id: string) {
    return this.usersService.findUserById(id);
  }

  @Patch(':id')
  async update(
    @Param('id', ParesMongoIdPipe) id: string,
    @Body() updateUserDto: UpdateUserDto,
  ) {
    return this.usersService.updateUser(id, updateUserDto);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async remove(@Param('id', ParesMongoIdPipe) id: string) {
    return this.usersService.deleteUser(id);
  }

  @Get('email/:email')
  async findUserByEmail(@Param('email') email: string) {
    return this.usersService.findUserByEmail(email);
  }

  @Patch('role/:id')
  async updateRole(
    @Param('id', ParesMongoIdPipe) id: string,
    @Body('role') role: string,
  ) {
    return this.usersService.updateRole(id, role);
  }

  @Get('username/:username')
  async findUserByUsername(@Param('username') username: string) {
    return this.usersService.findUserByUsername(username);
  }
}
