import { IsString, MinLength, Matches, IsIn, IsOptional, IsBoolean } from 'class-validator';
export class CreatePendaftarDto {
  @IsString() @MinLength(3) nama: string;
  @IsString() @Matches(/^\d{16}$/, { message: 'NIK harus 16 digit angka' }) nik: string;
  @IsIn(['Teknik Informatika', 'Sistem Informasi', 'Manajemen']) prodi: string;
  @IsIn(['Reguler', 'Prestasi']) jalur: string;
  @IsOptional() @IsIn(['Draf', 'Menunggu Verifikasi', 'Berkas Tidak Lengkap', 'Terverifikasi', 'Lulus', 'Tidak Lulus']) status?: string;
  @IsOptional() @IsBoolean() aktif?: boolean;
}
