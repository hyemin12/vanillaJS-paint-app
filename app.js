const canvas = document.querySelector("#jsCanvas");
const colors = document.querySelectorAll(".controls-color");
const range = document.querySelector("#jsRange");
const mode = document.querySelector("#jsMode");
const saveBtn = document.querySelector("#jsSave");
const ctx = canvas.getContext("2d");

const INITIAL_COLOR = "#2c2c2c";
const CANVAS_SIZE = 700;

canvas.width = CANVAS_SIZE;
canvas.height = CANVAS_SIZE;

ctx.lineWidth = 2.5;
ctx.strokeStyle = INITIAL_COLOR;
ctx.fillStyle = INITIAL_COLOR;

let painting = false;
let filling = false;

function stopPainting() {
  painting = false;
}
function startPainting() {
  painting = true;
}

function onMouseMove(event) {
  const x = event.offsetX;
  const y = event.offsetY;
  if (painting === false) {
    ctx.beginPath();
    ctx.moveTo(x, y);
  } else {
    ctx.lineTo(x, y);
    ctx.stroke();
  }
}

function onMouseDown(event) {
  painting = true;
}

function changeColor(event) {
  const color = event.target.style.backgroundColor;
  ctx.strokeStyle = color;
  ctx.fillStyle = ctx.strokeStyle;
}

function changeRange(event) {
  console.log(event.target.value);
  const size = event.target.value;
  ctx.lineWidth = size;
}

function changeMode() {
  if (filling === true) {
    filling = false;
    mode.innerText = "Fill";
  } else {
    filling = true;
    mode.innerText = "Paint";
  }
}

function changeCanvas() {
  if (filling) {
    ctx.fillRect(0, 0, CANVAS_SIZE, CANVAS_SIZE);
  }
}
function handleCanvasClick(event) {
  event.preventDefault();
}
function saveImage() {
  const image = canvas.toDataURL();
  const link = document.createElement("a");
  link.href = image;
  link.download = "다운로드🎨";
  link.click();
}
if (canvas) {
  canvas.addEventListener("mousemove", onMouseMove);
  canvas.addEventListener("mousedown", startPainting);
  canvas.addEventListener("mouseup", stopPainting);
  canvas.addEventListener("mouseleave", stopPainting);
  canvas.addEventListener("click", changeCanvas);
  canvas.addEventListener("contextmenu", handleCanvasClick);
}

Array.from(colors).forEach((color) =>
  color.addEventListener("click", changeColor)
);

if (range) {
  range.addEventListener("input", changeRange);
}

if (mode) {
  mode.addEventListener("click", changeMode);
}

if (saveBtn) {
  saveBtn.addEventListener("click", saveImage);
}
