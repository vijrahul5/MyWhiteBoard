var ok = false;
ctx.lineCap = "round";
ctx.lineJoin = "round";

let undoStack = [];
let redoStack = [];
board.addEventListener("mousedown",function(e){
    ok = true;
    ctx.beginPath();
    ctx.moveTo(e.clientX-rect.x,e.clientY-rect.y);
    let point = {
        x : e.clientX-rect.x,
        y : e.clientY-rect.y,
        identifier : "mousedown",
        color : ctx.strokeStyle,
        width : ctx.lineWidth,
    }
    socket.emit("drawMouseDown",point);
    undoStack.push(point);
});
board.addEventListener("mousemove",function(e){
    if(ok){
        ctx.lineTo(e.clientX-rect.x,e.clientY-rect.y);
        ctx.stroke();
        let point = {
            x : e.clientX-rect.x,
            y : e.clientY-rect.y,
            identifier : "mousemove",
            color : ctx.strokeStyle,
            width : ctx.lineWidth,
        }
        undoStack.push(point);
        socket.emit("drawMouseMove",point);
    }
});

board.addEventListener("mouseup",function(e){
    ok = false;
    socket.emit("drawMouseUp");
});

// ---------- Undo/Redo-------------------
// let interval = null;
const undo = document.querySelector(".undo");
const redo = document.querySelector(".redo");

undo.addEventListener("mousedown",function(e){
    ctx.clearRect(0,0,board.width,board.height);
    // let myfn = function(){
        // console.log("here");
        let point = undoStack.pop();
        redoStack.push(point);
        redraw();
        socket.emit("undoMouseDown");
    // }
    // interval = setInterval(function(){
        // myfn();
    // },100);
    
});

undo.addEventListener("mouseup",function(){
    // clearInterval(interval);
});

redo.addEventListener("mousedown",function(e){
    ctx.clearRect(0,0,board.width,board.height);
    // let myfn = function(){
        let point = redoStack.pop();
        undoStack.push(point);
        redraw();
        socket.emit("redoMouseDown");
    // }
    // interval = setInterval(function(){
        // myfn();
// ;    },100);
});

redo.addEventListener("mouseup",function(){
    // clearInterval(interval);
});

function redraw(){
    console.log("here1");
    for(let i = 0; i < undoStack.length ; i++){
        let {x,y,identifier,color,width} = undoStack[i];
        console.log(undoStack[i]);
        ctx.strokeStyle = color;
        ctx.lineWidth = width;

        if(identifier == "mousedown"){
            ctx.beginPath();
            ctx.moveTo(x,y);
        }else if(identifier == "mousemove"){
            ctx.lineTo(x,y);
            ctx.stroke();
        }
    }
}