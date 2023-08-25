refs = {
    startBtn: document.querySelector('[data-start]'),
    stopBtn: document.querySelector('[data-stop]'),
    body: document.querySelector('body')
}

refs.startBtn.disabled = false
refs.stopBtn.disabled = true 

refs.startBtn.addEventListener('click', onStart)
refs.stopBtn.addEventListener('click', onStop)

let timer = 0;
function onStart() {
    timer = setInterval(() => {
       const currColor = getRandomHexColor();
       refs.body.style.backgroundColor = currColor;
   }, 1000);
    refs.startBtn.disabled = true;
    refs.stopBtn.disabled = false;
}

function onStop() {
    clearInterval(timer);
    refs.startBtn.disabled = false;
    refs.stopBtn.disabled = true;
}


function getRandomHexColor() {
    return `#${Math.floor(Math.random() * 16777215).toString(16).padStart(6, 0)}`;
}

