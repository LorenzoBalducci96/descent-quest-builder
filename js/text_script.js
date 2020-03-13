var oldTextX;
var oldTextY;
var dragginTextArea;

function resizeTextArea(e, textArea){
    e.preventDefault();
    if(dragginTextArea == textArea.getAttribute("id")){
        textArea.style.width = (textArea.offsetWidth + e.touches[0].pageX - oldTextX) + "px"
        textArea.style.height = (textArea.offsetHeight + e.touches[0].pageY - oldTextY) + "px"
        oldTextX = e.touches[0].pageX;
        oldTextY = e.touches[0].pageY;
    }else{
        dragginTextArea = textArea.getAttribute("id");
        oldTextX = e.touches[0].pageX;
        oldTextY = e.touches[0].pageY;
    }
}

function endResize(){
    oldTextX = null;
    oldTextY = null;
    dragginTextArea = null;
}

function incFont(textArea){

    textArea.style.fontSize = (parseFloat((textArea.style.fontSize)) + 4) + "px";
}


function decFont(textArea){
    textArea.style.fontSize = (parseFloat((textArea.style.fontSize)) - 4) + "px";
}

function boldFont(textArea){
    if(textArea.style.fontWeight == "bold"){
        textArea.style.fontWeight = "normal"
    }else{
        textArea.style.fontWeight = "bold"
    }
}

function colorBlack(textArea){
    textArea.style.color = "black";
}

function colorRed(textArea){
    textArea.style.color = "red";
}

function colorGreen(textArea){
    textArea.style.color = "green";
}

function colorBlue(textArea){
    textArea.style.color = "blue";
}

function colorWhite(textArea){
    textArea.style.color = "white";
    textArea.style.text.borderColor = "black"
}