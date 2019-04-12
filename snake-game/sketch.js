let snake;
let rez = 10;
let fr = 10; //starting FPS 
let food;
let w;
let h;
let direction = 'right';
let isEndGame = false;

function setup() {
    // put setup code here
    createCanvas(400, 400);
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
    else if (key === ' ') {
        console.log('Restart game')
        if (isEndGame === true) {
            // rerender lại, restart trò chơi
            background(220);
            snake = new Snake();
            loop();
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

    fill(255, 0, 255);
    rect(food.x, food.y, 1, 1); //vẽ food
    if (snake.checkEndGame()) {
        isEndGame = true;
        console.log('END GAME');
        background(119, 136, 153);
        drawWords(width / 20, height / 20);
        noLoop();
    }


}