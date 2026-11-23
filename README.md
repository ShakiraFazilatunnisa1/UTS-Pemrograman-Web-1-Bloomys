# Bloomy's — Project 1 & Project 2 (Pemrograman Web 1)

Repositori ini memuat **Project 1** (aplikasi web Bloomy's Flower Shop) dan **Project 2** (CRUD API berbasis PHP & MySQL dengan pengujian di Bruno) dalam satu repository.

## Struktur Folder
- `Project-1/FlowerBloom/` — halaman web, gaya CSS, skrip JavaScript, dan aset gambar (`image/`)
- `Project-1/screenshoots_web/` — tangkapan layar tampilan halaman & fitur Project 1
- `Project-2/database/` — skrip struktur database dan data produk Bloomy's
- `Project-2/flow/` — endpoint CRUD API (`get_produk.php`, `add_produk.php`, `update_produk.php`, `delete_produk.php`)
- `Project-2/koneksi/` — konfigurasi koneksi database
- `Project-2/test_koneksi.php` — skrip pengujian koneksi database
- `Project-2/screenshots/` — tangkapan layar hasil pengujian API di Bruno

---

## Dokumentasi Project 1

### Beranda & Koleksi Produk
![Beranda](./Project-1/screenshoots_web/Beranda.jpeg)
![Tentang Bloomys](./Project-1/screenshoots_web/Tentang_bloomys.jpeg)
![Produk Bloomys](./Project-1/screenshoots_web/Produk_bloomys.jpeg)
![Detail Koleksi](./Project-1/screenshoots_web/Detail_koleksi.jpeg)
![Tanya Kami](./Project-1/screenshoots_web/Tanya_kami.jpeg)
![Template Tanya Kami](./Project-1/screenshoots_web/Template_tanya_kami.jpeg)
![Footer](./Project-1/screenshoots_web/Footer.jpeg)

### Autentikasi (Registrasi, Login & Lupa Password)
![Registrasi](./Project-1/screenshoots_web/Registrasi.jpeg)
![Login](./Project-1/screenshoots_web/Login.jpeg)
![Lupa Password](./Project-1/screenshoots_web/Lupa_password.jpeg)
![Akun Demo](./Project-1/screenshoots_web/Akun_demo.jpeg)

### Halaman Utama & Pembelian
![Header Pembelian](./Project-1/screenshoots_web/Header_pembelian.jpeg)
![Halaman Utama](./Project-1/screenshoots_web/Halaman_utama.jpeg)
![Beli Produk](./Project-1/screenshoots_web/Beli_produk.jpeg)
![Form Pembelian](./Project-1/screenshoots_web/Form_pembelian.jpeg)
![Pembelian](./Project-1/screenshoots_web/Pembelian.jpeg)
![Template Pembelian](./Project-1/screenshoots_web/Template_pembelian.jpeg)
![Footer Pembelian](./Project-1/screenshoots_web/Footer_pembelian.jpeg)

### Tanya Kami & Footer
![instagram](./Project-1/screenshoots_web/instagram.jpeg)
![whatsapp](./Project-1/screenshoots_web/whatsapp.jpeg)
![Footer](./Project-1/screenshoots_web/Footer.jpeg)
![Footer Detail](./Project-1/screenshoots_web/Footer_detail.jpeg)

---

## Dokumentasi Project 2 (CRUD API)

### Endpoint API
| Method | Endpoint | Fungsi |
| :--- | :--- | :--- |
| `GET` | `http://localhost/Bloomys/Project-2/flow/get_produk.php` | Menampilkan daftar produk |
| `POST` | `http://localhost/Bloomys/Project-2/flow/add_produk.php` | Menambahkan produk baru |
| `PUT` | `http://localhost/Bloomys/Project-2/flow/update_produk.php?id={id}` | Mengubah data produk berdasarkan `id` |
| `DELETE` | `http://localhost/Bloomys/Project-2/flow/delete_produk.php?id={id}` | Menghapus data produk berdasarkan `id` |

### Hasil Uji API di Bruno

#### Create / Tambah Produk (`add_produk.php`)
![Add Produk](./Project-2/screenshots/add_produk.jpeg)
![Setelah Add Produk](./Project-2/screenshots/setelah_add_produk.jpeg)

#### Update / Ubah Produk (`update_produk.php`)
![Update Produk](./Project-2/screenshots/update_produk.jpeg)
![Setelah Update Produk](./Project-2/screenshots/setelah_update_produk.jpeg)

#### Delete / Hapus Produk (`delete_produk.php`)
![Delete Produk](./Project-2/screenshots/delete_produk.jpeg)
![Setelah Delete Produk](./Project-2/screenshots/setelah_delete_produk.jpeg)
