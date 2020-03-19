const uploadInput = document.querySelector(".UploadInput");
const uploadTool = document.querySelector(".UploadTool");
uploadTool.addEventListener("click",function(){
    uploadInput.click();
})
uploadInput.addEventListener("change",function(){
    const uploadImg = document.createElement("img");
    const uploadImgData = uploadInput.files[0];

    uploadImg.src = URL.createObjectURL(uploadImgData);
    
    uploadImg.setAttribute("class","UploadImage");
    
    const body = document.querySelector("body");
    body.appendChild(uploadImg);

//----------Image Move-------------------------   
    // let isImageDown = false;
    // let initialX = null;
    // let initialY = null;
    // uploadImg.addEventListener("mousedown",function(e){
    //     initialX = e.clientX-rect.x;
    //     initialY = e.clientY-rect.y;
    //     isImageDown = true;
    // });
    
    // uploadImg.addEventListener("mousemove",function(e){
    //     if(!isImageDown) return;
    //     let finalX = e.clientX-rect.x;
    //     let finalY = e.clientY-rect.y;
    //     let diffX = finalX-initialX;
    //     let diffY = finalY-initialY;
    //     const {top,left} = uploadImg.getBoundingClientRect();
    //     uploadImg.style.top = top + diffY + "px";
    //     uploadImg.style.left = left + diffX + "px";
    //     initialX = finalX;
    //     initialY = finalY;
    // });
    
    // uploadImg.addEventListener("mouseup",function(e){
    //     isImageDown = false;
    // })
    
    // uploadImg.onload = function(){
    //     URL.revokeObjectURL(uploadImg.src);
    // }
});