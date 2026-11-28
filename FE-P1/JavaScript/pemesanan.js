// MENGAMBIL PRODUK DARI URL
const params = new URLSearchParams(window.location.search);

const id = params.get("id");
const namaProduk = params.get("produk");

const konversiProduk = {
    garbera: "1",
    sunflower: "2",
    rose: "3",
    lily: "4"
};

const productId = id || konversiProduk[namaProduk] || "1";

const selectedProduct = daftarProduk[productId];

// FORMAT RUPIAH
function formatRupiah(angka) {
    return "Rp" + angka.toLocaleString("id-ID");
}

// MENAMPILKAN PRODUK
function tampilkanProduk() {

    if (!selectedProduct) {
        alert("Produk tidak ditemukan!");

        window.location.href = "menu-utama.html";
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

// MENGATUR JUMLAH PESANAN
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

// MENGHITUNG TOTAL HARGA
function hitungTotal() {

    if (!selectedProduct) return;

    const input = document.getElementById("jumlah");

    let jumlah = parseInt(input.value);

    if (!Number.isInteger(jumlah) || jumlah < 1) {
        jumlah = 1;
    }

    if (jumlah > 99) {
        jumlah = 99;
    }

    input.value = jumlah;

    const total = selectedProduct.price * jumlah;

    document.getElementById("totalHarga").textContent =
        formatRupiah(total);
}

// VALIDASI INPUT JUMLAH
document.getElementById("jumlah").addEventListener(
    "input",
    function () {

        const input = this;
        let jumlah = parseInt(input.value);

        if (input.value === "") {
            document.getElementById("totalHarga").textContent = "Rp0";
            return;
        }

        if (!Number.isInteger(jumlah) || jumlah < 1) {
            jumlah = 1;
        }

        if (jumlah > 99) {
            jumlah = 99;
        }

        input.value = jumlah;

        hitungTotal();
    }
);

// PROSES PEMESANAN
function buatPesanan() {

    if (!selectedProduct) return;

    // Mengambil pilihan warna
    const warna = document.querySelector(
        'input[name="warna"]:checked'
    );

    // Mengambil pilihan wrapping
    const wrapping = document.getElementById("wrapping").value;

    // Mengambil jumlah
    const jumlah = parseInt(
        document.getElementById("jumlah").value
    );

    // Mengambil catatan
    const catatan = document.getElementById("catatan").value.trim();


    // VALIDASI WARNA
    if (!warna) {
        alert("Silakan pilih warna bunga!");
        return;
    }


    // VALIDASI JUMLAH
    if (!Number.isInteger(jumlah) || jumlah < 1 || jumlah > 99) {
        alert("Jumlah pesanan harus antara 1 sampai 99!");
        return;
    }


    // MENGHITUNG TOTAL
    const total = selectedProduct.price * jumlah;


    // MEMBUAT PESAN WHATSAPP
        const pesan = `
        Halo Min Bloomy's! 

        Saya ingin melakukan pemesanan bunga.

        *DETAIL PESANAN*

        Produk: ${selectedProduct.name}
        Harga Satuan: ${formatRupiah(selectedProduct.price)}
        Warna Bunga: ${warna.value}
        Wrapping: ${wrapping}
        Jumlah: ${jumlah}

        Catatan Request:
        ${catatan || "Tidak ada catatan"}

        *TOTAL PEMBAYARAN: ${formatRupiah(total)}*

        Mohon konfirmasi pesanan saya.

        Terima kasih! 
`;


    // NOMOR WHATSAPP TOKO
    const nomorWhatsApp = "6281224103373";


    // MEMBUKA WHATSAPP
    const linkWhatsApp = "https://wa.me/" + nomorWhatsApp + "?text=" + encodeURIComponent(pesan);
    window.open(linkWhatsApp, "_blank");
}

// MENJALANKAN SAAT HALAMAN DIBUKA
tampilkanProduk();

