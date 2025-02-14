# Instalasi SmartSales Laravel dengan Inertia.js, React, dan TypeScript

## Prasyarat
Sebelum memulai, pastikan sistem Anda telah menginstal:
- PHP 8.1 atau lebih baru
- Composer
- Node.js dan npm/yarn
- Database (MySQL, PostgreSQL, SQLite, dll.)

## 1. Instalasi Laravel dan Inertia
Jalankan perintah berikut untuk membuat proyek Laravel baru:
```sh
composer install
```
## 2. Instalasi React dan TypeScript
Jalankan perintah berikut untuk menginstal React dengan TypeScript:
```sh
npm install
```

## 3. Konfigurasi .env
Sesuaikan database dan send email di file .env:
```sh
DB_CONNECTION=mysql
DB_HOST=127.0.0.1
DB_PORT=3306
DB_DATABASE=nama_database
DB_USERNAME=username_anda
DB_PASSWORD=password_anda

MAIL_MAILER=smtp
MAIL_HOST=smtp.gmail.com
MAIL_PORT=587
MAIL_USERNAME=email@gmail.com
MAIL_PASSWORD=generate from google
MAIL_ENCRYPTION=tls
MAIL_FROM_ADDRESS=email@gmail.com
MAIL_FROM_NAME="PT.SmartSales Indonesia"
```

## 3. Generate app password di gmail
    1. Buka profile dan klik Kelola akun/Manage your Google Account
    2. Pada search bar cari App passwords/Sandi aplikasi
    3. Buat App name/Nama aplikasi yang anda mau
    4. Password akan ter generate copy paste password kedalam MAIL_PASSWORD
    5. Hapus spasi dari password nya

## 4. Buat database dan migrate
Buat database baru di mysql dan sesuaikan di .env lalu jalankan:
```sh
php artisan migrate
```

## 5. Menjalankan Aplikasi
Jalankan perintah berikut:
```sh
php artisan serve
npm run dev
```
Kemudian buka browser dan akses `http://127.0.0.1:8000` untuk melihat aplikasi Anda berjalan dengan Laravel, Inertia, React, dan TypeScript.

