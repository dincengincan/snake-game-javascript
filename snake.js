class Snake {
    constructor() {
        this.x = 200;
        this.y = 200;
        this.xSpeed = 10;
        this.ySpeed = 0;
        this.tail =[];
        this.tailSize = 4;
        this.appleY = 5;
        this.appleX = 5;
        this.changingDirection = false;
    }

    draw() {
       
        // Drawing All the Rectangles
       
        /*ctx.fillStyle = "cyan";
        for ( let i = 0; i< this.tail.length; i++) {
            ctx.fillRect(this.tail[i].x, this.tail[i].y, scale, scale);
        };*/
        
        
        const tail = this.tail.length;
        this.tail.forEach(function(t,index) {
            ctx.fillStyle =  index === tail - 1 ? "cyan": "darkcyan" ;
            ctx.fillRect(t.x, t.y , scale - 1, scale - 1);
        })
        
        
        
        ctx.fillStyle = "white";
        ctx.font = "20px Verdana";
        ctx.fillText(this.tailSize - 4, 15, 30,)

        ctx.fillStyle = "grey";
        ctx.font = "10px Verdana";
        ctx.fillText("made by E.CAN", 310, 390,)


        ctx.fillStyle = "white"
        ctx.fillRect(this.appleX, this.appleY, scale - 1, scale - 1)

        
    }

    update() {
        this.x += this.xSpeed;
        this.y += this.ySpeed;

        if(this.x < 0) {
            this.x = canvas.width - scale;
        }

        if(this.x > canvas.width - scale) {
            this.x = 0;
        }

        if(this.y < 0 ) {
            this.y = canvas.height - scale;
        }

        if(this.y > canvas.height - scale) {
            this.y = 0;
        }

        // GenerateRandomApple
        if(this.appleX === this.x && this.appleY === this.y) {
            this.tailSize++;
            this.placeRandomApple()
        }


        this.tail.push({ x: this.x, y: this.y })

        while (this.tail.length > this.tailSize) {
            this.tail.shift();
        }

       let head = this.tail[this.tail.length - 1];
        for(let i = 0; i < this.tail.length - 1; i++) {
            if (head.x === this.tail[i].x && head.y === this.tail[i].y) {
                location.reload();
                alert("LOST")
            }    
        }           
    }

    loop() {
        ctx.clearRect(0, 0, canvas.width, canvas.height)
        snake.update();
        snake.draw();
        this.changingDirection = false;
    }

    onKeyPress(e) {
        
        //to prevent snake from reversing, disable onKeyPress event until updates function is called again after setInterval time.
        //During setInterval time, direction must be changed only once. 
        
        if (this.changingDirection) return;
        this.changingDirection = true;
        
        
        if(e.code === "ArrowLeft" && this.xSpeed != scale) {
            this.xSpeed = -scale;
            this.ySpeed = 0; 
        }

        if(e.code === "ArrowRight" && this.xSpeed != -scale) {
            this.xSpeed = scale;
            this.ySpeed = 0; 
        }

        if(e.code === "ArrowUp" && this.ySpeed != scale) {
            this.xSpeed = 0;
            this.ySpeed = -scale; 
        }

        if(e.code === "ArrowDown" && this.ySpeed != -scale) {
            this.xSpeed = 0;
            this.ySpeed = scale; 
        }
    }
    
    placeRandomApple() {
        this.appleX = (Math.floor(Math.random() * rows ))* scale;
        this.appleY = (Math.floor(Math.random() * columns ))* scale;
        const  foodIsOnSnake = this.tail.some(part => {
            return part.x === this.appleX && part.y === this.appleY;
           })
        console.log(foodIsOnSnake);
        //if the new food and the snake have the same location, generate a new food location
        if(foodIsOnSnake){
            this.placeRandomApple();
        }   
    }
 } 


 