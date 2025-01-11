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
import { Roles } from 'src/common/decorators/public.decorator';
import { JwtAuthGuard } from '../../common/guards/jwt.guard';
import { Role } from '../../common/enums/role.enum';

@Controller('user')
export class UserController {
  constructor(private readonly usersService: UserService) {}

  //@Roles(UserRole.ADMIN)
  @Post()
  @Roles(Role.ADMIN)
  async create(@Body() createUserDto: CreateUserDto) {
    return this.usersService.createUser(createUserDto);
  }

  @Get()
  @Roles(Role.ADMIN)
  async findAll() {
    return this.usersService.findUser();
  }

  @Get(':id')
  @Roles(Role.ADMIN)
  async findOne(@Param('id', ParesMongoIdPipe) id: string) {
    return this.usersService.findUserById(id);
  }

  @Patch(':id')
  @Roles(Role.ADMIN)
  async update(
    @Param('id', ParesMongoIdPipe) id: string,
    @Body() updateUserDto: UpdateUserDto,
  ) {
    return this.usersService.updateUser(id, updateUserDto);
  }

  @Delete(':id')
  @Roles(Role.ADMIN)
  @HttpCode(HttpStatus.NO_CONTENT)
  async remove(@Param('id', ParesMongoIdPipe) id: string) {
    return this.usersService.deleteUser(id);
  }

  @Get('email/:email')
  @Roles(Role.ADMIN)
  async findUserByEmail(@Param('email') email: string) {
    return this.usersService.findUserByEmail(email);
  }

  @Patch('role/:id')
  @Roles(Role.ADMIN)
  async updateRole(
    @Param('id', ParesMongoIdPipe) id: string,
    @Body('role') role: string,
  ) {
    return this.usersService.updateRole(id, role);
  }

  @Get('username/:username')
  @Roles(Role.ADMIN)
  async findUserByUsername(@Param('username') username: string) {
    return this.usersService.findUserByUsername(username);
  }
}
