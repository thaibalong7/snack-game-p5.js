class Snake {
    constructor() {
        this.body = []; //list các cục của con rắn (cục cuối là đầu con rắn)
        this.body[0] = createVector(0, 0); //khởi tạo con rắn có 1 cục
        this.xdir = 1;
        this.ydir = 0;
        this.len = 0; //số điểm (độ dài con rắn)
    }
    update() {
        let head = this.body[this.body.length - 1].copy(); //copy thằng đầu để thay đổi vị trí
        this.body.shift(); //xóa cục ở đuôi
        head.x += this.xdir;
        head.y += this.ydir;
        this.body.push(head); //thêm cục ở đầu
    }
    grow() {
        let head = this.body[this.body.length - 1].copy();
        this.len++;
        this.body.push(head);
    }
    checkEndGame() {
        let x = this.body[this.body.length - 1].x;
        let y = this.body[this.body.length - 1].y;
        if (x > w - 1 || x < 0 || y > h - 1 || y < 0) {
            // nằm ngoài phạm vi chơi
            return true;
        }
        for (let i = 0; i < this.body.length - 1; i++) {
            // check thằng head có bị đụng vào thân hay k
            let body_check = this.body[i];
            if (body_check.x == x && body_check.y == y)
                return true;
        }
        return false;
    }
    eat(pos) {
        let x = this.body[this.body.length - 1].x;
        let y = this.body[this.body.length - 1].y;
        if (pos.x == x && pos.y == y) {
            this.grow();
            return true;
        }
        return false;
    }
    show() {
        for (let i = 0; i < this.body.length; i++) {
            fill(255, 0, 255)
            noStroke();
            rect(this.body[i].x, this.body[i].y, 1, 1)
        }
    }
    setDir(x, y) {
        this.xdir = x;
        this.ydir = y;
    }
}