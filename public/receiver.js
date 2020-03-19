socket.on("handleColorChange",function(color){
    ctx.strokeStyle = color;
});
socket.on("handleSizeChange",function(size){
    ctx.lineWidth = size;
});
socket.on("handleDrawMouseDown",function(point){
    ok = true;
    ctx.beginPath();
    ctx.moveTo(point.x,point.y);
    undoStack.push(point);
});
socket.on("handleDrawMouseMove",function(point){
    if(ok){
        ctx.lineTo(point.x,point.y);
        ctx.stroke();
        undoStack.push(point);
    }
});
socket.on("handleDrawMouseUp",function(){
    ok = false;
});

socket.on("handleUndoMouseDown",function(){
    ctx.clearRect(0,0,board.width,board.height);
    let point = undoStack.pop();
    redoStack.push(point);
    redraw();
});

socket.on("handleRedoMouseDown",function(){
    ctx.clearRect(0,0,board.width,board.height);
    let point = redoStack.pop();
    undoStack.push(point);
    redraw();
});