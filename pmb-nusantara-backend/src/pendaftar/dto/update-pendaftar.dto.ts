import { PartialType } from '@nestjs/mapped-types';
import { CreatePendaftarDto } from './create-pendaftar.dto';
export class UpdatePendaftarDto extends PartialType(CreatePendaftarDto) {}
