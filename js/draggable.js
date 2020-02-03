var tiles = [];
var offsetTopTiles = [];
var count = 0;

window.onload = function () {
    //loadAndArrange decide the position of each tile in his bar
    //we must put that bar in the rendered sidebar beause otherwise we don't have the width of the tiles
    //we have to reboud the dragElement for each bar changed because otherwise we lost the 
    
    this.loadAndArrangeTiles("baseSetOutside");
    this.loadAndArrangeTiles("baseSetInside");
    this.loadAndArrangeTiles("baseSetMiscellaneous");

    this.loadAndArrangeTiles("shadowOfNerekhallOutside");
    this.loadAndArrangeTiles("shadowOfNerekhallInside");
    this.loadAndArrangeTiles("shadowOfNerekhallMiscellaneous");

    this.loadAndArrangeTiles("labyrinthOfRuinOutside");
    this.loadAndArrangeTiles("labyrinthOfRuinInside");
    this.loadAndArrangeTiles("tokens");

    this.loadAndArrangeTiles("textAreas");
    
    //used for restoring save point
    var piecesOnMap = [].slice.call(document.getElementById("map").children);
    piecesOnMap.forEach(element => {
        if (element.getAttribute("pieceType") == "tile" || element.getAttribute("pieceType") == "text") {
            dragElement(element);
        }
    });
};


function resetTiles() {
    tiles = [];
    offsetTopTiles = [];
    count = 0;
}

function loadAndArrangeTiles(blockId) {
    resetTiles();
    var pieces = [].slice.call(document.getElementById(blockId).children);//get all the elements on the map
    pieces.forEach(element => {
        if (element.getAttribute("pieceType") == "tile" || element.getAttribute("pieceType") == "text") {
            dragElement(element);
        }
    });
    arrangeTiles(blockId);
}

function arrangeTiles(blockId) {
    //arrange position
    offsetTopTiles[0] = 20;

    var c = 1;
    for (c = 1; c < count; c++) {

        offsetTopTiles[c] = offsetTopTiles[c - 1] + document.getElementById(tiles[c - 1]).offsetHeight + 20;
    }
    for (c = 0; c < count; c++) {
        //put the tile
        //now put the background placeholder
        if(document.getElementById("placeholder_" + document.getElementById(tiles[c]).getAttribute("id")) == null){
            var placeholderImage = document.createElement("img");
            placeholderImage.style.position = "absolute";
            placeholderImage.style.top = (offsetTopTiles[c]) + "px";
            placeholderImage.style.left = "0px";
            placeholderImage.src = document.getElementById(tiles[c]).src
    
            placeholderImage.id = "placeholder_" + document.getElementById(tiles[c]).getAttribute("id");
    
            placeholderImage.style.zIndex = "-2"
            placeholderImage.style.opacity = "0.4"
            placeholderImage.style.width = document.getElementById(tiles[c]).offsetWidth + "px"
            placeholderImage.style.height = document.getElementById(tiles[c]).offsetHeight + "px"
            document.getElementById(blockId).appendChild(placeholderImage);
            document.getElementById(tiles[c]).style.top = (offsetTopTiles[c]) + "px"
            document.getElementById(tiles[c]).style.left = "0px"
        }else{

        }
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
        if (elmnt.getAttribute("pieceType") == "tile" && elmnt.getAttribute("onMap") == "yes") {
            if (elmnt.getAttribute("orientation") == 0) {
                elmnt.src = elmnt.src.substr(0, elmnt.src.lastIndexOf('.')) + "90.png";
                elmnt.setAttribute("orientation", "90")
            } else if (elmnt.getAttribute("orientation") == 90) {
                elmnt.src = elmnt.src.substr(0, elmnt.src.lastIndexOf('.') - 2) + "180.png";

                elmnt.setAttribute("orientation", "180")
            } else if (elmnt.getAttribute("orientation") == 180) {
                elmnt.src = elmnt.src.substr(0, elmnt.src.lastIndexOf('.') - 3) + "270.png";

                elmnt.setAttribute("orientation", "270")
            } else if (elmnt.getAttribute("orientation") == 270) {
                elmnt.src = elmnt.src.substr(0, elmnt.src.lastIndexOf('.') - 3) + ".png";

                elmnt.setAttribute("orientation", "0")
            }
        }
    }, false);


    var pos1 = 0, pos2 = 0, pos3 = 0, pos4 = 0;
    elmnt.onmousedown = dragMouseDown;

    //pieceType = text --> no snap
    //pieceType = tile --> snap

    function dragMouseDown(e) {
        if (document.elementFromPoint(e.clientX, e.clientY).getAttribute("pieceType") == "text") {
            if (document.elementFromPoint(e.clientX, e.clientY).getAttribute("draggable_trigger") == "false") {
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
            var canvas = document.createElement("canvas");
            canvas.width = elmnt.offsetWidth;
            canvas.height = elmnt.offsetHeight;
            canvas.style.position = "absolute";
            canvas.style.top = 0 + "px";
            canvas.style.left = 0 + "px";
            canvas.getContext('2d').drawImage(elmnt, 0, 0);

            var point = canvas.getContext('2d').getImageData(e.clientX - elmnt.offsetLeft + document.getElementById("map").scrollLeft, e.clientY + (document.getElementById("map").scrollTop) - elmnt.offsetTop, 1, 1).data
            if (point[3] == 0) {
                toDrag = false;
                elmnt.style.zIndex = "-99"
                var elementBehind = document.elementFromPoint(e.clientX, e.clientY);
                elementBehind.style.zIndex = "1";
                triggerMouseEvent(elementBehind, e)
                elmnt.style.zIndex = "-1"
            }
        }

        if (toDrag) {
            document.onmousemove = elementDrag;
            document.onmouseup = closeDragElement;
        }

        if(elmnt.getAttribute("single") == "no"){
            var placeholderImage = document.getElementById("placeholder_" + elmnt.id.substr(0, elmnt.id.lastIndexOf("_") + 1) + "1");
            var backup = elmnt.cloneNode(true);
            document.getElementById(elmnt.getAttribute("set")).appendChild(backup);
            backup.style.top = placeholderImage.offsetTop + "px";
            backup.style.left = placeholderImage.offsetLeft + "px";
            backup.style.width = placeholderImage.offsetWidth + "px";
            backup.src = placeholderImage.src;
            backup.style.zIndex = "0";
            backup.id = elmnt.id.substr(0, elmnt.id.lastIndexOf("_") + 1) + (parseInt(elmnt.id.match(/(\d+)$/)[0], 10) + 1);
            backup.setAttribute("onMap", "no");
            dragElement(backup);
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
        if (e.clientX < document.getElementById(activeSet).offsetWidth) {
            var oldLeft = elmnt.offsetLeft - document.getElementById("map").scrollLeft;
            var oldWidth = elmnt.offsetWidth;
            var oldTop = elmnt.offsetTop - document.getElementById("map").scrollTop;
            var oldHeigth = elmnt.offsetHeight;

            document.getElementById(activeSet).appendChild(elmnt);
            //TODO
            //elmnt.style.width = 'auto';
            //elmnt.style.width = (elmnt.offsetWidth/2) + "px"
            elmnt.style.width = "100%";
            if (elmnt.getAttribute("onMap") == "yes") {
                elmnt.style.left = (e.clientX - (((e.clientX - oldLeft) * elmnt.offsetWidth) / oldWidth)) + "px";
                elmnt.style.top = (e.clientY - (((e.clientY - oldTop) * elmnt.offsetHeight) / oldHeigth) + (document.getElementById(activeSet).scrollTop) - document.getElementById(activeSet).offsetTop) + "px";
                elmnt.setAttribute("onMap", "no")
            }

        } else if (e.clientX > document.getElementById(activeSet).offsetWidth) {
            var oldLeft = elmnt.offsetLeft;
            var oldWidth = elmnt.offsetWidth;
            var oldTop = elmnt.offsetTop - document.getElementById(activeSet).scrollTop + document.getElementById(activeSet).offsetTop;
            var oldHeigth = elmnt.offsetHeight;

            document.getElementById("map").appendChild(elmnt);
            elmnt.style.width = 'auto';
            if (elmnt.getAttribute("onMap") == "no") {
                elmnt.style.left = (e.clientX - (((e.clientX - oldLeft) * elmnt.offsetWidth) / oldWidth) + document.getElementById("map").scrollLeft) + "px";
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

        if (elmnt.getAttribute("onMap") == "no") {
            if(elmnt.getAttribute("single") == "yes"){//updating visibility of other side tiles
                var placeholderImage = document.getElementById("placeholder_" + elmnt.id);
                elmnt.setAttribute("onMap", "no");
                elmnt.src = placeholderImage.src;
                document.getElementById(elmnt.getAttribute("set")).appendChild(elmnt);
                elmnt.style.top = placeholderImage.offsetTop + "px";
                elmnt.style.left = placeholderImage.offsetLeft + "px";
                elmnt.style.width = placeholderImage.offsetWidth + "px";

                var tileFace = ""
                if (elmnt.id.charAt(elmnt.id.length - 1) == 'A') {
                    tileFace = 'B'
                } else if (elmnt.id.charAt(elmnt.id.length - 1) == 'B') {
                    tileFace = 'A'
                }
                var placeholderOtherSide = document.getElementById(elmnt.id.substring(0, elmnt.id.length - 1) + tileFace);
                placeholderOtherSide.style.visibility = "";
            }else{
                var placeholderImage = document.getElementById("placeholder_" + elmnt.id.substr(0, elmnt.id.lastIndexOf("_") + 1) + "1");
                elmnt.parentNode.removeChild(elmnt);
            }
        } else if (elmnt.getAttribute("onMap") == "yes"){
            if(elmnt.getAttribute("single") == "yes"){
                var tileFace = ""
                if (elmnt.id.charAt(elmnt.id.length - 1) == 'A') {
                    tileFace = 'B'
                } else if (elmnt.id.charAt(elmnt.id.length - 1) == 'B') {
                    tileFace = 'A'
                }
                var placeholderOtherSide = document.getElementById(elmnt.id.substring(0, elmnt.id.length - 1) + tileFace);
                if (placeholderOtherSide != null)
                    placeholderOtherSide.style.visibility = "hidden";

            }

            if (elmnt.getAttribute("pieceType") == "tile") { //if it's a tile it must "snap"
                    var end_top = parseInt(elmnt.style.top, 10)
                    var end_left = parseInt(elmnt.style.left, 10)
                    end_top = (Math.round(end_top / 72) * 72) - 21;
                    end_left = (Math.round(end_left / 72) * 72) - 21;
            }//otherwise no snap

            elmnt.style.top = end_top + "px";
            elmnt.style.left = end_left + "px";
            if(elmnt.getAttribute("single") == "yes")
                elmnt.style.zIndex = "-1";
            else
                elmnt.style.zIndex = "2";
        }
    }
}