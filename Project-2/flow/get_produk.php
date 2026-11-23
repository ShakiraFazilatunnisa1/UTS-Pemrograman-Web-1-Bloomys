<?php

header("Content-Type: application/json");

include "../koneksi/connection.php";

$query = mysqli_query($conn, "SELECT * FROM produk");

$data = [];

while ($row = mysqli_fetch_assoc($query)) {
    $data[] = $row;
}

echo json_encode([
    "status" => true,
    "message" => "Data produk berhasil ditampilkan",
    "data" => $data
]);

?>