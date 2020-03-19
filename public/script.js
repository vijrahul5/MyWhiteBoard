const socket = io.connect("http://127.0.0.1:3000/");
const board = document.querySelector(".board");
var rect = board.getBoundingClientRect();
board.height = window.innerHeight;
board.width = window.innerWidth;

const ctx = board.getContext("2d");

const inputPen = document.querySelector("#size1");
const inputEraser = document.querySelector("#size2");
ctx.lineWidth = inputPen.value;

inputPen.addEventListener("change",function(){
    ctx.lineWidth = inputPen.value;
    socket.emit("size",ctx.lineWidth);
});

inputEraser.addEventListener("change",function(){
    ctx.lineWidth = inputEraser.value;
    socket.emit("size",ctx.lineWidth);
});

let ActiveTool = "Pencil";
const pencilOptions = document.querySelector(".Pencil");
const eraserOptions = document.querySelector(".Eraser");
var clickCnt = 0;
function handleToolChange(tool){
    if(tool == "Pencil"){
        if(ActiveTool == "Pencil" && clickCnt == 1){
            pencilOptions.classList.add("show");
            clickCnt = 2;
        }else if(ActiveTool == "Pencil" && clickCnt == 2){
            pencilOptions.classList.remove("show");
            eraserOptions.classList.remove("show");
            ActiveTool = "Pencil";
            clickCnt = 0;
        }else if(ActiveTool == "Pencil" && clickCnt == 0){
            pencilOptions.classList.add("show");
            clickCnt = 2;
        }
        else{
            eraserOptions.classList.remove("show");
            ctx.strokeStyle = "blue";
            ctx.lineWidth = inputPen.value;
            ActiveTool = "Pencil";
            clickCnt = 1;
        }
    }else if(tool == "Eraser"){
        if(ActiveTool == "Eraser" && clickCnt == 1){
            eraserOptions.classList.add("show");
            clickCnt = 2;
        }else if(ActiveTool == "Eraser" && clickCnt == 2){
            pencilOptions.classList.remove("show");
            eraserOptions.classList.remove("show");
            ctx.strokeStyle = "white";
            ActiveTool = "Eraser";
            clickCnt = 0;
        }else if(ActiveTool == "Eraser" && clickCnt == 0){
            eraserOptions.classList.add("show");
            clickCnt = 2;
        }
        else{
            ctx.strokeStyle = "white";
            pencilOptions.classList.remove("show");
            ctx.lineWidth = inputEraser.value;
            ActiveTool = "Eraser";
        }
    }else if(tool == "Sticky"){
        pencilOptions.classList.remove("show");
        eraserOptions.classList.remove("show");
        ActiveTool = "Sticky";
        clickCnt = 0;
        createSticky();
    }
}

function handleColorChange(color){
    ctx.strokeStyle = color;
    socket.emit("color",ctx.strokeStyle);
}