# Bloomy's — Project 1 & Project 2 (Pemrograman Web 1)

Repositori ini memuat **Project 1** (aplikasi web Bloomy's Flower Shop)[cite: 20, 27] dan **Project 2** (CRUD API berbasis PHP & MySQL dengan pengujian di Bruno)[cite: 21, 27] dalam satu repository yang sama[cite: 21].

## Struktur Folder
- `Project-1/FlowerBloom/` — halaman web (`index.html`, `detail.html`, `login.html`, `registrasi.html`, `menu-utama.html`, `pemesanan.html`), gaya CSS (`style.css`, `pemesanan.css`), skrip JS (`app.js`, `pemesanan.js`), dan aset gambar (`image/`)[cite: 19, 20]
- `Project-1/screenshots/` — tangkapan layar tampilan halaman & fitur Project 1[cite: 20, 26]
- `Project-2/database/db_bloomys.sql` — skrip struktur database dan data produk Bloomy's[cite: 19, 21]
- `Project-2/koneksi/connection.php` — konfigurasi koneksi database PHP[cite: 8, 19]
- `Project-2/flow/get_produk.php` — endpoint `GET` untuk mengambil data produk[cite: 19]
- `Project-2/flow/add_produk.php` — endpoint `POST` untuk menambah data produk[cite: 19]
- `Project-2/flow/update_produk.php` — endpoint `PUT` untuk mengubah data produk[cite: 19]
- `Project-2/flow/delete_produk.php` — endpoint `DELETE` untuk menghapus data produk[cite: 19]
- `Project-2/screenshots/` — tangkapan layar hasil pengujian API di Bruno[cite: 21, 27]

---

## Dokumentasi Project 1

### Beranda & Koleksi Produk
![Beranda](Project-1/screenshots/Beranda.jpg)
![Produk Bloomys](Project-1/screenshots/Produk_bloomys.jpg)
![Tentang Bloomys](Project-1/screenshots/Tentang_bloomys.jpg)
![Detail Koleksi](Project-1/screenshots/Detail_koleksi.jpg)

### Autentikasi (Registrasi, Login & Lupa Password)
![Registrasi](Project-1/screenshots/Registrasi.jpg)
![Login](Project-1/screenshots/Login.jpg)
![Lupa Password](Project-1/screenshots/Lupa_password.jpg)
![Akun Demo](Project-1/screenshots/Akun_demo.jpg)

### Halaman Utama & Pembelian
![Halaman Utama](Project-1/screenshots/Halaman_utama.jpg)
![Beli Produk](Project-1/screenshots/Beli_produk.jpg)
![Pembelian](Project-1/screenshots/Pembelian.jpg)
![Form Pembelian](Project-1/screenshots/Form_pembelian.jpg)
![Template Pembelian](Project-1/screenshots/Template_pembelian.jpg)
![Header Pembelian](Project-1/screenshots/Header_pembelian.jpg)
![Footer Pembelian](Project-1/screenshots/Footer_pembelian.jpg)

### Tanya Kami & Footer
![Tanya Kami](Project-1/screenshots/Tanya_kami.jpg)
![Template Tanya Kami](Project-1/screenshots/Template_tanya_kami.jpg)
![Footer](Project-1/screenshots/Footer.jpg)
![Footer Detail](Project-1/screenshots/Footer_detail.jpg)

---

## Dokumentasi Project 2 (CRUD API)

### Endpoint API
| Method | Endpoint | Fungsi |
| :--- | :--- | :--- |
| `GET` | `http://localhost/Bloomys/Project-2/flow/get_produk.php` | Menampilkan daftar produk[cite: 19] |
| `POST` | `http://localhost/Bloomys/Project-2/flow/add_produk.php` | Menambahkan produk baru[cite: 19] |
| `PUT` | `http://localhost/Bloomys/Project-2/flow/update_produk.php?id={id}` | Mengubah data produk berdasarkan `id`[cite: 19] |
| `DELETE` | `http://localhost/Bloomys/Project-2/flow/delete_produk.php?id={id}` | Menghapus data produk berdasarkan `id`[cite: 19] |

### Hasil Uji API di Bruno

#### Create / Tambah Produk (`add_produk.php`)
![Add Produk](Project-2/screenshots/add_produk.jpg)
![Setelah Add Produk](Project-2/screenshots/setelah_add_produk.jpg)

#### Update / Ubah Produk (`update_produk.php`)
![Update Produk](Project-2/screenshots/update_produk.jpg)
![Setelah Update Produk](Project-2/screenshots/setelah_update_produk.jpg)

#### Delete / Hapus Produk (`delete_produk.php`)
![Delete Produk](Project-2/screenshots/delete_produk.jpg)
![Setelah Delete Produk](Project-2/screenshots/setelah_delete_produk.jpg)