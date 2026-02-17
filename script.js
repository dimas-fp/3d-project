const imageElement = document.getElementById('product-image');
const viewer = document.getElementById('viewer-360');
//konfigurasi gambar (sesuaikan dengan jumlah gambar yang anda miliki)
const totalFrames = 36
const baseUrl = "assets/img/blal.jpg"; // contoh url demo

let currentFrame = 1;
let isDragging = false;
let startX = 0

//fungsi untuk memperbaharui gambar berdasarkan frame
function updateImage(frame) {
    //format angka agar selalu dua digit (01, 02, dst)
    const frameNumber = frame.toString() .padStart(2, '0');
    imageElement.src = '${baseUrl}${frameNumber}.jpg';
};

//logika draggeres
viewer.addEventListener('mousedown', (e) => {
    isDragging = true;
    startX = e.pageX;
});

window.addEventListener('mouseup', () => {
    isDragging = false;
});

window.addEventListener('mousemove', (e) => {
    if (!isDragging) return;
    const diffX = e.pageX - startX;

    //sensitivitas: semakin besar angkanya, semakin lambat putaranya
    if (Math.abs(diffX) > 10) {
        if (diffX > 0) {
            currentFrame = currentFrame >= totalFrames ? 1 : currentFrame + 1;    
        }else {
            currentFrame = currentFrame <= 1 ? totalFrames : currentFrame - 1;
        }
        updateImage(currentFrame);
        startX = e.pageX; // Reset posisi awal utnuk rotasi berkelanjutan
    }
});

//support untuk perangkat sentuh (hp/tablet)
viewer.addEventListener('touchstart', (e) => {
    isDragging = true;
    startX = e.touches[0] .pageX;
});

window.addEventListener('touchend', () => {
    isDragging = false;
});

window.addEventListener('touchmove', (e) => {
    if (!isDragging) return;
    const diffX = e.touches[0] .pageX - startX;
    if (Math.abs(diffX) > 10) {
        if (diffX > 0) {
            currentFrame = currentFrame >= totalFrames ? 1 : currentFrame + 1; 
        } else {
            currentFrame = currentFrame <= 1 ? totalFrames : currentFrame - 1;
        }
        updateImage(currentFrame);
        startX = e.touches[0].pageX
    }
});