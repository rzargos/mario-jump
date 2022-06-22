const mario = document.querySelector('.mario')
const pipe = document.querySelector('.pipe')
const clouds = document.querySelector('.clouds')
const gameOver = document.querySelector('.game-over')
const gameBoard = document.querySelector('.game-board')
const startButton = document.querySelector('.start-button')
const pontuation = document.querySelector('.score')
let isScore = false
let score = 0
let isPlaing = false

pipe.style.animation = 'none'
clouds.style.animation = 'none'

const jump = (event) => {
    if (event.key == " ") {
        mario.classList.add('jump')
        
        setTimeout(() => {
            mario.classList.remove('jump')
        },500)
    }
}

function validation() {
    const loop = setInterval(() => {
    
        const pipePosition = pipe.offsetLeft
        const marioPosition = +window.getComputedStyle(mario).bottom.replace('px','')
        const cloudsPosition = clouds.offsetLeft

        if (pipePosition <= 0 && isScore == false) {
            score++
            isScore = true
            pontuation.innerHTML = `Score: ${score}`
        }
        
        if (pipePosition > 0) {
            isScore = false
        }

        if (pipePosition <= 120 && pipePosition > 0  && marioPosition < 80) {
    
            pipe.style.animation = 'none'
            pipe.style.left = `${pipePosition}px`
    
            mario.classList.remove('jump')
            mario.style.bottom = `${marioPosition}px`
    
            clouds.style.animation = 'none'
            clouds.style.left = `${cloudsPosition}px`
    
            mario.src = './images/game-over.png'
            mario.style.width = '75px ' 
            mario.style.marginLeft = '50px'

            startButton.innerText = 'PLAY AGAIN'
            startButton.removeAttribute('disabled')
    
            isPlaing = false

            if (!isPlaing) {
                startButton.classList.remove('playing')
            }
    
            clearInterval(loop)
        }
    }, 10)
}

document.addEventListener('keydown', (event) => {
    if (isPlaing) {
        jump(event)
    }
}) 

animation = {
    mario: 'animation: jump 500ms ease-out',
    pipe:  'pipe-animation 1.5s infinite linear',
    clouds: 'clouds-animation 20s infinite linear'
}

function start() {
    const verifyButton = startButton.classList.contains('playing')
    if (verifyButton) {
        return
    }

    score = 0
    pontuation.innerHTML = `Score: ${score}`
    isPlaing = true

    if (isPlaing) {
        startButton.classList.add('playing')
    }
    

    validation()
    pipe.style.animation = animation.pipe

    clouds.style.animation = animation.clouds

    pipe.style.left = ``
    mario.style.bottom = ``
    clouds.style.left = ``

    mario.src = './images/mario.gif'
    mario.style.width = '150px' 
    mario.style.marginLeft = ''

    startButton.setAttribute('disabled', 'true')
}
