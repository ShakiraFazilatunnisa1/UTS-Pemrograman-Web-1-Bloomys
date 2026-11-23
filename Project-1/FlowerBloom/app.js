// ==========================================
// BLOOMY'S FLOWER SHOP
// APPLICATION JAVASCRIPT
// ==========================================


// ==========================================
// FUNGSI MENAMPILKAN PASSWORD
// ==========================================

function togglePassword(inputId, button) {

    const input = document.getElementById(inputId);

    if (input.type === "password") {
        input.type = "text";
        button.innerHTML = '<i class="bi bi-eye-slash"></i>';
    } else {
        input.type = "password";
        button.innerHTML = '<i class="bi bi-eye"></i>';
    }

}


// ==========================================
// MENGAMBIL DATA AKUN
// ==========================================

function getUsers() {

    return JSON.parse(
        localStorage.getItem("flowerBloomUsers") || "[]"
    );

}


// ==========================================
// REGISTRASI AKUN
// ==========================================

const registerForm = document.getElementById("registerForm");

if (registerForm) {

    registerForm.addEventListener("submit", function(e) {

        e.preventDefault();

        const name = document.getElementById("registerName").value.trim();

        const email = document.getElementById("registerEmail").value.trim().toLowerCase();

        const phone = document.getElementById("registerPhone").value.trim();

        const password = document.getElementById("registerPassword").value;

        const confirmPassword = document.getElementById("confirmPassword").value;

        const message = document.getElementById("registerMessage");

        let users = getUsers();


        // Validasi password
        if (password.length < 8) {

            message.textContent = "Password minimal 8 karakter!";
            message.style.color = "red";

            return;
        }


        // Validasi konfirmasi password
        if (password !== confirmPassword) {

            message.textContent = "Konfirmasi password tidak sesuai!";
            message.style.color = "red";

            return;
        }


        // Validasi email
        const emailExists = users.some(
            user => user.email === email
        );

        if (emailExists) {

            message.textContent = "Email sudah terdaftar!";
            message.style.color = "red";

            return;
        }


        // Simpan akun baru
        const newUser = {

            name: name,
            email: email,
            phone: phone,
            password: password

        };


        users.push(newUser);

        localStorage.setItem(
            "flowerBloomUsers",
            JSON.stringify(users)
        );


        message.style.color = "green";

        message.textContent = "Registrasi berhasil! Silakan login.";


        // Arahkan ke halaman login
        setTimeout(function() {

            window.location.href = "login.html";

        }, 1500);

    });

}



// ==========================================
// LOGIN AKUN
// ==========================================

const loginForm = document.getElementById("loginForm");

if (loginForm) {

    loginForm.addEventListener("submit", function(e) {

        e.preventDefault();

        const email = document.getElementById("loginEmail").value.trim().toLowerCase();

        const password = document.getElementById("loginPassword").value;

        const message = document.getElementById("loginMessage");


        // Mengambil akun yang sudah terdaftar
        const users = getUsers();


        // Mencari akun
        const user = users.find(function(item) {

            return item.email === email &&
                   item.password === password;

        });


        // Jika akun tidak ditemukan
        if (!user) {

            message.textContent = "Email atau password salah!";

            message.style.color = "red";

            return;

        }


        // Menyimpan sesi pengguna
        const currentUser = {

            name: user.name,
            email: user.email,
            phone: user.phone

        };


        localStorage.setItem(
            "flowerBloomCurrentUser",
            JSON.stringify(currentUser)
        );


        message.style.color = "green";

        message.textContent = "Login berhasil! Mengalihkan ke beranda...";


        // Masuk ke dashboard
        setTimeout(function() {

            window.location.href = "menu-utama.html";

        }, 1000);

    });

}



// ==========================================
// LUPA PASSWORD
// ==========================================

const forgotLink = document.querySelector(".forgot-link");
const forgotPasswordBox = document.getElementById("forgotPasswordBox");
const btnSaveNewPassword = document.getElementById("btnSaveNewPassword");
const btnCancelReset = document.getElementById("btnCancelReset");
const resetMessage = document.getElementById("resetMessage");

if (forgotLink && forgotPasswordBox) {

    forgotLink.addEventListener("click", function(e) {

        e.preventDefault();

        const isHidden = forgotPasswordBox.style.display === "none";
        forgotPasswordBox.style.display = isHidden ? "block" : "none";

        if (loginForm) {
            loginForm.style.display = isHidden ? "none" : "block";
        }

        if (resetMessage) {
            resetMessage.textContent = "";
        }

    });

}

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

if (btnSaveNewPassword) {

    btnSaveNewPassword.addEventListener("click", function() {

        const emailInput = document.getElementById("resetEmail");
        const passInput = document.getElementById("resetNewPassword");

        const email = emailInput ? emailInput.value.trim().toLowerCase() : "";
        const newPassword = passInput ? passInput.value : "";

        if (!email || !newPassword) {
            resetMessage.textContent = "Email dan password baru wajib diisi!";
            resetMessage.style.color = "red";
            return;
        }

        if (newPassword.length < 8) {
            resetMessage.textContent = "Password minimal 8 karakter!";
            resetMessage.style.color = "red";
            return;
        }

        const users = getUsers();
        const userIndex = users.findIndex(item => item.email === email);

        if (userIndex === -1) {
            resetMessage.textContent = "Email tidak terdaftar!";
            resetMessage.style.color = "red";
            return;
        }

        users[userIndex].password = newPassword;
        localStorage.setItem(
            "flowerBloomUsers",
            JSON.stringify(users)
        );

        resetMessage.textContent = "Password berhasil diperbarui! Silakan login kembali.";
        resetMessage.style.color = "green";

        emailInput.value = "";
        passInput.value = "";

        setTimeout(function() {
            forgotPasswordBox.style.display = "none";
            if (loginForm) {
                loginForm.style.display = "block";
            }
            resetMessage.textContent = "";
        }, 1200);

    });

}



// ==========================================
// LOGOUT
// ==========================================

function logoutUser() {

    localStorage.removeItem("flowerBloomCurrentUser");

    window.location.href = "index.html";

}


// ==========================================
// DETAIL PRODUK BLOOMY'S FLOWER SHOP
// ==========================================

const products = {

    1: {
        name: "Garbera Bouquet",
        price: "Rp150.000",
        image: "image/garbera.JPEG",
        description: "Buket bunga Garbera bernuansa pink yang cantik dan elegan. Cocok diberikan kepada orang tersayang untuk merayakan momen istimewa."
    },

    2: {
        name: "Sunflower Happiness",
        price: "Rp175.000",
        image: "image/sunflower.JPEG",
        description: "Buket bunga matahari dengan warna kuning cerah yang melambangkan kebahagiaan, kehangatan, dan energi positif. Cocok untuk memberikan semangat kepada orang tersayang."
    },

    3: {
        name: "Rose Dream",
        price: "Rp200.000",
        image: "image/pinkrose.JPEG",
        description: "Buket bunga mawar pink yang indah dan romantis. Memiliki tampilan elegan dan cocok dijadikan hadiah untuk orang spesial."
    },

    4: {
        name: "Lily Elegance",
        price: "Rp180.000",
        image: "image/lily.JPEG",
        description: "Buket bunga Lily dengan perpaduan warna pink dan putih yang anggun. Cocok untuk hadiah ulang tahun, perayaan, maupun momen istimewa."
    }

};


// ==========================================
// MENAMPILKAN DETAIL PRODUK
// ==========================================

const productImage = document.getElementById("productImage");

if (productImage) {

    const params = new URLSearchParams(window.location.search);

    const productId = params.get("id");

    const product = products[productId];

    if (product) {

        document.getElementById("productName").textContent =
            product.name;

        document.getElementById("productPrice").textContent =
            product.price;

        document.getElementById("productDescription").textContent =
            product.description;

        document.getElementById("productImage").src =
            product.image;

        document.getElementById("productImage").alt =
            product.name;

        document.getElementById("orderButton").href =
            "https://wa.me/6281224103373?text=" +
            encodeURIComponent(
                "Halo Bloomy's, saya ingin bertanya untuk " +
                product.name 
            );

    } else {

        document.getElementById("productName").textContent =
            "Produk tidak ditemukan";

        document.getElementById("productDescription").textContent =
            "Maaf, produk yang kamu cari tidak tersedia.";

        document.getElementById("productPrice").textContent =
            "-";

        document.getElementById("productImage").src =
            "image/garbera.JPEG";

    }

}