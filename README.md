# PMB Nusantara — Tugas 10: PostgreSQL + Prisma ORM

**Kemas Faris Rahadiansyah — 103022300040**

Kelanjutan langsung Tugas 9. Tampilan React + Vite + Tailwind, komponen, dan endpoint Controller NestJS dipertahankan. Penyimpanan array pada `PendaftarService` diganti Prisma ORM dan PostgreSQL agar data tidak hilang saat server di-restart.

## Struktur
- `pmb-nusantara-frontend/` — frontend React yang sama dengan Tugas 9.
- `pmb-nusantara-backend/` — NestJS, DTO, Controller, PrismaService, dan model Prisma.
- `docs/screenshots/` — screenshot Tugas 9 yang dibawa sebagai referensi; **tambahkan screenshot baru Tugas 10** (migrasi, pengujian, desktop dan mobile).

## Prasyarat
- Node.js versi 20+ (disarankan Node 22 LTS) dan npm.
- PostgreSQL lokal berjalan di port 5432.
- Buat database kosong bernama `pmb_nusantara`, misalnya di psql: `CREATE DATABASE pmb_nusantara;`.

## Instalasi backend

```powershell
cd pmb-nusantara-backend
npm install
Copy-Item .env.example .env
```

Edit `.env` sesuai username/password PostgreSQL lokal. Contoh: `DATABASE_URL="postgresql://postgres:PASSWORD_ANDA@localhost:5432/pmb_nusantara?schema=public"`. Jika password mengandung karakter khusus, URL-encode password tersebut. **Jangan unggah `.env` ke GitHub.**

```powershell
npx prisma migrate dev --name init
npx prisma generate
npm run start:dev
```

Migrasi membuat tabel `Pendaftar`. Prisma Client dihasilkan dari model tersebut. Jika migrasi gagal karena izin database, gunakan akun PostgreSQL yang dapat membuat database bayangan (shadow database), atau minta izin yang sesuai.

## Menjalankan frontend

Buka terminal lain dari root proyek:

```powershell
cd pmb-nusantara-frontend
npm install
npm run dev
```

Frontend biasanya `http://localhost:5173`, backend `http://localhost:3000`. API frontend tetap memakai endpoint yang sama dengan Tugas 9.

## Endpoint (Controller tidak diubah)

| Method | Endpoint | Fungsi |
|---|---|---|
| POST | `/pendaftar` | Tambah pendaftar |
| GET | `/pendaftar` | Lihat semua |
| GET | `/pendaftar/:id` | Lihat satu |
| PATCH | `/pendaftar/:id` | Ubah pendaftar |
| DELETE | `/pendaftar/:id` | Hapus pendaftar |

DTO dan validasi tetap seperti Tugas 9. Error 400 (validasi), 404 (ID tidak ada), dan 409 (NIK duplikat) dipertahankan. Database baru **tidak otomatis berisi enam data contoh Tugas 9**; tambahkan data lewat form atau `requests.http`. `noPendaftaran` mengikuti pola Tugas 9 dan dibuat dari ID database.

## Bukti persistensi
1. POST data pendaftar melalui frontend atau REST Client.
2. GET `/pendaftar` dan catat data yang muncul.
3. Hentikan backend (`Ctrl+C`) lalu jalankan lagi `npm run start:dev`.
4. GET `/pendaftar` sekali lagi. Data harus tetap ada.
5. Uji PATCH dan DELETE menggunakan ID yang benar. Jangan menghapus data sebelum mengambil bukti persistensi.

## Screenshot yang perlu ditambahkan
- PostgreSQL: database dan tabel `Pendaftar` (pgAdmin atau psql).
- Terminal: hasil `npx prisma migrate dev --name init`.
- REST Client: POST, GET semua, GET detail, PATCH, DELETE; hasil setelah restart.
- Frontend desktop dan mobile (DevTools → Toggle device toolbar).
- Simpan di `docs/screenshots/tugas10/` dan tambahkan gambar ke README jika diinginkan. Screenshot yang sudah ada berasal dari Tugas 9, bukan bukti Tugas 10.

## Pengumpulan
Push repository GitHub (boleh melanjutkan repository sebelumnya), lengkapi README dan screenshot, lalu kumpulkan **link GitHub** di LMS. Jangan push `.env`, `node_modules`, atau `dist`.

**Catatan:** Paket ini disiapkan dari source code Tugas 9 yang diunggah. Instalasi npm, migrasi, build, dan pengujian terhadap PostgreSQL lokal harus dilakukan pada komputer pengguna; hasilnya belum diverifikasi di sini.
