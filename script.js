let spaceShip;
let positionShip = 46;
let bulletsNr = 0;
let bulletsList = [];
let enemyNr = 0;
let enemysList = [];
const enemyPosition = [11, 21, 31, 41, 51, 61, 71];
let gameStatus = 0;
let score = 0;

function newGame() {
    window.location.reload();
}

function message() {
    let message = document.getElementById("message");
    message.innerHTML = "GAME OVER !!<br>" + "SCORE " + score;
    let button = document.getElementById("startGame");
    button.textContent = "NEW GAME";
    button.setAttribute('onclick',
        `newGame()`);
}

function collision() {
    let message = document.getElementById("message");
    for (let i = 0; i < bulletsList.length && gameStatus; i++) {
        for (let j = 0; j < enemysList.length && gameStatus; j++) {
            if (bulletsList[i].position === enemysList[j].position) {
                let field = document.getElementById(bulletsList[i].position);
                bulletsList.splice(i, 1);
                enemysList.splice(j, 1);
                field.style.backgroundImage = "none"; 
                ++score;
                message.innerHTML = "SCORE " + score;
                break;
            }
        }
    }
}

function enemyEffect(field, index) {
    let position = document.getElementById(field);
    if (field % 10 === 6) {
        enemysList.splice(index, 1);
        position.style.backgroundImage = "none";
    } else {
        position.style.backgroundImage = "none";
        ++field;
        position = document.getElementById(field);
        position.style.backgroundImage = 'url("img/enemy.png")';
    }
    if (field == positionShip) {
        gameStatus = 0;
        message();
    }
}

function spawnEnemy() {
    if (gameStatus) {
        let position = enemyPosition[Math.floor(Math.random() * enemyPosition.length)];
        ++enemyNr;
        let enemy = document.getElementById(position);
        enemy.style.backgroundImage = 'url("img/enemy.png")';
        enemysList.push({ key: enemyNr, position: position });
    }
} 

function bulletEffect(positionBullet, index) {
    let position = document.getElementById(positionBullet);
    if (positionBullet % 10 === 1) {
        bulletsList.splice(index, 1);
        position.style.backgroundImage = "none";
    } else {
        position.style.backgroundImage = "none";
        --positionBullet;
        position = document.getElementById(positionBullet);
        position.style.backgroundImage = 'url("img/bullet.png")';
    }
}

function spawnShot(e) {
    if (e.code === "Space" && gameStatus) {
        ++bulletsNr;
        let positionBullet = positionShip - 1;
        let shootElement = document.getElementById(positionBullet);
        shootElement.style.backgroundImage = 'url("img/bullet.png")';  
        bulletsList.push({ key: bulletsNr, position: positionBullet });
    }
}

function shipControl(e) {
    if (e.code === "ArrowLeft" && positionShip > 16 && gameStatus) {
        spaceShip.style.backgroundImage = "none";
        positionShip -= 10;
        spaceShip = document.getElementById(positionShip);
        spaceShip.style.backgroundImage = `url("img/Spaceship.jpg")`;
    } else if (e.code === "ArrowRight" && positionShip < 76 && gameStatus) {
        spaceShip.style.backgroundImage = "none";
        positionShip += 10;
        spaceShip = document.getElementById(positionShip);
        spaceShip.style.backgroundImage = `url("img/Spaceship.jpg")`;
    }
}

function enemysStatus() {
    if (gameStatus) {
        enemysList.forEach((obiect, index) => {
            enemyEffect(obiect.position, index);
            ++obiect.position;
            collision();
        });
    }
}

function bulletsStatus() {
    if (gameStatus) {
        bulletsList.forEach((obiect, index) => {
            bulletEffect(obiect.position, index);
            --obiect.position;
            collision();
        });
    }
}

function rezumeGame() {
    gameStatus = 1;
    let button = document.getElementById("startGame");
    button.textContent = "PAUSE";
    button.setAttribute('onclick',
        `pauseGame()`);
}

function pauseGame() {
    gameStatus = 0;
    let button = document.getElementById("startGame");
    button.textContent = "REZUME";
    button.setAttribute('onclick',
        `rezumeGame()`);
}

function startGame() {
    let gridContainer = document.getElementById("container");
    gameStatus = 1;
    let btnStart = document.getElementById("startGame");
    btnStart.textContent = "PAUSE";
    btnStart.setAttribute('onclick',
        `pauseGame()`);
    gridContainer.style.display = "grid";
    let message = document.getElementById("message");
    message.innerHTML = "SCORE 0"
    for (let i = 1; i <= 6; ++i) {
        for (let j = 1; j <= 7; j++) {
            let newField = document.createElement("div");
            newField.className = "griItem";
            newField.id = j * 10 + i;
            gridContainer.appendChild(newField);
        }
    }
    spaceShip = document.getElementById(positionShip);
    spaceShip.style.backgroundImage = `url("img/Spaceship.jpg")`;
}

setInterval(enemysStatus, 350);
setInterval(bulletsStatus, 100);
setInterval(spawnEnemy, 1400);
setInterval(collision, 6);
document.addEventListener("keydown", shipControl);
document.addEventListener("keyup", spawnShot);
