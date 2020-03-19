function openDiceRoller(){
    if(document.getElementById("dicesDiv").style.display == "none"){
        document.getElementById("dicesDiv").style.display = "block";
    }else{
        document.getElementById("dicesDiv").style.display = "none"
    }
}

var faceRot = ["rotate3d(0, 0, 1, -90deg)",
                "rotate3d(1, 0, 0, 180deg)",
                "rotate3d(1, 0, 0, 90deg)",
                "rotate3d(1, 0, 0, -90deg)",
                "rotate3d(0, 1, 0, -90deg)",
                "rotate3d(0, 1, 0, 90deg)"]

function rollDice(dice) {
    var randFace = Math.round(Math.random() * 5);
    sendDiceRoll(dice.getAttribute("id"), randFace);
    executeRollDice(dice, randFace);
}

function executeRollDice(dice, randFace){
    console.log("roll: " + randFace);
    dice.style.transform = "rotate3d(1, 0, 0, " + Math.random() * 360 +  "deg) rotate3d(0, 1, 0, " + Math.random() * 360 +  "deg) rotate3d(0, 0, 1, " + Math.random() * 360 +  "deg)";

    setTimeout( function() {
      dice.style.transform = faceRot[randFace];
      document.getElementsByClassName("dice-face")[randFace].style.backgroundColor = "black";
    }, 1200 );
}






var oldDicesX;
var oldDicesY;

function startDragDices(e){
    div = document.getElementById("dicesDiv");
    oldDicesX = e.clientX;
    oldDicesY = e.clientY;

    document.onmousemove = moveDices;
    document.onmouseup = endDragDices;
}

function moveDices(e){
    div = document.getElementById("dicesDiv");
    e.preventDefault();
    div.style.left = (div.offsetLeft + e.clientX - oldDicesX) + "px"
    div.style.top = (div.offsetTop + e.clientY - oldDicesY) + "px"
    oldDicesX = e.clientX;
    oldDicesY = e.clientY;
    div.onmouseup = function(){
        document.getElementById("dicesDiv").onmousemove = null;
    }

    /*
    e.preventDefault();
    if(dragginDices == true){
        div.style.left = (div.offsetLeft + e.touches[0].pageX - oldDicesX) + "px"
        div.style.height = (div.offsetTop + e.touches[0].pageY - oldDicesY) + "px"
        oldDicesX = e.touches[0].pageX;
        oldDicesY = e.touches[0].pageY;
    }else{
        dragginDices = true;
        oldTextX = e.touches[0].pageX;
        oldTextY = e.touches[0].pageY;
    }
    */
}

function endDragDices(){
    document.onmousemove = null;
}







//old functions for canvas dices
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