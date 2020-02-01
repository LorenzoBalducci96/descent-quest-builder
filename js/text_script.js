
function incFont(id){
    document.getElementById(id).style.fontSize = 
        (parseInt(document.getElementById(id).style.fontSize, 10) + 2) + "px";
}


function decFont(id){
    document.getElementById(id).style.fontSize = 
        (parseInt(document.getElementById(id).style.fontSize, 10) - 2) + "px";
}

function boldFont(id){
    if(document.getElementById(id).style.fontWeight == "bold"){
        document.getElementById(id).style.fontWeight = "normal"
    }else{
        document.getElementById(id).style.fontWeight = "bold"
    }
}

function colorBlack(id){
    document.getElementById(id).style.color = "black";
}

function colorRed(id){
    document.getElementById(id).style.color = "red";
}

function colorGreen(id){
    document.getElementById(id).style.color = "green";
}

function colorBlue(id){
    document.getElementById(id).style.color = "blue";
}

function colorWhite(id){
    document.getElementById(id).style.color = "white";
}