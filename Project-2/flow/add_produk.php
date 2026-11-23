<?php
header("Content-Type: application/json");
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Allow-Headers: Content-Type");

include "../koneksi/connection.php";

// Membaca input JSON atau form-data (x-www-form-urlencoded / form-data)
$rawInput = file_get_contents("php://input");
$jsonInput = json_decode($rawInput, true);

$nama_produk = $jsonInput["nama_produk"] ?? ($_POST["nama_produk"] ?? null);
$harga = $jsonInput["harga"] ?? ($_POST["harga"] ?? null);
$deskripsi = $jsonInput["deskripsi"] ?? ($_POST["deskripsi"] ?? "");

// Validasi input wajib
if (empty($nama_produk) || $harga === null || $harga === "") {
    http_response_code(400);
    echo json_encode([
        "status" => false,
        "message" => "nama_produk dan harga wajib diisi"
    ]);
    exit;
}

if (!is_numeric($harga)) {
    http_response_code(400);
    echo json_encode([
        "status" => false,
        "message" => "harga harus berupa angka"
    ]);
    exit;
}

// Gunakan prepared statement agar aman dari SQL Injection
$stmt = mysqli_prepare(
    $conn,
    "INSERT INTO produk (nama_produk, harga, deskripsi) VALUES (?, ?, ?)"
);

$harga_num = (int) $harga;
mysqli_stmt_bind_param($stmt, "sis", $nama_produk, $harga_num, $deskripsi);

if (mysqli_stmt_execute($stmt)) {
    $new_id = mysqli_insert_id($conn);
    http_response_code(201);
    echo json_encode([
        "status" => true,
        "message" => "Produk berhasil ditambahkan",
        "data" => [
            "id" => $new_id,
            "nama_produk" => $nama_produk,
            "harga" => $harga_num,
            "deskripsi" => $deskripsi
        ]
    ]);
} else {
    http_response_code(500);
    echo json_encode([
        "status" => false,
        "message" => "Gagal menambahkan produk: " . mysqli_stmt_error($stmt)
    ]);
}

mysqli_stmt_close($stmt);
mysqli_close($conn);
?>