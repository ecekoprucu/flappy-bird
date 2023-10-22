//bird info

const birdie = document.getElementById('bird');

const birdPosY = birdie.getClientRects()[0].y;

//pipes info
const pipe1 = document.getElementById('pipe-1');
const pipe2 = document.getElementById('pipe-2');

const innerPipe1 = document.getElementById('inner-pipe-1');
const innerPipe2 = document.getElementById('inner-pipe-2');

const pipeWrapper = document.getElementById('pipe-wrapper');


let birdPosTop = birdPosY;

let movePos = 0;
let hop = 0;
let pipe1Move = 0;
let pipe2Move = 0;
let innerPipe1Move = 0;
let innerPipe2Move = 0;
let multiPipesMove = 0;

let gravity = 0;

let isjumping = false;
let gameOver = false;

function handleGameOver () {
    if(pipe2Move > 200 && pipe2Move < 300 && birdie.getClientRects()[0].y < 118) {
        console.log('hit pipe 2');
        alert('Game Over');
        clearInterval(movePipes);
        clearInterval(setGravity);
        gameOver = true;
        return true;
    }

    if(pipe1Move > 200 && pipe1Move < 300 && birdie.getClientRects()[0].y > 200) {
        console.log('hit pipe 1');
        alert('Game Over');
        clearInterval(movePipes);
        clearInterval(setGravity);
        gameOver = true;
        return true;
    }

}

const movePipes = setInterval(() => {
    if(multiPipesMove > 300) {
        multiPipesMove = -55;
    }

    if(pipe1Move > 300) {
        pipe1Move = -150;
    }

    if (pipe2Move > 300) {
        pipe2Move = -175;
    }

    //detect hit

    if(handleGameOver()) {
        return;
    }
    
    multiPipesMove +=1;
    innerPipe1Move +=1;
    innerPipe2Move +=1;
    pipe1Move +=1;
    pipe2Move +=1;
    pipeWrapper.style.right = `${multiPipesMove}px`;
    pipe1.style.right = `${pipe1Move}px`;
    pipe2.style.right = `${pipe2Move}px`;
}, 20)

const setGravity = setInterval(() => {
        if(!isjumping && !gameOver) {
            gravity += 2;
            birdie.style.marginTop = `${gravity}px`;
        }
}, 100)

function jump () {

    if(gameOver) return;

    const birdUp = setInterval(() => {
        hop += 2;
        isjumping = true;
        if(hop > 4) {
            clearInterval(birdUp);
            fall();
        }
        birdPosTop = birdPosTop - hop;
        birdie.style.top = `${birdPosTop}px`;
        birdie.style.transform = `rotate(-45deg)`;
    }, 50);
}

function fall () {
    
    if(gameOver) return;

    const birdDown = setInterval(() => {
        hop -= 2;
        isjumping = false;
        if(hop < 1) {
            clearInterval(birdDown);
        }
        birdPosTop = birdPosTop - hop;
        birdie.style.top = `${birdPosTop}px`;
        birdie.style.transform = `rotate(5deg)`;
    }, 50);
}

document.addEventListener('keydown', (e) => {
    if(e.repeat) return;

    if(e.code==='Space' && !isjumping && !gameOver) {
        jump();
    }
});