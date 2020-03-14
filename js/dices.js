function openDiceRoller(){
    if(document.getElementById("dicesDiv").offsetHeight == 0){
        document.getElementById("dicesDiv").style.height = "60vh";
    }else{
        document.getElementById("dicesDiv").style.height = "0";
    }
}

function roll(elmnt){
    executeRoll(elmnt, getRandomInt(0, 6));
    
}

function executeRoll(elmnt, num){//another function for not propagate...very bad design, need quick refactor
    runRoll(elmnt, num);
    sendDiceRoll(elmnt.getAttribute("id"), num);
}

function runRoll(elmnt, num){
    let canvas = document.getElementById("canvas_" + elmnt.getAttribute("id"));
    canvas.width = elmnt.offsetWidth;
    canvas.height = elmnt.offsetHeight;
    canvas.style.position = "absolute";
    canvas.style.top = elmnt.offsetTop + "px";
    canvas.style.left = elmnt.offsetLeft + "px";
    ctx = canvas.getContext('2d')//.drawImage(elmnt, 0, 0);

    //ctx.fillRect(canvas.width/6 * num, 0, canvas.height, canvas.width/6);
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    if(elmnt.getAttribute("id") == "dice_red"){
        ctx.strokeStyle = "#0000FF";
    }else{
        ctx.strokeStyle = "#FF0000";
    }
    ctx.lineWidth = 5;
    ctx.beginPath();
    ctx.moveTo(canvas.width/6 * num, 0);
    ctx.lineTo(canvas.width/6 * (num + 1), 0);
    ctx.lineTo(canvas.width/6 * (num + 1), canvas.height);
    ctx.lineTo(canvas.width/6 * (num), canvas.height);
    ctx.lineTo(canvas.width/6 * (num), 0);
    ctx.stroke();

}

function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min)) + min; //The maximum is exclusive and the minimum is inclusive
}

function clearDiceCanvas(){
    document.getElementById("canvas_dice_blue").height = 0;
    document.getElementById("canvas_dice_red").height = 0;
    document.getElementById("canvas_dice_green").height = 0;
    document.getElementById("canvas_dice_yellow").height = 0;
    document.getElementById("canvas_dice_brown").height = 0;
    document.getElementById("canvas_dice_grey").height = 0;
    document.getElementById("canvas_dice_black").height = 0;
}