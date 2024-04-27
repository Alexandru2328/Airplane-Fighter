let spaceShip;
let shipPosition = 46;
let bulletCount = 0;
let bulletsList = [];
let enemyCount = 0;
let enemiesList = [];
const enemyPositions = [11, 21, 31, 41, 51, 61, 71];
let gameStatus = 0;
let score = 0;

function newGame() {
    window.location.reload();
}

function showMessage() {
    let messageElement = document.getElementById("message");
    messageElement.innerHTML = "GAME OVER !!<br>" + "SCORE " + score;
    let button = document.getElementById("startGame");
    button.textContent = "NEW GAME";
    button.setAttribute('onclick',
        `newGame()`);
}

function collision() {
    let messageElement = document.getElementById("message");
    for (let i = 0; i < bulletsList.length && gameStatus; i++) {
        for (let j = 0; j < enemiesList.length && gameStatus; j++) {
            if (bulletsList[i].position === enemiesList[j].position) {
                let field = document.getElementById(bulletsList[i].position);
                bulletsList.splice(i, 1);
                enemiesList.splice(j, 1);
                field.style.backgroundImage = "none"; 
                ++score;
                messageElement.innerHTML = "SCORE " + score;
                break;
            }
        }
    }
}

function enemyEffect(field, index) {
    let position = document.getElementById(field);
    if (field % 10 === 6) {
        enemiesList.splice(index, 1);
        position.style.backgroundImage = "none";
    } else {
        position.style.backgroundImage = "none";
        ++field;
        position = document.getElementById(field);
        position.style.backgroundImage = 'url("img/enemy.png")';
    }
    if (field == shipPosition) {
        gameStatus = 0;
        showMessage();
    }
}

function spawnEnemy() {
    if (gameStatus) {
        let position = enemyPositions[Math.floor(Math.random() * enemyPositions.length)];
        ++enemyCount;
        let enemy = document.getElementById(position);
        enemy.style.backgroundImage = 'url("img/enemy.png")';
        enemiesList.push({ key: enemyCount, position: position });
    }
} 

function bulletEffect(bulletPosition, index) {
    let position = document.getElementById(bulletPosition);
    if (bulletPosition % 10 === 1) {
        bulletsList.splice(index, 1);
        position.style.backgroundImage = "none";
    } else {
        position.style.backgroundImage = "none";
        --bulletPosition;
        position = document.getElementById(bulletPosition);
        position.style.backgroundImage = 'url("img/bullet.png")';
    }
}

function spawnShot(e) {
    if (e.code === "Space" && gameStatus) {
        ++bulletCount;
        let bulletPosition = shipPosition - 1;
        let shootElement = document.getElementById(bulletPosition);
        shootElement.style.backgroundImage = 'url("img/bullet.png")';  
        bulletsList.push({ key: bulletCount, position: bulletPosition });
    }
}

function shipControl(e) {
    if (e.code === "ArrowLeft" && shipPosition > 16 && gameStatus) {
        spaceShip.style.backgroundImage = "none";
        shipPosition -= 10;
        spaceShip = document.getElementById(shipPosition);
        spaceShip.style.backgroundImage = `url("img/Spaceship.jpg")`;
    } else if (e.code === "ArrowRight" && shipPosition < 76 && gameStatus) {
        spaceShip.style.backgroundImage = "none";
        shipPosition += 10;
        spaceShip = document.getElementById(shipPosition);
        spaceShip.style.backgroundImage = `url("img/Spaceship.jpg")`;
    }
}

function enemiesStatus() {
    if (gameStatus) {
        enemiesList.forEach((object, index) => {
            enemyEffect(object.position, index);
            ++object.position;
            collision();
        });
    }
}

function bulletsStatus() {
    if (gameStatus) {
        bulletsList.forEach((object, index) => {
            bulletEffect(object.position, index);
            --object.position;
            collision();
        });
    }
}

function resumeGame() {
    gameStatus = 1;
    let button = document.getElementById("startGame");
    button.textContent = "PAUSE";
    button.setAttribute('onclick',
        `pauseGame()`);
}

function pauseGame() {
    gameStatus = 0;
    let button = document.getElementById("startGame");
    button.textContent = "RESUME";
    button.setAttribute('onclick',
        `resumeGame()`);
}

function startGame() {
    let gridContainer = document.getElementById("container");
    gameStatus = 1;
    let startButton = document.getElementById("startGame");
    startButton.textContent = "PAUSE";
    startButton.setAttribute('onclick',
        `pauseGame()`);
    gridContainer.style.display = "grid";
    let messageElement = document.getElementById("message");
    messageElement.innerHTML = "SCORE 0"
    for (let i = 1; i <= 6; ++i) {
        for (let j = 1; j <= 7; j++) {
            let newField = document.createElement("div");
            newField.className = "gridItem";
            newField.id = j * 10 + i;
            gridContainer.appendChild(newField);
        }
    }
    spaceShip = document.getElementById(shipPosition);
    spaceShip.style.backgroundImage = `url("img/Spaceship.jpg")`;
}

setInterval(enemiesStatus, 350);
setInterval(bulletsStatus, 100);
setInterval(spawnEnemy, 1400);
setInterval(collision, 6);
document.addEventListener("keydown", shipControl);
document.addEventListener("keyup", spawnShot);
