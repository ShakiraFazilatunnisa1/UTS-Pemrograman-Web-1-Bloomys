<?php
header("Content-Type: application/json");
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: DELETE, POST");
header("Access-Control-Allow-Headers: Content-Type");

include "../koneksi/connection.php";

$rawInput = file_get_contents("php://input");
$jsonInput = json_decode($rawInput, true);

$id = $_GET["id"] ?? ($jsonInput["id"] ?? ($_POST["id"] ?? null));

if (empty($id) || !is_numeric($id)) {
    http_response_code(400);
    echo json_encode([
        "status" => false,
        "message" => "id produk wajib diisi dan harus berupa angka"
    ]);
    exit;
}

$id_num = (int) $id;

// Cek apakah produk dengan id tersebut ada
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

$stmt = mysqli_prepare($conn, "DELETE FROM produk WHERE id = ?");
mysqli_stmt_bind_param($stmt, "i", $id_num);

if (mysqli_stmt_execute($stmt)) {
    echo json_encode([
        "status" => true,
        "message" => "Produk dengan id $id_num berhasil dihapus"
    ]);
} else {
    http_response_code(500);
    echo json_encode([
        "status" => false,
        "message" => "Gagal menghapus produk: " . mysqli_stmt_error($stmt)
    ]);
}

mysqli_stmt_close($stmt);
mysqli_close($conn);
?>