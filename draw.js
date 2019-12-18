const canvas = document.getElementById("game");
const ctx = canvas.getContext("2d");
const scale = 10;
const rows = canvas.height / scale;
const columns = canvas.width / scale;

let snake;
let apple;

function setup() {
    snake = new Snake();
    snake.placeRandomApple();
    snake.draw();
    
};

setup();

//LOOP
window.setInterval(function() {
    return snake.loop();        
}, 50)


window.addEventListener("keydown", snake.onKeyPress.bind(snake));

