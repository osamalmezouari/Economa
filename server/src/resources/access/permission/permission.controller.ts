import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { PermissionService } from './permission.service';
import { CreatePermissionDto } from './dto/create-permission.dto';
import { UpdatePermissionDto } from './dto/update-permission.dto';

@Controller('permissions')
export class PermissionController {
  constructor(private readonly permissionService: PermissionService) {}

  @Post()
  async create(@Body() createPermissionDto: CreatePermissionDto) {
    const permission = await this.permissionService.create(createPermissionDto);
    return permission;
  }

  @Get()
  async findAll() {
    const permissions = await this.permissionService.findAll();
    return permissions;
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    const permission = await this.permissionService.findOne(id);
    return permission;
  }

  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() updatePermissionDto: UpdatePermissionDto,
  ) {
    const permission = await this.permissionService.update(
      id,
      updatePermissionDto,
    );
    return permission;
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    const permission = await this.permissionService.remove(id);
    return permission;
  }
}
