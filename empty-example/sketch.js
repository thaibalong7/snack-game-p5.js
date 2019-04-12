let snake;
let rez = 10;
let fr = 10; //starting FPS 
let food;
let w;
let h;

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
        snake.setDir(-1, 0)
    }
    else if (key === 'ArrowRight') {
        snake.setDir(1, 0)
    }
    else if (key === 'ArrowUp') {
        snake.setDir(0, -1)

    }
    else if (key === 'ArrowDown') {
        snake.setDir(0, 1)
    }
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
        noLoop();
    }

    fill(255, 1, 1);
    rect(food.x, food.y, 1, 1); //vẽ food

}