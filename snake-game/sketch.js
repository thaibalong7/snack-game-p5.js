let snake;
let rez = 10;
let fr = 10; //starting FPS 
let food;
let w;
let h;
let direction = 'right';
let isEndGame = false;
let maxScore = 1;

function setup() {
    // put setup code here
    createCanvas(500, 450); // 500, 400 cho phần rắn chơi
    frameRate(fr); // Attempt to refresh at starting FPS
    w = floor(width / rez);
    h = floor(height / rez);
    snake = new Snake();
    getFoodLocation();
    // Set text characteristics
    textFont("Georgia");
    textAlign(CENTER, CENTER);
}

function getFoodLocation() {
    let x = floor(random(w));
    let y = floor(random(h - 5));
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
    else if (key === ' ') {
        if (isEndGame === true) { //game đã kết thúc thì mới restart được
            console.log('Restart game')
            // rerender lại, restart trò chơi
            background(220);
            direction = 'right'; //đặt lại direction
            snake = new Snake();
            loop();
            isEndGame = false;
        }
    }
}
function drawWords(x, y) {
    // The text() function needs three parameters:
    // the text to draw, the horizontal position,
    // and the vertical position
    textSize(4);
    fill(204, 0, 0);
    text('GAME OVER', x, y);
    fill(255, 80, 80);
    textSize(2);
    text('Press space to restart', x, y + 5);
}

function drawCore() {
    fill(0)
    rect(0, 40, 55, 5) //(0, 40)(550, 50) cho thanh điểm
    fill(255, 255, 255);
    textSize(2);
    text('Score: ', 10, 42.5);
    textSize(2);
    text(snake.getScore(), 14, 42.5);
    text('Max score: ', 33, 42.5);
    text(maxScore, 39, 42.5);
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
    drawCore();
    fill(255, 0, 255);
    rect(food.x, food.y, 1, 1); //vẽ food
    if (snake.checkEndGame()) {
        if (snake.getScore() > maxScore) //check max điểm
            maxScore = snake.getScore();
        isEndGame = true;
        console.log('END GAME');
        background(119, 136, 153);
        drawWords(width / 20, height / 20);
        noLoop();
    }
}