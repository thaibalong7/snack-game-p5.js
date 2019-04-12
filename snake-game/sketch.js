let snake;
let rez = 10;
let fr = 10; //starting FPS 
let food;
let w;
let h;
let direction = 'right';
function setup() {
    // put setup code here
    createCanvas(400, 400);
    frameRate(fr); // Attempt to refresh at starting FPS
    w = floor(width / rez);
    h = floor(height / rez);
    snake = new Snake();
    getFoodLocation();
}

function getFoodLocation() {
    let x = floor(random(w));
    let y = floor(random(h));
    food = createVector(x, y);

}

function keyPressed() {
    if (key === 'ArrowLeft') {
        if (direction !== 'right') {
            snake.setDir(-1, 0);
            direction = 'left'
        }

    }
    else if (key === 'ArrowRight') {
        if (direction !== 'left') {
            snake.setDir(1, 0)
            direction = 'right'
        }
    }
    else if (key === 'ArrowUp') {
        if (direction !== 'down') {
            snake.setDir(0, -1)
            direction = 'up'
        }
    }
    else if (key === 'ArrowDown') {
        if (direction !== 'up') {
            snake.setDir(0, 1)
            direction = 'down'
        }
    }
}
function drawWords(x) {
    // The text() function needs three parameters:
    // the text to draw, the horizontal position,
    // and the vertical position
    fill(0);
    text('GAME OVER', x, 80);
  }

function draw() {
    // put drawing code here
    scale(rez); //phóng to các lệnh rect lên rez lần
    background(220);
    if (snake.eat(food)) //kiểm tra rắn có ăn trúng mồi k
    {
        getFoodLocation(); //random lại food
    }
    snake.update(); //update lại vị trí các cục của con rắn
    snake.show(); //show những update lên

    if (snake.checkEndGame()) {
        console.log('END GAME');
        background(0, 0, 255);
        textAlign(CENTER);
        drawWords(width * 0.5);
        noLoop();
    }

    fill(255, 1, 1);
    rect(food.x, food.y, 1, 1); //vẽ food

}