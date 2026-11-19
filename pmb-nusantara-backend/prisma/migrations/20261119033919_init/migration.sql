-- CreateTable
CREATE TABLE "Pendaftar" (
    "id" SERIAL NOT NULL,
    "noPendaftaran" TEXT NOT NULL,
    "nama" TEXT NOT NULL,
    "nik" VARCHAR(16) NOT NULL,
    "prodi" TEXT NOT NULL,
    "jalur" TEXT NOT NULL,
    "status" TEXT NOT NULL DEFAULT 'Menunggu Verifikasi',
    "tanggalDaftar" TEXT NOT NULL,
    "aktif" BOOLEAN NOT NULL DEFAULT true,

    CONSTRAINT "Pendaftar_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Pendaftar_noPendaftaran_key" ON "Pendaftar"("noPendaftaran");

-- CreateIndex
CREATE UNIQUE INDEX "Pendaftar_nik_key" ON "Pendaftar"("nik");
