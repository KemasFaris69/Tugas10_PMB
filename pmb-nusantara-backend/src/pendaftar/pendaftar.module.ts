import { Module } from '@nestjs/common';
import { PendaftarController } from './pendaftar.controller';
import { PendaftarService } from './pendaftar.service';
@Module({ controllers: [PendaftarController], providers: [PendaftarService] })
export class PendaftarModule {}
