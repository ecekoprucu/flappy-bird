//bird info

const birdie = document.getElementById('bird');

const birdPosY = birdie.getClientRects()[0].y;

//pipes info
const pipe1 = document.getElementById('pipe-1');
const pipe2 = document.getElementById('pipe-2');

const innerPipe1 = document.getElementById('inner-pipe-1');
const innerPipe2 = document.getElementById('inner-pipe-2');

const pipeWrapper = document.getElementById('pipe-wrapper');

console.log(innerPipe1.getClientRects()[0].x);
console.log(innerPipe2.getClientRects()[0].x);

let birdPosTop = birdPosY;

let movePos = 0;
let hop = 0;
let isJumping = false;
let pipe1Move = 0;
let pipe2Move = 0;
let multiPipesMove = 0;

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

    multiPipesMove +=1;
    pipe1Move +=1;
    pipe2Move +=1;
    pipeWrapper.style.right = `${multiPipesMove}px`;
    pipe1.style.right = `${pipe1Move}px`;
    pipe2.style.right = `${pipe2Move}px`;
}, 20)

function jump () {
    const birdUp = setInterval(() => {
        hop += 8;
        isJumping = true;
        if(hop > 30) {
            clearInterval(birdUp);
            fall();
        }

        birdie.style.marginBottom = `${hop}px`;
        birdie.style.transform = `rotate(-45deg)`;
    }, 50);
}

function fall () {
    const birdDown = setInterval(() => {
        hop -= 8;

        if(hop < 8) {
            isJumping = false;
            clearInterval(birdDown);
        }
        birdie.style.marginBottom = `${hop}px`;
        birdie.style.transform = `rotate(5deg)`;
    }, 50);
}

document.addEventListener('keydown', (e) => {
    if(e.code==='Space' && !isJumping) {
        jump();
    }
})