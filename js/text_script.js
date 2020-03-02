
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