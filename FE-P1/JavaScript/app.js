// FUNGSI MENAMPILKAN PASSWORD
function togglePassword(inputId, button) {
    const input = document.getElementById(inputId);

    if (!input || !button) return;

    if (input.type === "password") {
        input.type = "text";
        button.innerHTML = '<i class="bi bi-eye-slash"></i>';
    } else {
        input.type = "password";
        button.innerHTML = '<i class="bi bi-eye"></i>';
    }
}

//MENGAMBIL DATA AKUN
function getUsers() {
    try {
        const users = JSON.parse(
            localStorage.getItem("flowerBloomUsers") || "[]"
        );

        return Array.isArray(users) ? users : [];

    } catch (error) {
        console.error("Gagal mengambil data akun:", error);
        return [];
    }
}

// MENAMPILKAN PESAN
function showMessage(element, message, color = "red") {
    if (!element) return;

    element.textContent = message;
    element.style.color = color;
}

// REGISTRASI AKUN
const registerForm = document.getElementById("registerForm");

if (registerForm) {

    registerForm.addEventListener("submit", function(e) {
        e.preventDefault();

        const name = document.getElementById("registerName").value.trim();

        const email = document.getElementById("registerEmail")
            .value.trim().toLowerCase();

        const phone = document.getElementById("registerPhone")
            .value.trim();

        const password = document.getElementById("registerPassword").value;

        const confirmPassword =
            document.getElementById("confirmPassword").value;

        const message = document.getElementById("registerMessage");

        const users = getUsers();

        if (!name || !email || !phone || !password || !confirmPassword) {
            showMessage(message, "Semua kolom wajib diisi!");
            return;
        }

        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        if (!emailPattern.test(email)) {
            showMessage(message, "Format email tidak valid!");
            return;
        }

        if (password.length < 8) {
            showMessage(message, "Password minimal 8 karakter!");
            return;
        }

        if (password !== confirmPassword) {
            showMessage(message, "Konfirmasi password tidak sesuai!");
            return;
        }

        const emailExists = users.some(user => user.email === email);

        if (emailExists) {
            showMessage(message, "Email sudah terdaftar!");
            return;
        }

        const newUser = {
            name,
            email,
            phone,
            password
        };

        users.push(newUser);

        try {
            localStorage.setItem(
                "flowerBloomUsers",
                JSON.stringify(users)
            );

            showMessage(
                message,
                "Registrasi berhasil! Silakan login.",
                "green"
            );

            registerForm.reset();

            setTimeout(function() {
                window.location.href = "login.html";
            }, 1500);

        } catch (error) {
            showMessage(
                message,
                "Registrasi gagal. Penyimpanan browser bermasalah!"
            );
        }
    });
}

// LOGIN AKUN
const loginForm = document.getElementById("loginForm");

if (loginForm) {

    loginForm.addEventListener("submit", function(e) {
        e.preventDefault();

        const email = document.getElementById("loginEmail")
            .value.trim().toLowerCase();

        const password = document.getElementById("loginPassword").value;

        const message = document.getElementById("loginMessage");

        const users = getUsers();

        const user = users.find(function(item) {
            return item.email === email &&
                   item.password === password;
        });

        if (!user) {
            showMessage(message, "Email atau password salah!");
            return;
        }

        const currentUser = {
            name: user.name,
            email: user.email,
            phone: user.phone
        };

        try {
            localStorage.setItem(
                "flowerBloomCurrentUser",
                JSON.stringify(currentUser)
            );

            showMessage(
                message,
                "Login berhasil! Selamat datang...",
                "green"
            );

            setTimeout(function() {
                window.location.href = "menu-utama.html";
            }, 1000);

        } catch (error) {
            showMessage(message, "Login gagal. Silakan coba kembali!");
        }
    });
}

// LUPA PASSWORD
const forgotLink = document.querySelector(".forgot-link");

const forgotPasswordBox =
    document.getElementById("forgotPasswordBox");

const btnSaveNewPassword =
    document.getElementById("btnSaveNewPassword");

const btnCancelReset =
    document.getElementById("btnCancelReset");

const resetMessage =
    document.getElementById("resetMessage");


// MENAMPILKAN FORM LUPA PASSWORD
if (forgotLink && forgotPasswordBox) {

    forgotLink.addEventListener("click", function(e) {
        e.preventDefault();

        const isHidden =
            getComputedStyle(forgotPasswordBox).display === "none";

        forgotPasswordBox.style.display =
            isHidden ? "block" : "none";

        if (loginForm) {
            loginForm.style.display =
                isHidden ? "none" : "block";
        }

        if (resetMessage) {
            resetMessage.textContent = "";
        }
    });
}


// MEMBATALKAN RESET PASSWORD
if (btnCancelReset && forgotPasswordBox) {

    btnCancelReset.addEventListener("click", function() {

        forgotPasswordBox.style.display = "none";

        if (loginForm) {
            loginForm.style.display = "block";
        }

        if (resetMessage) {
            resetMessage.textContent = "";
        }
    });
}


// MENYIMPAN PASSWORD BARU
if (btnSaveNewPassword) {

    btnSaveNewPassword.addEventListener("click", function() {

        const emailInput = document.getElementById("resetEmail");

        const passInput =
            document.getElementById("resetNewPassword");

        const email = emailInput
            ? emailInput.value.trim().toLowerCase()
            : "";

        const newPassword = passInput
            ? passInput.value
            : "";

        if (!email || !newPassword) {
            showMessage(
                resetMessage,
                "Email dan password baru wajib diisi!"
            );
            return;
        }

        if (newPassword.length < 8) {
            showMessage(
                resetMessage,
                "Password minimal 8 karakter!"
            );
            return;
        }

        const users = getUsers();

        const userIndex = users.findIndex(function(item) {
            return item.email === email;
        });

        if (userIndex === -1) {
            showMessage(resetMessage, "Email tidak terdaftar!");
            return;
        }

        users[userIndex].password = newPassword;

        try {
            localStorage.setItem(
                "flowerBloomUsers",
                JSON.stringify(users)
            );

            showMessage(
                resetMessage,
                "Password berhasil diperbarui! Silakan login kembali.",
                "green"
            );

            emailInput.value = "";
            passInput.value = "";

            setTimeout(function() {

                if (forgotPasswordBox) {
                    forgotPasswordBox.style.display = "none";
                }

                if (loginForm) {
                    loginForm.style.display = "block";
                }

                if (resetMessage) {
                    resetMessage.textContent = "";
                }

            }, 1200);

        } catch (error) {
            showMessage(
                resetMessage,
                "Gagal memperbarui password!"
            );
        }
    });
}

// LOGOUT
function logoutUser() {

    localStorage.removeItem("flowerBloomCurrentUser");

    window.location.href = "index.html";
}


// MENAMPILKAN DETAIL PRODUK
const productImage = document.getElementById("productImage");

if (productImage) {

    const params = new URLSearchParams(window.location.search);
    const productId = params.get("id");

    const product = products[productId];

    const productName = document.getElementById("productName");
    const productPrice = document.getElementById("productPrice");
    const productDescription = document.getElementById("productDescription");
    const orderButton = document.getElementById("orderButton");

    if (product) {

        productName.textContent = product.name;
        productPrice.textContent = product.price;
        productDescription.textContent = product.description;

        productImage.src = product.image;
        productImage.alt = product.name;

        // TANYA KAMI MELALUI WHATSAPP
        if (orderButton) {

            const nomorWhatsApp = "6281224103373";

            const pesan = `Halo Bloomy's! 👋

            Saya ingin bertanya mengenai produk:

            Nama Produk: ${product.name}
            Harga: ${product.price}

            Apakah produk ini masih tersedia?

            Boleh saya mendapatkan informasi lebih lanjut?

            Terima kasih!`;

            const linkWhatsApp = "https://wa.me/" + nomorWhatsApp + "?text=" + encodeURIComponent(pesan);
            orderButton.href = linkWhatsApp;
        }

    } else {

        productName.textContent = "Produk tidak ditemukan";
        productPrice.textContent = "-";

        productDescription.textContent =
            "Maaf, produk yang kamu cari tidak tersedia.";

        productImage.src = "image/garbera.JPEG";

        if (orderButton) {
            orderButton.style.display = "none";
        }
    }
}

// NAMA PENGGUNA DI MENU UTAMA
const userNameElement = document.getElementById("userName");

if (userNameElement) {

    try {

        const currentUser = JSON.parse(
            localStorage.getItem("flowerBloomCurrentUser") || "null"
        );

        if (currentUser && currentUser.name) {

            userNameElement.textContent = currentUser.name;

        }

    } catch (error) {

        console.error("Gagal mengambil data pengguna:", error);

    }
}
