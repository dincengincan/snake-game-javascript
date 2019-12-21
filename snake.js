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
        this.death = false;
    }

    draw() {
       
        // Drawing All the Rectangles
       
        /*ctx.fillStyle = "cyan";
        for ( let i = 0; i< this.tail.length; i++) {
            ctx.fillRect(this.tail[i].x, this.tail[i].y, scale, scale);
        };*/
        
        
        const tail = this.tail.length;
        this.tail.forEach(function(t,index) {
            ctx.fillStyle =  index === tail - 1 ? "#F64668": "#984063" ;
            ctx.fillRect(t.x, t.y , scale - 1, scale - 1);
        })
        
        
        
        const resetButton = document.getElementById("resetButton");
        //resetButton.style.visibility = this.death ? "visible" : "hidden"
        resetButton.style.visibility = "hidden";

        const score = document.getElementById("score");
        score.innerHTML =  this.tailSize - 4
        //score.style.visibility = this.death ? "hidden" : "visible"

        ctx.fillStyle = "white"
        ctx.fillRect(this.appleX, this.appleY, scale - 1, scale - 1)

        /*
        ctx.fillStyle = "white";
        ctx.font = "20px Verdana";
        ctx.fillText(this.tailSize - 4, 15, 30,)
        */


        //score display and change the appearance of the sneak when game is over
        if(this.death){
            const tail = this.tail.length
            this.tail.forEach(function(t,index) {
                ctx.fillStyle =  index === tail - 1 ? "gray": "black" ;
                ctx.fillRect(t.x, t.y , scale - 1, scale - 1);
            })
            ctx.fillStyle = "#FE9677";
            ctx.font = "40px Century Gothic";
            ctx.fillText(`GAMEOVER !`, 80,180)
            ctx.fillStyle = "#FE9677";
            ctx.font = "20px Century Gothic";
            ctx.fillText(`Score: ${this.tailSize - 4} `, 150,240);
            score.remove();
            resetButton.style.visibility = "visible"
            
            

       }
       

        
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
                this.death = true;
                clearInterval(loop);
                
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
        
        
        if((e.code === "ArrowLeft" || e.code === "KeyA") && this.xSpeed != scale) {
            this.xSpeed = -scale;
            this.ySpeed = 0; 
        }

        if((e.code === "ArrowRight" || e.code === "KeyD") && this.xSpeed != -scale) {
            this.xSpeed = scale;
            this.ySpeed = 0; 
        }

        if((e.code === "ArrowUp" || e.code === "KeyW") &&  this.ySpeed != scale) {
            this.xSpeed = 0;
            this.ySpeed = -scale; 
        }

        if((e.code === "ArrowDown" || e.code === "KeyS") && this.ySpeed != -scale) {
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


 