const car = document.querySelector(".car");
const enemies = document.querySelectorAll(".enemy");
const scoreDisplay = document.querySelector(".score");

let score = 0;
let carLeft = 175;

const keys = {
    ArrowLeft: false,
    ArrowRight: false
};

document.addEventListener("keydown", (e) => {
    if (e.key in keys) keys[e.key] = true;
});

document.addEventListener("keyup", (e) => {
    if (e.key in keys) keys[e.key] = false;
});

function moveCar() {

    if (keys.ArrowLeft && carLeft > 0) {
        carLeft -= 5;
    }

    if (keys.ArrowRight && carLeft < 350) {
        carLeft += 5;
    }

    car.style.left = carLeft + "px";
}

function moveEnemies() {

    enemies.forEach(enemy => {

        let top = parseInt(enemy.style.top || -120);

        top += 5;

        if (top > window.innerHeight) {
            top = -120;
            enemy.style.left =
                Math.floor(Math.random() * 350) + "px";
            score++;
        }

        enemy.style.top = top + "px";

        // Collision Detection
        if (
            top + 100 > window.innerHeight - 120 &&
            parseInt(enemy.style.left) < carLeft + 50 &&
            parseInt(enemy.style.left) + 50 > carLeft
        ) {
            alert("Game Over! Score: " + score);
            location.reload();
        }
    });
}

function gameLoop() {
    moveCar();
    moveEnemies();
    scoreDisplay.innerText = "Score: " + score;
    requestAnimationFrame(gameLoop);
}

gameLoop();