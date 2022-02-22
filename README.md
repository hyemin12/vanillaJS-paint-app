# 그림판 만들기

## 사이즈 조절 input

type="range"로 설정하면, 조절할 수 있는 input box가 생성됨
min="값" 최소값  
max="값" 최댓값
value="값" 기본값  
step="값" 컨트롤할 수 있는 단계

```html
<input type="range" id="jsRange" min="0.1" max="5" value="2.5" step="0.1" />
```

## line 만들기

https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D

### | canvas 태그

HTML에 있는 요소 중에 하나  
canvas 안에 있는 픽셀을 다룰 수 있음
context를 가짐  
width, height를 예쁘게 꾸미는 용도의 css, pixel들을 컨트롤할 수 있는 html에 모두 작성해야 작동을 함 (js는 css에서 지정한 width와 height를 받아오지 않기때문에)

### | mouse event

https://hianna.tistory.com/492

현재 프로젝트에서 사용된 event
event명 | 내용
---|---
mousemove | 사용자가 해당 element에서 마우스를 움직였을 때 발생
mousedown | 사용자가 해당 element에서 마우스 버튼을 눌렀을 때 발생
mouseup | 사용자가 해당 element에서 눌렀던 마우스 버튼을 떼었을 때 발생
mouseleaver | 사용자가 마우스를 해당 element 바깥으로 옮겼을 때 발생

```js
// 컨버스를 클릭하고 움직이면 라인이 그려지고,
// 마우스의 버튼을 떼거나 컨버스 밖으로 움직이면 라인이 그려지지 않게 설정
let painting = false;

function stopPainting() {
  painting = false;
}

function startPainting() {
  painting = true;
}

if (canvas) {
  canvas.addEventListener("mousemove", onMouseMove);
  canvas.addEventListener("mousedown", startPainting);
  canvas.addEventListener("mouseup", stopPainting);
  canvas.addEventListener("mouseleave", stopPainting);
}
```

### | 마우스 좌표 가져오기

offsetX, Y : 해당 element의 좌표  
client X, Y : 윈도우 좌표

```js
// 컨버스 내에서의 좌표 값
mouseMove(event){
  const x = event.offsetX;
  const y = event.offsetY;
}
```

### | context 가져와서 라인 그리기

```js
// canvas로부터 context를 가져와서 변수로 저장
const ctx = canvas.getContext("2d");

let painting = false;

if (painting === false) {
  // 경로 만들기
} else {
  // 라인 그리기
}
```

| ctx관련 명령어 | 내용         |
| -------------- | ------------ |
| .beginPath()   | 경로생성     |
| .moveTo(x,y)   | 선 시작 좌표 |
| .lineTo(x,y)   | 선 끝 좌표   |
| .stroke()      | 선 그리기    |

## 선 색상 바꾸기

※ JS에서는 CSS의 정보를 가져오지 않기때문에 js에 명시하거나 html에 직접 스타일을 삽입하는 것이 좋음

> Array.from() : object로 부터 array를 만듬

각각의 색상들을 어레이에 담아서, 해당 color를 클릭했을 경우에 해당 색상으로 변경되도록 설정

```js
function changeColor(event) {
  const color = event.target.style.backgroundColor;
  ctx.strokeStyle = color;
}

Array.from(colors).forEach((color) =>
  color.addEventListener("click", changeColor)
);
```

## 브러쉬 사이즈 바꾸기

변경되는 타켓의 값을 size에 저장하고, 브러쉬의 크기로 지정시키기

```js
const range = document.querySelector("#jsRange");

function changeRange(event) {
  console.log(event.target.value);
  const size = event.target.value;
  ctx.lineWidth = size;
}

if (range) {
  range.addEventListener("input", changeRange);
}
```

## 선 그리기 -> 채우기로 변경하기

1\_ 버튼을 누르면 fill -> paint로 버튼 정보 변경하기

```js
const mode = document.querySelector("#jsMode");

let filling = false;

function changeMode() {
  if (filling === true) {
    filling = false;
    mode.innerText = "Fill";
  } else {
    filling = true;
    mode.innerText = "Paint";
  }
}
```

2\_ fill 버튼을 누르면 event 동작시키기  
fillRect(x좌표, y좌표, width, height)

```js
const mode = document.querySelector("#jsMode");

function changeCanvas() {
  if (filling) {
    ctx.fillRect(0, 0, CANVAS_SIZE, CANVAS_SIZE);
  }
}

if (mode) {
  mode.addEventListener("click", changeMode);
}
```

## 이미지 저장하기

※ canvas는 기본값이 이미지기때문에 캔버스 위에서 마우스 오른쪽 버튼을 누르면 이미지 다운로드를 할 수 있음. 기본동작을 멈추게 하고싶다면 contextmenu 이벤트 만들면 됨

```js
function handleCanvasClick(event) {
  event.preventDefault();
}

canvas.addEventListener("contextmenu", handleCanvasClick);
```

버튼을 클릭하면 이미지 다운로드 하기

https://developer.mozilla.org/en-US/docs/Web/API/HTMLCanvasElement/toDataURL

1\_ canvas의 이미지 data 가져오기  
.toDataURL(); 기본값: png / 변경을 원한다면 .toDataURL("image/jpeg");

2\_ 가상의 a 태그를 만든 후 href에 이미지 URL을 저장시키고, download로 이미지명을 입력하면 됨

```js
const saveBtn = document.querySelector("#jsSave");

function saveImage() {
  const image = canvas.toDataURL();
  const link = document.createElement("a");
  link.href = image;
  link.download = "다운로드🎨";
  link.click();
}

if (saveBtn) {
  saveBtn.addEventListener("click", saveImage);
}
```
