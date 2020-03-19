// Server Side :
const express = require("express");
const app = express();
const server = require("http").Server(app);
const io = require("socket.io")(server);

app.use(express.static("public"));

io.on("connection",function(socket){
    socket.on("color",function(color){
        socket.broadcast.emit("handleColorChange",color);
    });

    socket.on("size",function(size){
        socket.broadcast.emit("handleSizeChange",size);
    });

    socket.on("drawMouseDown",function(point){
        socket.broadcast.emit("handleDrawMouseDown",point);
    });

    socket.on("drawMouseMove",function(point){
        socket.broadcast.emit("handleDrawMouseMove",point);
    });

    socket.on("drawMouseUp",function(){
        socket.broadcast.emit("handleDrawMouseUp");
    })

    socket.on("undoMouseDown",function(){
        socket.broadcast.emit("handleUndoMouseDown");
    });

    socket.on("redoMouseDown",function(){
        socket.broadcast.emit("handleRedoMouseDown");
    });


});
const port = process.env.PORT || 3000;
server.listen(port,function(req,res){
    console.log("Server has started at port 3000");
});
