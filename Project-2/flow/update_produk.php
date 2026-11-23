<?php
header("Content-Type: application/json");
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: PUT, PATCH, POST");
header("Access-Control-Allow-Headers: Content-Type");

include "../koneksi/connection.php";

$rawInput = file_get_contents("php://input");
$jsonInput = json_decode($rawInput, true);

$id = $_GET["id"] ?? ($jsonInput["id"] ?? ($_POST["id"] ?? null));
$nama_produk = $jsonInput["nama_produk"] ?? ($_POST["nama_produk"] ?? null);
$harga = $jsonInput["harga"] ?? ($_POST["harga"] ?? null);
$deskripsi = $jsonInput["deskripsi"] ?? ($_POST["deskripsi"] ?? null);

if (empty($id) || !is_numeric($id)) {
    http_response_code(400);
    echo json_encode([
        "status" => false,
        "message" => "id produk wajib diisi dan harus berupa angka"
    ]);
    exit;
}

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

$id_num = (int) $id;
$harga_num = (int) $harga;
$deskripsi_val = $deskripsi ?? "";

$cekStmt = mysqli_prepare($conn, "SELECT id FROM produk WHERE id = ?");
mysqli_stmt_bind_param($cekStmt, "i", $id_num);
mysqli_stmt_execute($cekStmt);
$cekResult = mysqli_stmt_get_result($cekStmt);

if (mysqli_num_rows($cekResult) === 0) {
    http_response_code(404);
    echo json_encode([
        "status" => false,
        "message" => "Produk dengan id $id_num tidak ditemukan"
    ]);
    mysqli_stmt_close($cekStmt);
    mysqli_close($conn);
    exit;
}
mysqli_stmt_close($cekStmt);

$stmt = mysqli_prepare(
    $conn,
    "UPDATE produk SET nama_produk = ?, harga = ?, deskripsi = ? WHERE id = ?"
);
mysqli_stmt_bind_param($stmt, "sisi", $nama_produk, $harga_num, $deskripsi_val, $id_num);

if (mysqli_stmt_execute($stmt)) {
    echo json_encode([
        "status" => true,
        "message" => "Produk berhasil diperbarui",
        "data" => [
            "id" => $id_num,
            "nama_produk" => $nama_produk,
            "harga" => $harga_num,
            "deskripsi" => $deskripsi_val
        ]
    ]);
} else {
    http_response_code(500);
    echo json_encode([
        "status" => false,
        "message" => "Gagal memperbarui produk: " . mysqli_stmt_error($stmt)
    ]);
}

mysqli_stmt_close($stmt);
mysqli_close($conn);
?>