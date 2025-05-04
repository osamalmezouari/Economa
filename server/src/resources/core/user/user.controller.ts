import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
  UseInterceptors,
  UploadedFile,
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { activeUser } from 'src/common/decorators/params/activeUser.decorator';
import { FileInterceptor } from '@nestjs/platform-express';
import { SET_PERMESSIONS } from 'src/common/decorators/meta/authorization.decorator';
import { Permissions_TYPE } from 'src/common/enums/permissions';
import { AuthenticationType } from 'src/common/enums/authentication';
import { AUTH } from 'src/common/decorators/meta/authentication.decorator';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @AUTH(AuthenticationType.bearer)
  @SET_PERMESSIONS(Permissions_TYPE.USER_READ)
  @Get('StoredUserFromToken')
  async findByEmail(@activeUser('sub') userId: string) {
    const user = await this.userService.findStoredUserFromToken(userId);
    return user;
  }
  @AUTH(AuthenticationType.bearer)
  @SET_PERMESSIONS(Permissions_TYPE.USERS_READ)
  @Get('list')
  async getUsersList(
    @Query('search') search: string,
    @Query('page') page: number,
  ) {
    return this.userService.getUsersList(page, search);
  }
  
  @AUTH(AuthenticationType.bearer)
  @SET_PERMESSIONS(Permissions_TYPE.USER_READ)
  @Get(':id')
  async findOne(@Param('id') userId: string) {
    const user = await this.userService.findOne(userId);
    return user;
  }

  @AUTH(AuthenticationType.bearer)
  @SET_PERMESSIONS(Permissions_TYPE.USER_CREATE)
  @Post('adminCreate')
  @UseInterceptors(FileInterceptor('file'))
  async adminCreate(
    @Body() createUserDto: CreateUserDto,
    @UploadedFile() file: Express.Multer.File,
  ) {
    createUserDto.file = file;
    const user = await this.userService.adminCreate(createUserDto);
    return user;
  }

  @AUTH(AuthenticationType.bearer)
  @SET_PERMESSIONS(Permissions_TYPE.USER_UPDATE)
  @Patch('adminUpdate/:id')
  @UseInterceptors(FileInterceptor('file'))
  async adminUpdate(
    @Param('id') id: string,
    @Body() updateUserDto: UpdateUserDto,
    @UploadedFile() file: Express.Multer.File,
  ) {
    if (file) {
      updateUserDto.file = file;
    }
    const user = await this.userService.adminUpdate(id, updateUserDto);
    return user;
  }

  @AUTH(AuthenticationType.bearer)
  @SET_PERMESSIONS(Permissions_TYPE.USER_PROFILE_UPDATE)
  @Patch('ProfileUpdate')
  @UseInterceptors(FileInterceptor('file'))
  async ProfileUpdate(
    @Body() updateUserDto: UpdateUserDto,
    @UploadedFile() file: Express.Multer.File,
    @activeUser('sub') userId: string,
  ) {
    if (file) {
      updateUserDto.file = file;
    }
    const user = await this.userService.ProfileUpdate(userId, updateUserDto);
    return user;
  }

  @AUTH(AuthenticationType.bearer)
  @SET_PERMESSIONS(Permissions_TYPE.USER_DELETE)
  @Delete(':id')
  async remove(@Param('id') id: string) {
    const user = await this.userService.remove(id);
    return user;
  }
}
