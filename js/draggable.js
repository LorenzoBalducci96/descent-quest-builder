var tiles = [];
var offsetTopTiles = [];
var count = 0;

window.onload = function () {
    this.loadAndArrangeTiles();
};

function loadAndArrangeTiles(){
    resetTiles();
    var pieces = [].slice.call(document.getElementById("sidenav").children);//get all the elements on the map
    pieces.forEach(element => {
        if (element.getAttribute("pieceType") != "placeholder") {
            dragElement(element);
        }
    });
    arrangeTiles();
}

function resetTiles(){
    tiles = [];
    offsetTopTiles = [];
    count = 0;
}

function arrangeTiles() {
    //resize
    /*
    for(c = 0; c < count; c++){
        document.getElementById(tiles[c]).style.width = (document.getElementById(tiles[c]).offsetWidth / 2) + "px"
    }
    */

    //arrange position
    offsetTopTiles[0] = 20;
    
    var c = 1;
    for (c = 1; c < count; c++) {

        offsetTopTiles[c] = offsetTopTiles[c - 1] + document.getElementById(tiles[c - 1]).offsetHeight + 20;
    }
    for (c = 0; c < count; c++) {
        document.getElementById(tiles[c]).style.top = (offsetTopTiles[c]) + "px"
    }
}

function triggerMouseEvent(node, e) {
    var clickEvent = document.createEvent('MouseEvents');
    clickEvent.initMouseEvent("mousedown", true, true, window, 0, 0, 0, e.clientX, e.clientY, false, false, false, false, 0, null);
    node.dispatchEvent(clickEvent);
}

function dragElement(elmnt) {
    elmnt.setAttribute("orientation", "0");
    tiles[count] = elmnt.getAttribute("id");
    count++;

    elmnt.addEventListener('contextmenu', function (ev) {
        if (elmnt.getAttribute("pieceType") == "tile") {
            if (elmnt.getAttribute("orientation") == 0) {
                elmnt.src = elmnt.src.substr(0, elmnt.src.indexOf('.')) + "90.png";
                elmnt.setAttribute("orientation", "90")
            } else if (elmnt.getAttribute("orientation") == 90) {
                elmnt.src = elmnt.src.substr(0, elmnt.src.indexOf('.') - 2) + "180.png";

                elmnt.setAttribute("orientation", "180")
            } else if (elmnt.getAttribute("orientation") == 180) {
                elmnt.src = elmnt.src.substr(0, elmnt.src.indexOf('.') - 3) + "270.png";

                elmnt.setAttribute("orientation", "270")
            } else if (elmnt.getAttribute("orientation") == 270) {
                elmnt.src = elmnt.src.substr(0, elmnt.src.indexOf('.') - 3) + ".png";

                elmnt.setAttribute("orientation", "0")
            }
        }
    }, false);

    
    var pos1 = 0, pos2 = 0, pos3 = 0, pos4 = 0;
    elmnt.onmousedown = dragMouseDown;
    /*
    if (document.getElementById(elmnt.id + "header")) {
        //if present, the header is where you move the DIV from:
        document.getElementById(elmnt.id + "header").onmousedown = dragMouseDown;
    } else {
        // otherwise, move the DIV from anywhere inside the DIV:
        elmnt.onmousedown = dragMouseDown;
    }
    */
    
    function dragMouseDown(e) {
        if(document.elementFromPoint(e.clientX, e.clientY).getAttribute("pieceType") == "text"){
            if(document.elementFromPoint(e.clientX, e.clientY).getAttribute("draggable_trigger") == "false"){
                return;
            }
        }
        elmnt.style.zIndex = "1";
        e = e || window.event;
        e.preventDefault();
        // get the mouse cursor position at startup:
        pos3 = e.clientX;
        pos4 = e.clientY;

        var toDrag = true;
        if (elmnt.getAttribute("onMap") == "yes" && elmnt.getAttribute("pieceType") == "tile") {
            //var canvas = document.getElementById("canvas");
            var canvas = document.createElement("canvas");
            canvas.width = elmnt.offsetWidth;
            canvas.height = elmnt.offsetHeight;
            //canvas.style = "border: 40px solid red;";
            canvas.style.position = "absolute";
            canvas.style.top = 0 + "px";
            canvas.style.left = 0 + "px";
            canvas.getContext('2d').drawImage(elmnt, 0, 0);
            /*
            if(elmnt.getAttribute("orientation") == "90"){
                canvas.style.transform = 'rotate(90deg)';
            }
            */
            var point = canvas.getContext('2d').getImageData(e.clientX - elmnt.offsetLeft, e.clientY + (document.getElementById("map").scrollTop) - elmnt.offsetTop, 1, 1).data
            if (point[3] == 0) {
                toDrag = false;
                elmnt.style.zIndex = "-99"
                var elementBehind = document.elementFromPoint(e.clientX, e.clientY);
                elementBehind.style.zIndex = "1";
                elmnt.style.zIndex = "-1"
                triggerMouseEvent(elementBehind, e)
            }
        }

        if (toDrag) {
            document.onmouseup = closeDragElement;
            document.onmousemove = elementDrag;
        }
    }

    function elementDrag(e) {
        e = e || window.event;
        e.preventDefault();
        // calculate the new cursor position:
        pos1 = pos3 - e.clientX;
        pos2 = pos4 - e.clientY;
        pos3 = e.clientX;
        pos4 = e.clientY;
        // set the element's new position:
        //elmnt.style.top = ((elmnt.offsetTop - pos2)) + "px"

        elmnt.style.top = (elmnt.offsetTop - pos2) + "px";
        elmnt.style.left = (elmnt.offsetLeft - pos1) + "px";
        if (e.clientX < document.getElementById("sidenav").offsetWidth) {
            var oldLeft = elmnt.offsetLeft;
            var oldWidth = elmnt.offsetWidth;
            var oldTop = elmnt.offsetTop - document.getElementById("map").scrollTop;
            var oldHeigth = elmnt.offsetHeight;

            document.getElementById("sidenav").appendChild(elmnt);
            //TODO
            //elmnt.style.width = 'auto';
            //elmnt.style.width = (elmnt.offsetWidth/2) + "px"
            elmnt.style.width = "100%";
            if (elmnt.getAttribute("onMap") == "yes") {
                elmnt.style.left = (e.clientX - (((e.clientX - oldLeft) * elmnt.offsetWidth) / oldWidth)) + "px";
                elmnt.style.top = (e.clientY - (((e.clientY - oldTop) * elmnt.offsetHeight) / oldHeigth) + (document.getElementById("sidenav").scrollTop) - document.getElementById("sidenav").offsetTop) + "px";
                elmnt.setAttribute("onMap", "no")
            }

        } else if (e.clientX > document.getElementById("sidenav").offsetWidth) {
            var oldLeft = elmnt.offsetLeft;
            var oldWidth = elmnt.offsetWidth;
            var oldTop = elmnt.offsetTop - document.getElementById("sidenav").scrollTop + document.getElementById("sidenav").offsetTop;
            var oldHeigth = elmnt.offsetHeight;

            document.getElementById("map").appendChild(elmnt);
            elmnt.style.width = 'auto';
            if (elmnt.getAttribute("onMap") == "no") {
                elmnt.style.left = (e.clientX - (((e.clientX - oldLeft) * elmnt.offsetWidth) / oldWidth)) + "px";
                elmnt.style.top = (e.clientY - (((e.clientY - oldTop) * elmnt.offsetHeight) / oldHeigth) + document.getElementById("map").scrollTop) + "px";

                elmnt.setAttribute("onMap", "yes")
            }
        }
    }

    function closeDragElement() {
        /* stop moving when mouse button is released:*/
        document.onmouseup = null;
        document.onmousemove = null;
        var end_top = elmnt.style.offsetTop;
        var end_left = elmnt.style.offsetLeft;
        if (elmnt.getAttribute("onMap") == "yes") {
            if (elmnt.getAttribute("pieceType") == "tile") { //if it's a tile it must "snap"
                var end_top = parseInt(elmnt.style.top, 10)
                var end_left = parseInt(elmnt.style.left, 10)
                end_top = (Math.round(end_top / 72) * 72) - 21;
                end_left = (Math.round(end_left / 72) * 72) - 21;
            }//otherwise no snap
        } else {//everything on the sidebar must "snap" to centered position
            end_top = parseInt(elmnt.style.top, 10)
            end_top = (Math.round(end_top / 32) * 32);
            end_left = 0;
        }

        elmnt.style.top = end_top + "px";
        elmnt.style.left = end_left + "px";
        elmnt.style.zIndex = "-1";
    }
}