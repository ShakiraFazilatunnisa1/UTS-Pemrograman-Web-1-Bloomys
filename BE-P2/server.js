
const express = require("express");
const cors = require("cors");

// Mengambil data dummy dari FE-P1
const produkAwal = require("../FE-P1/JavaScript/data.js");

const app = express();
const PORT = 3000;

// Middleware
app.use(cors());
app.use(express.json());

// Menyalin data dummy ke backend
let products = { ...produkAwal };

// GET - Menampilkan semua produk
app.get("/api/products", (req, res) => {
    res.status(200).json({
        message: "Berhasil mengambil semua produk",
        data: products
    });
});

// GET - Menampilkan produk berdasarkan ID
app.get("/api/products/:id", (req, res) => {
    const id = req.params.id;

    if (!products[id]) {
        return res.status(404).json({
            message: "Produk tidak ditemukan"
        });
    }

    res.status(200).json({
        message: "Berhasil mengambil produk",
        data: products[id]
    });
});

// POST - Menambahkan produk baru
app.post("/api/products", (req, res) => {
    const { name, price, image, description } = req.body;

    if (!name || price === undefined || isNaN(Number(price))) {
        return res.status(400).json({
            message: "Nama dan harga produk wajib diisi dengan benar"
        });
    }

    const newId = String(
        Math.max(0, ...Object.keys(products).map(Number)) + 1
    );

    products[newId] = {
        name,
        price: Number(price),
        image: image || "",
        description: description || ""
    };

    res.status(201).json({
        message: "Produk berhasil ditambahkan",
        id: newId,
        data: products[newId]
    });
});

// PUT - Mengubah produk
app.put("/api/products/:id", (req, res) => {
    const id = req.params.id;

    if (!products[id]) {
        return res.status(404).json({
            message: "Produk tidak ditemukan"
        });
    }

    const { name, price, image, description } = req.body;

    if (price !== undefined && isNaN(Number(price))) {
        return res.status(400).json({
            message: "Harga harus berupa angka"
        });
    }

    products[id] = {
        ...products[id],
        ...(name !== undefined && { name }),
        ...(price !== undefined && { price: Number(price) }),
        ...(image !== undefined && { image }),
        ...(description !== undefined && { description })
    };

    res.status(200).json({
        message: "Produk berhasil diperbarui",
        data: products[id]
    });
});

// DELETE - Menghapus produk
app.delete("/api/products/:id", (req, res) => {
    const id = req.params.id;

    if (!products[id]) {
        return res.status(404).json({
            message: "Produk tidak ditemukan"
        });
    }

    const deletedProduct = products[id];

    delete products[id];

    res.status(200).json({
        message: "Produk berhasil dihapus",
        data: deletedProduct
    });
});

// Menjalankan server
app.listen(PORT, () => {
    console.log(`Bloomy's API berjalan di http://localhost:${PORT}`);
});
