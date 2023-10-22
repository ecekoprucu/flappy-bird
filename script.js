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
let multiPipesMove = 0;

let gravity = 0;

let isjumping = false;
let gameOver = false;
let motionState = 'idle'; 

function handleGameOver () {
    if(pipe2.getClientRects()[0].x > 0 && pipe2.getClientRects()[0].x < 50 && birdie.getClientRects()[0].y < 110) {
        console.log('hit pipe 2');
        alert('Game Over');
        clearInterval(movePipes);
        clearInterval(setGravity);
        gameOver = true;
        return true;
    }
    if(pipe1.getClientRects()[0].x > 0 && pipe1.getClientRects()[0].x < 50 && birdie.getClientRects()[0].y > 200) {
        console.log('hit pipe 1');
        alert('Game Over');
        clearInterval(movePipes);
        clearInterval(setGravity);
        gameOver = true;
        return true;
    }

    if(innerPipe1.getClientRects()[0].x > 0 && innerPipe1.getClientRects()[0].x < 50 && birdie.getClientRects()[0].y < 110) {
        console.log('hit inner pipe 1');
        alert('Game Over');
        clearInterval(movePipes);
        clearInterval(setGravity);
        gameOver = true;
        return true;
    }
    
    if(innerPipe2.getClientRects()[0].x > 0 && innerPipe2.getClientRects()[0].x < 50 && birdie.getClientRects()[0].y > 200) {
        console.log('hit inner pipe 2');
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

    if(motionState !== 'idle' || gameOver) return;
    
    motionState = 'jumping';

    const birdUp = setInterval(() => {
        hop += 2;
        isjumping = true;
        if(hop > 4) {
            clearInterval(birdUp);
            motionState = 'falling';
            fall();
        }
        birdPosTop = birdPosTop - hop;
        birdie.style.top = `${birdPosTop}px`;
        birdie.style.transform = `rotate(-45deg)`;
    }, 50);
}

function fall () {
    
    if(motionState !== 'falling' || gameOver) return;

    const birdDown = setInterval(() => {
        hop -= 2;
        isjumping = false;
        if(hop < 1) {
            clearInterval(birdDown);
            motionState = 'idle';
        }
        birdPosTop = birdPosTop - hop;
        birdie.style.top = `${birdPosTop}px`;
        birdie.style.transform = `rotate(5deg)`;
    }, 50);
}

document.addEventListener('keydown', (e) => {
    if(e.repeat) return;

    if(e.code==='Space' && !isjumping && motionState === 'idle' && !gameOver) {
        jump();
    }
});