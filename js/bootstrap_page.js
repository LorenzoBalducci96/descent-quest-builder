var completedImages = 0;
var scale = 1;

var webSocket;
var socketInitialized = false;

function initializeSocket(){
    webSocket = new WebSocket(document.getElementById("socketId").value);
    webSocket.onmessage = function(event){
        message = JSON.parse(event.data);
        if (message.messageType == "MOVE" || message.messageType == "TEXT"){
            elmnt = document.getElementById(message.pieceId);
            if(message.onMap == "no"){
                document.getElementById(activeSet).appendChild(elmnt);
                elmnt.style.width = "100%";
                elmnt.setAttribute("onMap", "no")
                if (elmnt.getAttribute("single") == "yes") {//updating visibility of other side tiles
                    var placeholderImage = document.getElementById("placeholder_" + elmnt.getAttribute("image"));
                    elmnt.setAttribute("onMap", "no");
                    elmnt.setAttribute("orientation", "0");
                    //elmnt.src = placeholderImage.src;
                    elmnt.src = placeholderImage.getAttribute("src");
                    document.getElementById(elmnt.getAttribute("set")).appendChild(elmnt);
                    elmnt.style.top = placeholderImage.offsetTop + "px";
                    elmnt.style.left = placeholderImage.offsetLeft + "px";
                    elmnt.style.width = "100%"//placeholderImage.offsetWidth + "px";
    
                    var tileFace = ""
                    if (elmnt.id.charAt(elmnt.id.length - 1) == 'A') {
                        tileFace = 'B'
                    } else if (elmnt.id.charAt(elmnt.id.length - 1) == 'B') {
                        tileFace = 'A'
                    }
                    var placeholderOtherSide = document.getElementById(elmnt.id.substring(0, elmnt.id.length - 1) + tileFace);
                    placeholderOtherSide.style.visibility = "";
                } else {
                    var placeholderImage = document.getElementById("placeholder_" + elmnt.getAttribute("image"));//elmnt.id.substr(0, elmnt.id.lastIndexOf("_") + 1) + "1");
                    elmnt.parentNode.removeChild(elmnt);
                }
            }else if(!(elmnt.getAttribute("onMap") == "yes")){//we have to put on map
                //alert("piece " + message.pieceId + " not on map, put it on map and ask other player to move it again");
                if (elmnt.getAttribute("single") == "no") {
                    var placeholderImage = document.getElementById("placeholder_" + elmnt.getAttribute("image"));
                    var backup = elmnt.cloneNode(true);
                    document.getElementById(elmnt.getAttribute("set")).appendChild(backup);
                    backup.style.top = placeholderImage.offsetTop + "px";
                    backup.style.left = placeholderImage.offsetLeft + "px";
                    backup.style.width = "100%"//placeholderImage.offsetWidth + "px";
                    //backup.src = placeholderImage.src;
                    backup.src = placeholderImage.getAttribute("src");
                    backup.style.zIndex = "0";
                    backup.id = elmnt.id.substr(0, elmnt.id.lastIndexOf("_") + 1) + (parseInt(elmnt.id.match(/(\d+)$/)[0], 10) + 1);
                    backup.setAttribute("onMap", "no");
                    dragElement(backup);
                }
                elmnt.setAttribute("onMap", "yes")
                document.getElementById("map").appendChild(elmnt);
                elmnt.style.width = 'auto';
                
                elmnt.style.top = message.top;
                elmnt.style.left = message.left;
                elmnt.style.zIndex = message.zIndex;
            }else{//it's alreasy on map
                document.getElementById(message.pieceId).style.top = message.top;
                document.getElementById(message.pieceId).style.left = message.left;
                document.getElementById(message.pieceId).style.zIndex = message.zIndex;
            }
            if(message.messageType == 'TEXT'){
                document.getElementById(message.pieceId).childNodes[3].childNodes[1].value = message.text;
            }
        }else if (message.messageType == "LIGHT"){
            if(message.light == "on"){
                document.getElementById(message.pieceId).style.filter = "brightness(2.0)";
            }else{
                document.getElementById(message.pieceId).style.filter = "brightness(1.0)";
            }
        }else if (message.messageType == "ROLL"){
            runRoll(document.getElementById(message.pieceId), message.num);
        }
    }
    socketInitialized = true;
}

function sendDiceRoll(id, roll){
    if(socketInitialized){
        let message;
        message = {
            messageType: 'ROLL',
            pieceId: id,
            num: roll
        };
        webSocket.send(JSON.stringify(message));
    }
}

function sendLightOn(elmnt){
    if(socketInitialized){
        let message;
        message = {
            messageType: 'LIGHT',
            pieceId: elmnt.getAttribute("id"),
            light: "on"
        };
        webSocket.send(JSON.stringify(message));
    }
}

function sendLightOff(elmnt){
    if(socketInitialized){
        let message;
        message = {
            messageType: 'LIGHT',
            pieceId: elmnt.getAttribute("id"),
            light: "off"
        };
        webSocket.send(JSON.stringify(message));
    }
}

function sendSocketUpdate(elmnt){
    if(socketInitialized){
        let message;
        if(elmnt.getAttribute("pieceType") == "tile"){
            message = { 
                messageType: 'MOVE',
                pieceId: elmnt.getAttribute("id"),
                top: elmnt.style.top,
                left: elmnt.style.left,
                zIndex: elmnt.style.zIndex,
                onMap: elmnt.getAttribute("onMap")
            };
        }else if(elmnt.getAttribute("pieceType") == "text"){
            message = { 
                messageType: 'TEXT',
                pieceId: elmnt.getAttribute("id"),
                top: elmnt.style.top,
                left: elmnt.style.left,
                zIndex: elmnt.style.zIndex,
                text: elmnt.childNodes[3].childNodes[1].value,
                onMap: elmnt.getAttribute("onMap")
            };
        }
        webSocket.send(JSON.stringify(message));
    }
}

function bootstrap_page() {
   
    //scale = getComputedStyle(document.documentElement).getPropertyValue('--scale');
    applyUiZoom();

    var pieces = document.querySelectorAll("[pieceType='tile']");
    pieces.forEach(element => {
        startapImage(element);
    });
    var pieces = document.querySelectorAll("[pieceType='ghost']");
    pieces.forEach(element => {
        startapImage(element);
    });
    setTimeout(() => {
            //loadAndArrange decide the position of each tile in his bar
    this.loadAndArrangeTiles("baseSetOutside");
    this.loadAndArrangeTiles("baseSetInside");
    this.loadAndArrangeTiles("baseSetMiscellaneous");
    this.loadAndArrangeTiles("shadowOfNerekhallOutside");
    this.loadAndArrangeTiles("shadowOfNerekhallInside");
    this.loadAndArrangeTiles("shadowOfNerekhallMiscellaneous");
    this.loadAndArrangeTiles("labyrinthOfRuinOutside");
    this.loadAndArrangeTiles("labyrinthOfRuinInside");
    this.loadAndArrangeTiles("lairOfTheWyrmOutside");
    this.loadAndArrangeTiles("lairOfTheWyrmInside");
    this.loadAndArrangeTiles("trollfensOutside");
    this.loadAndArrangeTiles("trollfensInside");
    this.loadAndArrangeTiles("tokens");
    this.loadAndArrangeTiles("monsters");
    this.loadAndArrangeTiles("lieutenants");
    this.loadAndArrangeTiles("miscellaneous");

    window.addEventListener("resize", rearrangeAllTiles);//we want to rearrange all tiles on zoom change
    window.addEventListener("resize", trickForCorrectGoogleChromeResizeBug);

    multiDragOnMapSelect(document.getElementById('map'))
    //used for restoring save point
    var piecesOnMap = [].slice.call(document.getElementById("map").children);
    piecesOnMap.forEach(element => {
        if (element.getAttribute("pieceType") == "tile" || element.getAttribute("pieceType") == "text") {
            dragElement(element);
        }
    });
    initCanvasDragShower(document.getElementById('canvasDragShower'));

    document.getElementById("control_bar").childNodes.forEach(element => {
            $(element).on('click', function() {
                document.getElementById("control_bar").childNodes.forEach(allElements => {
                    $(allElements).removeClass('clicked');
                    
                });
                $(element).toggleClass('clicked');
            });
    });
    $('#baseLoadButton').click();
    document.getElementById("output").style.backgroundImage = getSmokyBackground();
    document.getElementById("loadingOverlay").style.display = "none";
    document.getElementById("application").style.visibility = "";
    }, 200);
    
    /*
    document.getElementById("canvasDragShower").width = window.innerWidth;
    document.getElementById("canvasDragShower").height = window.innerHeight;
    */
}


function rearrangeAllTiles(){
    this.rearrangeTilesAfterResize("baseSetOutside")
    this.rearrangeTilesAfterResize("baseSetInside")
    this.rearrangeTilesAfterResize("baseSetMiscellaneous");
    this.rearrangeTilesAfterResize("shadowOfNerekhallOutside");
    this.rearrangeTilesAfterResize("shadowOfNerekhallInside");
    this.rearrangeTilesAfterResize("shadowOfNerekhallMiscellaneous");
    this.rearrangeTilesAfterResize("labyrinthOfRuinOutside");
    this.rearrangeTilesAfterResize("labyrinthOfRuinInside");
    this.rearrangeTilesAfterResize("lairOfTheWyrmOutside");
    this.rearrangeTilesAfterResize("lairOfTheWyrmInside");
    this.rearrangeTilesAfterResize("trollfensOutside");
    this.rearrangeTilesAfterResize("trollfensInside");
    this.rearrangeTilesAfterResize("tokens");
    this.rearrangeTilesAfterResize("monsters");
    this.rearrangeTilesAfterResize("lieutenants");
    this.rearrangeTilesAfterResize("miscellaneous");
}

function trickForCorrectGoogleChromeResizeBug(){
    document.getElementById("placeholder").style.left = "5000px"
    setTimeout(() => {
        document.getElementById("placeholder").style.left = "0px"
    }, 20);
}