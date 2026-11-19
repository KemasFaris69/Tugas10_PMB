import { randomUUID } from 'crypto';
import { Injectable, NotFoundException, ConflictException } from '@nestjs/common';
import { Prisma, Pendaftar } from '@prisma/client';
import { PrismaService } from '../prisma/prisma.service';
import { CreatePendaftarDto } from './dto/create-pendaftar.dto';
import { UpdatePendaftarDto } from './dto/update-pendaftar.dto';

@Injectable()
export class PendaftarService {
  constructor(private readonly prisma: PrismaService) {}

  private handleError(error: unknown): never {
    if (error instanceof Prisma.PrismaClientKnownRequestError && error.code === 'P2002') {
      const fields = error.meta?.target;
      const target = Array.isArray(fields) ? fields.join(', ') : String(fields ?? '');
      throw new ConflictException(target.includes('nik') ? 'NIK sudah terdaftar' : 'Data unik sudah digunakan');
    }
    throw error;
  }

  async create(dto: CreatePendaftarDto): Promise<Pendaftar> {
    // PostgreSQL sequence menghasilkan ID unik walaupun beberapa request masuk bersamaan.
    // Nomor pendaftaran dibuat setelah ID tersedia, dalam transaksi yang sama.
    try {
      return await this.prisma.$transaction(async (tx) => {
        const created = await tx.pendaftar.create({ data: {
          noPendaftaran: `TMP-${randomUUID()}`,
          nama: dto.nama.trim(), nik: dto.nik, prodi: dto.prodi, jalur: dto.jalur,
          status: dto.status ?? 'Menunggu Verifikasi', aktif: dto.aktif ?? true,
          tanggalDaftar: new Date().toLocaleDateString('id-ID', { day: 'numeric', month: 'short', year: 'numeric', timeZone: 'Asia/Jakarta' }),
        } });
        return tx.pendaftar.update({ where: { id: created.id }, data: { noPendaftaran: `PMB-26${String(created.id).padStart(3, '0')}` } });
      });
    } catch (error) { return this.handleError(error); }
  }

  findAll(): Promise<Pendaftar[]> { return this.prisma.pendaftar.findMany({ orderBy: { id: 'desc' } }); }

  async findOne(id: number): Promise<Pendaftar> {
    const item = await this.prisma.pendaftar.findUnique({ where: { id } });
    if (!item) throw new NotFoundException(`Pendaftar dengan ID ${id} tidak ditemukan`);
    return item;
  }

  async update(id: number, dto: UpdatePendaftarDto): Promise<Pendaftar> {
    await this.findOne(id);
    try {
      return await this.prisma.pendaftar.update({ where: { id }, data: { ...dto, ...(dto.nama !== undefined ? { nama: dto.nama.trim() } : {}) } });
    } catch (error) {
      if (error instanceof Prisma.PrismaClientKnownRequestError && error.code === 'P2025') throw new NotFoundException(`Pendaftar dengan ID ${id} tidak ditemukan`);
      return this.handleError(error);
    }
  }

  async remove(id: number): Promise<Pendaftar> {
    try { return await this.prisma.pendaftar.delete({ where: { id } }); }
    catch (error) {
      if (error instanceof Prisma.PrismaClientKnownRequestError && error.code === 'P2025') throw new NotFoundException(`Pendaftar dengan ID ${id} tidak ditemukan`);
      return this.handleError(error);
    }
  }
}
