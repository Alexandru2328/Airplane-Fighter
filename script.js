let spaceship;
let pozitionShip = 46;
let bulletsNr = 0;
let bulletsList = [];
let enemyNr = 0;
let enemyList = [];
const enemyPozition = [11, 21, 31, 41, 51, 61, 71];
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
        for (let j = 0; j < enemyList.length && gameStatus; j++) {
            if (bulletsList[i].pozition === enemyList[j].pozition) {
                let field = document.getElementById(bulletsList[i].pozition);
                bulletsList.splice(i, 1);
                enemyList.splice(j, 1);
                field.style.backgroundImage = "none"; 
                ++score;
                message.innerHTML = "SCORE " + score;
                break;
            }
            
        }
    }
}

function enemyEffect(field, index) {
    let pozition = document.getElementById(field);
    if (field % 10 === 6) {
        enemyList.splice(index, 1);
        pozition.style.backgroundImage = "none";
    } else {
        pozition.style.backgroundImage = "none";
        ++field;
        pozition = document.getElementById(field);
        pozition.style.backgroundImage = 'url("img/enemy.png")';
    }
    if (field == pozitionShip) {
        gameStatus = 0;
        message();
    }
}

function spawnEnemy() {
    if (gameStatus) {
        let pozition = enemyPozition[Math.floor(Math.random() * enemyPozition.length)];
        ++enemyNr;
        let enemy = document.getElementById(pozition);
        enemy.style.backgroundImage = 'url("img/enemy.png")';
        enemyList.push({ key: enemyNr, pozition: pozition });
    }
} 

function bulletEffect(pozitionBullet, index) {
    let pozition = document.getElementById(pozitionBullet);
    if (pozitionBullet % 10 === 1) {
        bulletsList.splice(index, 1);
        pozition.style.backgroundImage = "none";
    } else {
        pozition.style.backgroundImage = "none";
        --pozitionBullet;
        pozition = document.getElementById(pozitionBullet);
        pozition.style.backgroundImage = 'url("img/bullet.png")';
    }
}

function spawnShoot(e) {
    if (e.code === "Space" && gameStatus) {
        ++bulletsNr;
        let pozitionBullet = pozitionShip - 1;
        let shootElement = document.getElementById(pozitionBullet);
        shootElement.style.backgroundImage = 'url("img/bullet.png")';  
        bulletsList.push({ key: bulletsNr, pozition: pozitionBullet });
    }
}

function shipControl(e) {
    if (e.code === "ArrowLeft" && pozitionShip > 16 && gameStatus) {
        spaceship.style.backgroundImage = "none";
        pozitionShip -= 10;
        spaceship = document.getElementById(pozitionShip);
        spaceship.style.backgroundImage = `url("img/Spaceship.jpg")`;
    } else if (e.code === "ArrowRight" && pozitionShip < 76 && gameStatus) {
        spaceship.style.backgroundImage = "none";
        pozitionShip += 10;
        spaceship = document.getElementById(pozitionShip);
        spaceship.style.backgroundImage = `url("img/Spaceship.jpg")`;
    }
}

function enemyStatus() {
    if (gameStatus) {
        enemyList.forEach((obiect, index) => {
            enemyEffect(obiect.pozition, index);
            ++obiect.pozition;
            collision();
        });
    }
}

function bulletStatus() {
    if (gameStatus) {
        bulletsList.forEach((obiect, index) => {
            bulletEffect(obiect.pozition, index);
            --obiect.pozition;
            collision();
        });
    }
}

function rezumeGAme() {
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
    `rezumeGAme()`);
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
    spaceship = document.getElementById(pozitionShip);
    spaceship.style.backgroundImage = `url("img/Spaceship.jpg")`;
}

setInterval(enemyStatus, 350);
setInterval(bulletStatus, 100);
setInterval(spawnEnemy, 1400);
setInterval(collision, 6);
document.addEventListener("keydown", shipControl);
document.addEventListener("keyup", spawnShoot);