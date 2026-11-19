import { Controller, Get, Post, Patch, Delete, Body, Param, ParseIntPipe } from '@nestjs/common';
import { PendaftarService } from './pendaftar.service';
import { CreatePendaftarDto } from './dto/create-pendaftar.dto';
import { UpdatePendaftarDto } from './dto/update-pendaftar.dto';
@Controller('pendaftar')
export class PendaftarController {
  constructor(private readonly service: PendaftarService) {}
  @Post() create(@Body() dto: CreatePendaftarDto) { return this.service.create(dto); }
  @Get() findAll() { return this.service.findAll(); }
  @Get(':id') findOne(@Param('id', ParseIntPipe) id: number) { return this.service.findOne(id); }
  @Patch(':id') update(@Param('id', ParseIntPipe) id: number, @Body() dto: UpdatePendaftarDto) { return this.service.update(id, dto); }
  @Delete(':id') remove(@Param('id', ParseIntPipe) id: number) { return this.service.remove(id); }
}
