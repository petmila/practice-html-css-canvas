const canvas = document.getElementById("game");
const context = canvas.getContext('2d');
canvas.width = 600;
canvas.height = 300;

context.fillStyle = "#9a1782";
context.fillRect(20, 50, 60, 80);


// context.fillStyle = "#2ac7d8";
// context.beginPath();
// context.ellipse(100, 100, 50, 75, Math.PI / 4, 0, 2 * Math.PI);
// context.fill();

context.beginPath();
context.arc(100, 75, 50, 0, 2 * Math.PI);
context.stroke();

const img = new Image();
img.src = 'images/12.png';

img.onload = function() {
    context.drawImage(img, 600 - 150, 300 - 150, 150, 150);
};

