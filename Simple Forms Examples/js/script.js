// Этот метод помогает понять, получает ли браузер "информацию" от скрипта
// Для проверки можно расскомментировать строчку ниже и увидеть в консоли браузера слово "test"

// console.log("test");

//Технический раздел
// Если не до конца понятен способ работы с методом, можно найти описание его работы в документации
// https://developer.mozilla.org/ru/docs/Web/API/CanvasRenderingContext2D

const canvas = document.querySelector('canvas'); // Создаем переменную, связанную с тегом <canvas> в html-документе
const ctx = canvas.getContext('2d'); // Задаем двумерный контекст для canvas 

canvas.width = 800; // Задаем ширину canvas. Если вы не будете ее менять по ходу кода, задать ширину можно и в файле css
canvas.height = 400; // Задаем высоту canvas. Если вы не будете ее менять по ходу кода, задать ширину можно и в файле css

// Отрисовка статичных элементов. Вызовы функций. Это дает браузеру сигнал исполнять вызванные функции из пула объявленных (они ниже)

drawTable(); // Отрисовываем стол
drawLine(40, 45); // Отрисовываем рисунок на столе (верхняя линия)
drawLine(40, canvas.height-40); // Отрисовываем рисунок на столе (нижняя линия) 
// drawCircle(); // Отрисовываем тарелку
centerImage(); // Отрисовываем арбуз

// РАЗДЕЛ "Кнопки" 
// В этой части мы навешиваем на кнопки функции, которые хотим выполнить при нажатии на них

// Розовая кнопка

const buttonImg = document.querySelector('.changeButton');
buttonImg.addEventListener('click', function(){drawImage()}); // Здесь функция вынесена за пределы обработчика событий

// Если не очень понятно, как работает функция drawImage(), то можно закомментировать две строчки выше и раскомментировать две строчки ниже 
// Так, будет запущена по клику на розовую кнопку другая функция, которая удаляет картинку арбуза и помещает на ее место картинку яичницы  

// const buttonImg = document.querySelector('.changeButton');
// buttonImg.addEventListener('click', function(){centerAnotherImage()});


// Зеленая кнопка

const buttonClear = document.querySelector('.clearButton'); // Здесь функция прописана внутри обработчика событий 
buttonClear.addEventListener('click', ()=> {
  ctx.clearRect(0,0, canvas.width, canvas.height); // Это 
  drawTable(); 
  drawLine(40, 45);
  drawLine(40, canvas.height-40);
  // drawCircle();
  centerImage();
})


// РАЗДЕЛ "Функции"
// В этой части мы декларируем (объявляем функции)
// По сути это инструкция для браузера/сервера, что нужно делать, когда вызвана конкретная функция

// Функция для центрального блюда

function centerImage(){
  const img1 = new Image();
  img1.addEventListener('load', () => {
    ctx.drawImage(img1, canvas.width / 2 - 30, canvas.height / 2 - 30, 60, 60);
  });

img1.src='images/pudding.png'
}

// Функция для отрисовки стола

function drawTable(){
  ctx.beginPath();
  ctx.fillStyle = '#550764'; 
  ctx.roundRect(20, 20, canvas.width - 40, canvas.height-40, 14);
  ctx.fill();
}

// Функция для отрисовки рисунка на столе

// В нашем случае мы задали аргументы функции, чтобы можно было вызывать ее для разных координат
// Поскольку мы задали аргументы (x, y), при вызове фунции drawLine(), необходимо указать значение аргументов
// В нашем случае, это drawLine(40, 40) или  drawLine(40, canvas.height-40)
// Могут быть любые другие

function drawLine(x, y){
  const line_step = (canvas.width) / 20;
  ctx.beginPath();
  ctx.moveTo(x, y);
  for (let i = 0; i < 18; i++) {
    ctx.lineTo(x + line_step / 2, y - line_step / 3);
    ctx.lineTo(x + line_step, y);
    x = x + line_step;
  }
  ctx.lineCap = 'round';
  ctx.lineWidth = 6;
  ctx.strokeStyle = '#ffef00';
  ctx.stroke();
}

// Функция для отрисовки стола

function drawCircle(){
  ctx.beginPath();
  ctx.arc(canvas.width / 2, canvas.height / 2, 60, 0, 2*Math.PI); // координаты совпадают с координатами 
  ctx.fillStyle = '#F7EFE5';
  ctx.fill();
}

// Функция для замены центральног блюда

function centerAnotherImage(){
  ctx.clearRect(0,0, canvas.width, canvas.height);
  drawTable();
  drawLine(40, 40);
  drawLine(40, canvas.height-40);
  // drawCircle();
  const img2 = new Image();
  img2.addEventListener('load', () => {
    ctx.drawImage(img2, canvas.width / 2 - 30, canvas.height / 2 - 30, 60, 60);
  });

  img2.src='images/eggs.png'
}

// Функция отрисовки одного из двух изображений с использованием метода Math.random()

function drawImage(){
  
  // Задаем переменные для помещения изображений на точку со случайными координатами в рамках нашего canvas 
  // Math.random() выдает значение в формате 0.32323234, а его нужно привести к 32
  // Из-за вычитания могут образовываться отрицательные значение, поэтому берем их по модулю через метод Math.abs()
  // чтобы изображение не уходило за границы canvas
  // Число 100 появляется из отступа от края canvas (20), ширины изображения (60) и еще небольшого запаса (20)
  // чтобы изображения не были совсем вплотную к краю стола или не смещались в какую-нибудь сторону
  // Тут можно экспериментировать со значениями

  let ImgX = Math.abs(Math.floor(Math.random()*canvas.width-100)); 
  let ImgY = Math.abs(Math.floor(Math.random()*canvas.height-100)); 
  
  centerImage(); // Оставляем "нетронутым" центр

  const img = new Image(); // Создаем изображение
  img.addEventListener('load', () => {
    ctx.drawImage(img, ImgX, ImgY, 60, 60); 
  });

  let rIMG = getRandomInit(5); // создаем переменную, отвечающую за случайность
  function getRandomInit(max){
    return Math.floor(Math.random()*max);
  }
  
  // console.log(rIMG);
  // Строчка выше не нужна для исполнения кода, она нужна была на этапе отладки, чтобы понимать, какое именно число выводится: 1 или 0

  // Задаем условие для выбора ссылки на изображение

  if(rIMG == 0){
    const IsEgg = true;
    img.src = 'images/pancakes.png'; 
  }
  else if(rIMG == 1){
    const IsEgg = true;
    img.src = 'images/egg_fried_rice.png'; 
  }
  else if(rIMG == 2){
    const IsEgg = true;
    img.src = 'images/croissant.png'; 
  }
  else if(rIMG == 3){
    const IsEgg = true;
    img.src = 'images/cherry_coffee.png'; 
  }
  else {
    img.src = 'images/coffee.png';
  } 
}




