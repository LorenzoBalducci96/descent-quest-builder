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