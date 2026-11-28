//DATA PRODUK BLOOMY'S
const daftarProduk = {
    "1": {
        name: "Garbera Bouquet",
        price: 150000,
        image: "image/garbera.JPEG",
        description: "Buket bunga gerbera melambangkan keceriaan, energi positif, kebahagiaan yang tulus, serta cinta yang setia."
    },

    "2": {
        name: "Sunflower Happiness",
        price: 175000,
        image: "image/sunflower.JPEG",
        description: "Buket bunga matahari melambangkan kesetiaan, optimisme, kehangatan, harapan, dan keteguhan hati."
    },

    "3": {
        name: "Rose Dream",
        price: 200000,
        image: "image/pinkrose.JPEG",
        description: "Buket bunga mawar melambangkan cinta, keindahan, apresiasi, dan perasaan yang sulit diungkapkan dengan kata-kata."
    },

    "4": {
        name: "Lily Elegance",
        price: 180000,
        image: "image/lily.JPEG",
        description: "Buket bunga lily melambangkan kemurnian, ketulusan, keanggunan, dan keseimbangan."
    }
};


// Export data untuk Backend
if (typeof module !== "undefined") {
    module.exports = daftarProduk;
}