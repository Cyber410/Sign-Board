const canvas = document.getElementById("draw-here");
const form = document.getElementById("type-here");
const button = document.getElementById("clear");
const downloadButton = document.getElementById("download");
const background = document.getElementById("bg-color");
const Pen = document.getElementById("pen-color");
const Size = document.getElementById("Font-size");

const cntx = canvas.getContext('2d');
let x = "";
let isDrawing = false;
let lastx = 0;
let lasty = 0;
let throttled = false;
let fontSize= "50px Arial";
let penColor="black";

function canvasWidth(){
   let width= canvas.parentElement.offsetWidth;
    canvas.height=width/2.5;
    canvas.width=width/2.5;
}

canvasWidth();

window.addEventListener("resize",canvasWidth);

function getMousePosition(event) {
    const rect = canvas.getBoundingClientRect();
    return {
        x: event.clientX - rect.left,
        y: event.clientY - rect.top
    };
}

canvas.addEventListener("mousedown", (event) => {
    isDrawing = true;
    let pos = getMousePosition(event);
    lastx = pos.x;
    lasty = pos.y;
    cntx.beginPath(); 
    cntx.moveTo(lastx, lasty);// Start a new path here
});

canvas.addEventListener("mousemove", (event) => {
    if (isDrawing) {
        let pos = getMousePosition(event);
        let currentx = pos.x;
        let currenty = pos.y;
        cntx.bezierCurveTo(lastx, lasty, (lastx + currentx) / 2, (lasty + currenty) / 2, currentx, currenty);
        cntx.strokeStyle = penColor;
        cntx.stroke();
        lastx = currentx;
        lasty = currenty;
    }
});

canvas.addEventListener('mouseup', () => {
    isDrawing = false;
});

canvas.addEventListener('mouseout', () => {
    isDrawing = false; 
});

form.addEventListener('input', (event) => {
    x = event.target.value;
});

form.addEventListener('keydown', (event) => {
    if (event.key === "Enter") {
        event.preventDefault();
        cntx.font = fontSize; // Set font size and font family
        cntx.fillStyle = penColor;
        const textWidth = cntx.measureText(x).width;
        const xPos = (canvas.width - textWidth) / 2;
        const yPos = (canvas.height + parseInt(fontSize, 10)) / 2; // 50 is the font size
        cntx.fillText(x, xPos, yPos);
    }
});

button.addEventListener("click", (event) => {
    cntx.clearRect(0, 0, canvas.width, canvas.height); // Clear canvas
    form.reset(); // Reset form inputs
});

downloadButton.addEventListener("click", (event) => {
    event.preventDefault();
    const link = document.createElement('a');
    link.download = 'signature.png';
    link.href = canvas.toDataURL();
    link.click();
});

background.addEventListener("input", (event) => {
    canvas.style.backgroundColor = event.target.value;
});

Size.addEventListener("input", (event) => {
    fontSize = `${event.target.value}px Arial`; 
});

Pen.addEventListener("input", (event) => {
     penColor = `${event.target.value}`; 
});
