import { Module } from '@nestjs/common';
import { PendaftarModule } from './pendaftar/pendaftar.module';
import { PrismaModule } from './prisma/prisma.module';

@Module({ imports: [PrismaModule, PendaftarModule] })
export class AppModule {}
