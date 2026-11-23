
/* =====================================
   DATA PRODUK FLOWERBLOOM
===================================== */

const daftarProduk = {

    "1": {
        name: "Garbera Bouquet",
        price: 150000,
        image: "image/garbera.JPEG",
        description: "Buket bunga gerbera melambangkan keceriaan, energi positif, kebahagiaan yang tulus, serta cinta yang setia. Bentuk kelopaknya yang terbuka dan cerah membuat buket ini sering dipakai untuk menyampaikan semangat baru dan rasa nyaman."
    },

    "2": {
        name: "Sunflower Happiness",
        price: 175000,
        image: "image/sunflower.JPEG",
        description: "Buket bunga matahari melambangkan kesetiaan, optimisme, kehangatan, harapan, dan keteguhan hati karena sifatnya yang selalu mengikuti arah cahaya matahari (heliotropism) dan warna kuningnya yang cerah."
    },

    "3": {
        name: "Rose Dream",
        price: 200000,
        image: "image/pinkrose.JPEG",
        description: "Buket bunga mawar (rose) berakar pada perpaduan makna cinta, keindahan, apresiasi, dan kesadaran akan kesementaraan hidup. Dalam sebuah buket, tangkai-tangkai mawar disatukan untuk menyampaikan pesan emosional yang sering kali sulit diucapkan dengan kata-kata."
    },

    "4": {
        name: "Lily Elegance",
        price: 180000,
        image: "image/lily.JPEG",
        description: "Buket bunga lily melambangkan kemurnian, ketulusan, keanggunan, pembaruan, serta keseimbangan antara kelembutan dan ketangguhan."
    }

};


/* =====================================
   MENGAMBIL PRODUK DARI URL
===================================== */

const params = new URLSearchParams(window.location.search);

const id = params.get("id");
const namaProduk = params.get("produk");

const konversiProduk = {
    garbera: "1",
    sunflower: "2",
    rose: "3",
    lily: "4"
};

// Mendukung id=1 maupun produk=garbera
const productId = id || konversiProduk[namaProduk] || "1";

const selectedProduct = daftarProduk[productId];


/* =====================================
   FORMAT RUPIAH
===================================== */

function formatRupiah(angka) {

    return "Rp" + angka.toLocaleString("id-ID");

}


/* =====================================
   MENAMPILKAN PRODUK
===================================== */

function tampilkanProduk() {

    if (!selectedProduct) {

        document.querySelector(".order-form").innerHTML = `
            <h3>Produk tidak ditemukan</h3>
            <p>Silakan pilih produk kembali dari halaman utama.</p>
            <a href="menu-utama.html">
                Kembali ke Halaman Utama
            </a>
        `;

        return;
    }

    document.getElementById("orderName").textContent =
        selectedProduct.name;

    document.getElementById("orderPrice").textContent =
        formatRupiah(selectedProduct.price);

    document.getElementById("orderImage").src =
        selectedProduct.image;

    document.getElementById("orderImage").alt =
        selectedProduct.name;

    document.getElementById("orderDescription").textContent =
        selectedProduct.description;

    hitungTotal();

}


/* =====================================
   MENGATUR JUMLAH PESANAN
===================================== */

function ubahJumlah(nilai) {

    const input = document.getElementById("jumlah");

    let jumlah = parseInt(input.value) || 1;

    jumlah += nilai;

    if (jumlah < 1) {
        jumlah = 1;
    }

    if (jumlah > 99) {
        jumlah = 99;
    }

    input.value = jumlah;

    hitungTotal();

}


/* =====================================
   MENGHITUNG TOTAL HARGA
===================================== */

function hitungTotal() {

    if (!selectedProduct) return;

    const input = document.getElementById("jumlah");

    let jumlah = parseInt(input.value) || 1;

    if (jumlah < 1) jumlah = 1;
    if (jumlah > 99) jumlah = 99;

    const total = selectedProduct.price * jumlah;

    document.getElementById("totalHarga").textContent =
        formatRupiah(total);

}


/* =====================================
   INPUT JUMLAH
===================================== */

document.getElementById("jumlah").addEventListener(
    "input",
    hitungTotal
);


/* =====================================
   PROSES PEMESANAN
===================================== */

function buatPesanan() {

    if (!selectedProduct) return;

    const warna = document.querySelector(
        'input[name="warna"]:checked'
    );

    const wrapping = document.getElementById("wrapping").value;

    const jumlah = parseInt(
        document.getElementById("jumlah").value
    );

    const catatan = document.getElementById("catatan").value.trim();

    // VALIDASI
    if (!warna) {
        alert("Silakan pilih warna bunga!");
        return;
    }

    if (!Number.isInteger(jumlah) || jumlah < 1 || jumlah > 99) {
        alert("Jumlah pesanan tidak valid!");
        return;
    }

    // HITUNG TOTAL
    const total = selectedProduct.price * jumlah;

    // DETAIL PESANAN
    const pesan = `
Halo Min Bloomy's!

Saya ingin melakukan pemesanan bunga.

*DETAIL PESANAN*
Produk: ${selectedProduct.name}
Harga: ${formatRupiah(selectedProduct.price)}
Warna Bunga: ${warna.value}
Wrapping: ${wrapping}
Jumlah: ${jumlah}

Catatan Request:
${catatan || "Tidak ada"}

*Total Pembayaran: ${formatRupiah(total)}*

Mohon konfirmasi pesanan saya.
Terima kasih!
`;

    // NOMOR WHATSAPP TOKO
    const nomorWhatsApp = "6281224103373";

    // BUKA WHATSAPP
    const linkWhatsApp =
        "https://wa.me/" + nomorWhatsApp +
        "?text=" + encodeURIComponent(pesan);

    window.open(linkWhatsApp, "_blank");

}


/* =====================================
   JALANKAN SAAT HALAMAN DIBUKA
===================================== */

tampilkanProduk();
