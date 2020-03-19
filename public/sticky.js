function createSticky(){
    const body = document.querySelector("body");
    
    const stickyNote = document.createElement("div");
    const stickyNav = document.createElement("div");
    const stickyWritingPad = document.createElement("div");
    const close = document.createElement("div");
    const minimize = document.createElement("div");
    const stickyTextArea = document.createElement("textarea")

    stickyNote.setAttribute("class","Sticky-note");
    stickyNav.setAttribute("class","Sticky-nav");
    stickyWritingPad.setAttribute("class","Sticky-writingpad");
    close.setAttribute("class","Sticky-close");
    minimize.setAttribute("class","Sticky-minimize");
    stickyTextArea.setAttribute("class","Sticky-textarea");

    stickyWritingPad.appendChild(stickyTextArea);
    stickyNav.appendChild(close);
    stickyNav.appendChild(minimize);
    stickyNote.appendChild(stickyNav);
    stickyNote.appendChild(stickyWritingPad);
    body.appendChild(stickyNote);

    let flag = true;
    minimize.addEventListener("click",function(){
        if(flag){
            stickyWritingPad.classList.add("Hidden");
        }else{
            stickyWritingPad.classList.remove("Hidden");
        }
        flag = (!flag);
    });
    close.addEventListener("click",function(){
        stickyNote.remove();
    });
//---------------------------- Move -------------
    let isStickyDown = false;
    let intialX = null;
    let intialY = null;
   stickyNav.addEventListener("mousedown", function (e) {
       intialX = e.clientX;
       intialY = e.clientY;
       isStickyDown = true;
    });
   stickyNav.addEventListener("mousemove", function (e) {
        if (isStickyDown == true){
            let finalX = e.clientX;
            let finalY = e.clientY;
            let diffX = finalX - intialX;
            let diffY = finalY - intialY;
            let { top,left } = stickyNote.getBoundingClientRect();
            stickyNote.style.top = top + diffY + "px";
            stickyNote.style.left = left + diffX + "px";
            intialY = finalY;
            intialX = finalX;
        }

    });
   stickyNav.addEventListener("mouseup", function (e) {
        isStickyDown = false;
    });
    stickyNav.addEventListener("mouseleave", function (e) {
        isStickyDown = false;
    });

}
