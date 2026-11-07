const canvas = document.getElementById("game");
const context = canvas.getContext('2d');
canvas.width = 600;
canvas.height = 300;

context.fillStyle = "#9a1782";
context.fillRect(100, 50, 60, 80);

context.strokeStyle = "#efe4ed";
context.beginPath();
context.arc(200, 75, 50, 0, 2 * Math.PI);
context.stroke();

let imagePath = 'images/1.png';
let imageX = 600 - 150;
let imageY = 300 - 150;

let img = new Image();
img.src = imagePath;

img.onload = function() {
    context.drawImage(img, imageX, imageY, 150, 150);
};

const buttonChangeImg = document.querySelector('.changeButton');
buttonChangeImg.addEventListener('click', function(){
    let rIMG = getRandomInit(5);
    imagePath = `images/${rIMG}.png`
    img.src = imagePath;
    context.drawImage(img, imageX, imageY, 150, 150);

});

const buttonMoveImg = document.querySelector('.moveButton');
buttonMoveImg.addEventListener('click', function(){
    let ImgX = Math.abs(Math.floor(Math.random()*canvas.width-150)); 
    let ImgY = Math.abs(Math.floor(Math.random()*canvas.height-150));
    
    context.clearRect(0, 0, canvas.width, canvas.height);
    context.fillRect(100, 50, 60, 80);
    context.beginPath();
    context.arc(200, 75, 50, 0, 2 * Math.PI);
    context.stroke();

    context.drawImage(img, ImgX, ImgY, 150, 150);
    imageX = ImgX;
    imageY = ImgY;
});

function getRandomInit(max){
    return Math.floor(Math.random()*max) + 1;
}