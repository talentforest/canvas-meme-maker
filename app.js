const canvas = document.querySelector('canvas');
const ctx = canvas.getContext('2d');

const textInput = document.getElementById('text');
const fileInput = document.getElementById('file');
const eraserBtn = document.getElementById('eraser-btn');
const destroyBtn = document.getElementById('destroy-btn');
const textBtn = document.getElementById('text-btn');
const drawBtn = document.getElementById('draw-btn');
const fillBtn = document.getElementById('fill-btn');
const saveBtn = document.getElementById('save-btn');
const colorOptions = Array.from(
  document.getElementsByClassName('color-option')
);
const color = document.getElementById('color');
const lineWidth = document.getElementById('line-width');
const CANVAS_WIDTH = 400;
const CANVAS_HEIGHT = 400;
canvas.width = CANVAS_WIDTH;
canvas.height = CANVAS_HEIGHT;

ctx.lineWidth = lineWidth.value;
ctx.lineCap = 'round';
ctx.lineJoin = 'round';
let isPainting = false;
let isFilling = false;

function onMove(event) {
  if (isPainting) {
    ctx.lineTo(event.offsetX, event.offsetY);
    ctx.stroke();
    return;
  }
  ctx.moveTo(event.offsetX, event.offsetY);
}
function startPainting() {
  isPainting = true;
}
function cancelPainting() {
  isPainting = false;
  ctx.beginPath();
}
function onLineWidthChange(event) {
  ctx.lineWidth = event.target.value;
}
function onColorChange(event) {
  ctx.strokeStyle = event.target.value;
  ctx.fillStyle = event.target.value;
}
function onColorClick(event) {
  const colorValue = event.target.dataset.color;
  ctx.strokeStyle = colorValue;
  ctx.fillStyle = colorValue;
  color.value = colorValue;
}
function onDrawClick() {
  setActive(drawBtn);

  isFilling = false;
}
function onFillClick() {
  setActive(fillBtn);
  isFilling = true;
}
function onCanvasClick() {
  if (isFilling) {
    ctx.fillRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
  }
}
function onDestroyClick() {
  setActive(destroyBtn);
  ctx.fillStyle = 'white';
  ctx.fillRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
  ctx.fillStyle = '#3498db';
}

function onEraserClick() {
  setActive(eraserBtn);
  ctx.strokeStyle = 'white';
  isFilling = false;
}
function onFileChange(event) {
  const file = event.target.files[0];
  const url = URL.createObjectURL(file);
  const image = new Image();
  image.src = url;
  image.onload = function () {
    ctx.drawImage(image, 0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
    fileInput.value = null;
  };
}

function onDoubleClick(event) {
  const text = textInput.value;
  if (text !== '') {
    ctx.save();
    ctx.lineWidth = 1;
    ctx.font = "20px 'Serif'";
    ctx.fillText(text, event.offsetX, event.offsetY);
    ctx.restore();
  }
}

function onTextBtnClick() {
  setActive(textBtn);
  textInput.classList.add('open');
}

function onSaveClick() {
  const url = canvas.toDataURL();
  const a = document.createElement('a');
  a.href = url;
  a.download = 'myDrawing.png';
  a.click();
}

function setActive(target) {
  isFilling = false;
  textBtn.classList.remove('active');
  destroyBtn.classList.remove('active');
  fillBtn.classList.remove('active');
  drawBtn.classList.remove('active');
  eraserBtn.classList.remove('active');
  target.classList.add('active');
}

canvas.addEventListener('dblclick', onDoubleClick);
canvas.addEventListener('mousemove', onMove);
canvas.addEventListener('mousedown', startPainting);
canvas.addEventListener('mouseup', cancelPainting);
canvas.addEventListener('mouseleave', cancelPainting);
canvas.addEventListener('click', onCanvasClick);
lineWidth.addEventListener('change', onLineWidthChange);
color.addEventListener('change', onColorChange);
colorOptions.forEach((color) => color.addEventListener('click', onColorClick));
drawBtn.addEventListener('click', onDrawClick);
fillBtn.addEventListener('click', onFillClick);
textBtn.addEventListener('click', onTextBtnClick);
destroyBtn.addEventListener('click', onDestroyClick);
eraserBtn.addEventListener('click', onEraserClick);
fileInput.addEventListener('change', onFileChange);
saveBtn.addEventListener('click', onSaveClick);
