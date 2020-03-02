var tiles = [];
var offsetTopTiles = [];
var count = 0;

var start_x;
var start_y;
var end_x;
var end_y;
var topX;
var topY;
var bottomX;
var bottomY;
var selectedPieces = [];

var canvas;
var ctx;
var rect;
var drag;

var margin_of_tiles_on_sidenav = 2

var cntrlIsPressed = false;

function adjustCanvasScroll() {
    document.getElementById("canvasContainer").scrollTop =
        document.getElementById("map").scrollTop;

    document.getElementById("canvasContainer").scrollLeft =
        document.getElementById("map").scrollLeft;
}

function initCanvasDragShower(elmnt) {
    canvas = elmnt
    ctx = canvas.getContext('2d');
    ctx.strokeStyle = 'rgba(255, 0, 0, 2)';
    ctx.lineWidth = '10';
    rect = {};
    drag = false;

    $(document).keydown(function (event) {
        if (event.which == "17")
            cntrlIsPressed = true;
    });

    $(document).keyup(function () {
        cntrlIsPressed = false;
    });
}
/**handles the square selector drawing */
function mouseDownCanvas(e) {
    rect.startX = e.pageX + document.getElementById("canvasContainer").scrollLeft - document.getElementById("map").offsetLeft;
    rect.startY = e.pageY + document.getElementById("canvasContainer").scrollTop - document.getElementById("map").offsetTop;
    drag = true;
}
function mouseUpCanvas() {
    drag = false;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
}
function mouseMoveCanvas(e) {
    if (drag) {
        rect.w = (e.pageX + document.getElementById("canvasContainer").scrollLeft) - document.getElementById("map").offsetLeft - rect.startX;
        rect.h = (e.pageY + document.getElementById("canvasContainer").scrollTop - document.getElementById("map").offsetTop) - rect.startY;
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        draw();
    }
}
function draw() {
    ctx.setLineDash([6]);
    ctx.strokeRect(rect.startX, rect.startY, rect.w, rect.h);
}
/**end of handlers for the square selector drawing */


/**handles the multiple elements selecting with drag*/
function multiDragOnMapSelect(map) {
    map.onmousedown = startSelect;

    function makeDrag(e) {
        mouseMoveCanvas(e)//callback on the canvas for drawing the rectangle
        selectPiecesOnDrag(e)
    }
    function startSelect(e) {
        if (document.elementFromPoint(e.clientX, e.clientY).id == "map") {
            mouseDownCanvas(e);//callback on the canvas for start drawing the rectangle
            map.onmousemove = makeDrag;
            deselectAllPieces();
            start_x = e.clientX + document.getElementById("map").scrollLeft - document.getElementById("map").offsetLeft;
            start_y = e.clientY + document.getElementById("map").scrollTop - document.getElementById("map").offsetTop;
            //start_x = e.clientX;
            //start_y = e.clientY ;
            document.onmouseup = endSelect;
        }
    }
    function selectPiecesOnDrag(e) {
        end_x = e.clientX + document.getElementById("map").scrollLeft - document.getElementById("map").offsetLeft;
        end_y = e.clientY + document.getElementById("map").scrollTop - document.getElementById("map").offsetTop;
        //switch to top bottom
        adjustTopBottom();

        deselectAllPieces();
        var pieces = [].slice.call(map.children);//get all the elements on the map
        pieces.forEach(piece => {
            if (piece.offsetTop + (piece.offsetHeight / 2) > topY &&
                piece.offsetTop + (piece.offsetHeight / 2) < bottomY &&
                piece.offsetLeft + (piece.offsetWidth / 2) > topX &&
                piece.offsetLeft + (piece.offsetWidth / 2) < bottomX) {
                selectPiece(piece);
            }
        });
        //selectPieces();
    }
    function endSelect(e) {
        map.onmousemove = null;
        mouseUpCanvas(e);//remove the rectangle of seelcting from the canvas
        document.onmouseup = null;
        selectPiecesOnDrag(e);
    }
    function adjustTopBottom() {
        if (start_x < end_x) {
            topX = start_x;
            bottomX = end_x;
        } else {
            topX = end_x;
            bottomX = start_x;
        }
        if (start_y < end_y) {
            topY = start_y;
            bottomY = end_y;
        } else {
            topY = end_y;
            bottomY = start_y;
        }
    }
}
/**handles the multiple elements selecting with drag*/

/**functions for handling selections of pieces and adjusting the graphics*/
function selectPiece(piece) {
    if (!selectedPieces.includes(piece)) {
        piece.style.filter = "brightness(2.0)";
        selectedPieces.push(piece);
    }
}
function deselectPiece(piece) {
    piece.style.filter = "brightness(1.0)";
    var pieceIndex = selectedPieces.indexOf(piece);
    selectedPieces.splice(pieceIndex, 1);
}
function selectPieces() {
    selectedPieces.forEach(piece => {
        piece.style.filter = "brightness(2.0)";
    });
}
function deselectAllPieces() {
    selectedPieces.forEach(piece => {
        piece.style.filter = "brightness(1.0)";
    });
    selectedPieces = [];
}
/**end of functions for handling selections of pieces and adjusting the graphics*/


/**arranging of tiles at startup */
function resetTiles() {
    tiles = [];
    offsetTopTiles = [];
    count = 0;
}

function loadAndArrangeTiles(blockId) {
    if (!(document.getElementById(blockId).style.visibility == "hidden")) {
        activeSet = blockId;
    }
    resetTiles();
    var pieces = [].slice.call(document.getElementById(blockId).children);//get all the elements on the map
    pieces.forEach(element => {
        if (element.getAttribute("pieceType") == "tile" || element.getAttribute("pieceType") == "text") {
            dragElement(element);
        }
    });
    arrangeTiles(blockId);
}

function sortByTop() {
    return function (a, b) {
        var filter_a = parseInt(a.offsetTop);
        var filter_b = parseInt(b.offsetTop);
        return filter_a < filter_b
            ? -1
            : (filter_a > filter_b ? 1 : 0);
    }
}

function filterTiles() {
    return function (a) {
        return (a.getAttribute("pieceType") == "tile" || a.getAttribute("pieceType") == "text")
    }
}

function filterPlaceholders() {
    return function (a) {
        return (a.getAttribute("pieceType") == "ghost")
    }
}

function countOccurences(string, word) {
    return string.split(word).length - 1;
 }

function rearrangeTilesAfterResize(blockId) {
    let placeholders = [].slice.call(document.getElementById(blockId).children).filter(
        filterPlaceholders()).sort(sortByTop());//get all the elements on the map
    let tiles = [].slice.call(document.getElementById(blockId).children).filter(filterTiles());
    
    let count = 0;

    for (count = 0; count < placeholders.length; count++) {
        if (count == 0) {
            placeholders[count].style.top = margin_of_tiles_on_sidenav + "px";
        } else {
            placeholders[count].style.top = (placeholders[count - 1].offsetTop + placeholders[count - 1].offsetHeight + margin_of_tiles_on_sidenav) + "px"
        }
    }

    tiles.forEach(elmnt => {
        if (elmnt.getAttribute("single") == "yes") {//updating visibility of other side tiles
            let placeholderImage = document.getElementById("placeholder_" + elmnt.id);
            elmnt.style.top = placeholderImage.offsetTop + "px";
            elmnt.style.left = placeholderImage.offsetLeft + "px";
            elmnt.style.width = "100%"//placeholderImage.offsetWidth + "px";
        } else {
            let placeholderImage = document.getElementById("placeholder_" + elmnt.id.substr(0, elmnt.id.lastIndexOf("_") + 1) + "1");
            elmnt.style.top = placeholderImage.offsetTop + "px";
            elmnt.style.left = placeholderImage.offsetLeft + "px";
            elmnt.style.width = "100%"//placeholderImage.offsetWidth + "px";
        }
    });
}


function arrangeTiles(blockId) {
    //arrange position
    offsetTopTiles[0] = margin_of_tiles_on_sidenav;

    var c = 1;
    for (c = 1; c < count; c++) {
        offsetTopTiles[c] = offsetTopTiles[c - 1] + document.getElementById(tiles[c - 1]).offsetHeight + margin_of_tiles_on_sidenav;
    }
    for (c = 0; c < count; c++) {
        //put the tile
        //now put the background placeholder
        if (document.getElementById("placeholder_" + document.getElementById(tiles[c]).getAttribute("id")) == null) {
            let toPut = true;
            if (document.getElementById(tiles[c]).getAttribute("single") == "no") {
                if (document.getElementById("placeholder_" + document.getElementById(tiles[c]).id.substr(0,
                    document.getElementById(tiles[c]).id.lastIndexOf("_") + 1) + "1") != null)
                    toPut = false;
            }

            if (toPut) {

                let placeholderImage = document.createElement("img");
                placeholderImage.setAttribute("pieceType", "ghost") ;
                placeholderImage.style.position = "absolute";
                placeholderImage.style.top = (offsetTopTiles[c]) + "px";
                placeholderImage.style.left = "0px";
                if (document.getElementById(tiles[c]).getAttribute("pieceType") == "text") {
                    placeholderImage.src = "assets/trasnparent.png"
                } else {
                    placeholderImage.src = document.getElementById(tiles[c]).getAttribute("src");
                }

                placeholderImage.id = "placeholder_" + document.getElementById(tiles[c]).getAttribute("id");

                placeholderImage.style.zIndex = "-2"
                placeholderImage.style.opacity = "0.4"
                placeholderImage.style.width = "100%"//document.getElementById(tiles[c]).offsetWidth + "px"
                placeholderImage.style.height = "auto"//document.getElementById(tiles[c]).offsetHeight + "px"
                document.getElementById(blockId).appendChild(placeholderImage);
                document.getElementById(tiles[c]).style.top = (offsetTopTiles[c]) + "px"
                document.getElementById(tiles[c]).style.left = "0px"
            }

        } else {
            document.getElementById(tiles[c]).style.top = document.getElementById(
                "placeholder_" + document.getElementById(tiles[c]).getAttribute("id")).style.top;
            document.getElementById(tiles[c]).style.left = "0px"
        }
    }
}
/**end of arranging of tiles functions for startup */


function triggerMouseEvent(node, e) {//retrigger the mouse click event, for tiles behing each other
    var clickEvent = document.createEvent('MouseEvents');
    clickEvent.initMouseEvent("mousedown", true, true, window, 0, 0, 0, e.clientX, e.clientY, false, false, false, false, 0, null);
    node.dispatchEvent(clickEvent);
}

function rotateElement(elmnt) {
    if (elmnt.getAttribute("orientation") == 0) {
        elmnt.src = elmnt.getAttribute("src").substr(0, elmnt.getAttribute("src").lastIndexOf('_')) + "_090.png";
        elmnt.setAttribute("orientation", "90")
    } else if (elmnt.getAttribute("orientation") == 90) {
        elmnt.src = elmnt.getAttribute("src").substr(0, elmnt.getAttribute("src").lastIndexOf('_')) + "_180.png";
        elmnt.setAttribute("orientation", "180")
    } else if (elmnt.getAttribute("orientation") == 180) {
        elmnt.src = elmnt.getAttribute("src").substr(0, elmnt.getAttribute("src").lastIndexOf('_')) + "_270.png";
        elmnt.setAttribute("orientation", "270")
    } else if (elmnt.getAttribute("orientation") == 270) {
        elmnt.src = elmnt.getAttribute("src").substr(0, elmnt.getAttribute("src").lastIndexOf('_')) + "_000.png";
        elmnt.setAttribute("orientation", "0")
    }
}

function snap(end_top, end_left, elmnt) {
    var end_top = parseInt(elmnt.style.top, 10)
    var end_left = parseInt(elmnt.style.left, 10)
    end_top = (Math.round(end_top / 72) * 72) - 21;
    end_left = (Math.round(end_left / 72) * 72) - 21;
    elmnt.style.top = end_top + "px";
    elmnt.style.left = end_left + "px";
}

function moveElement(oldPosX, oldPosY, clientX, clientY, elmnt) {
    elmnt.style.top = (elmnt.offsetTop - oldPosY) + "px";
    elmnt.style.left = (elmnt.offsetLeft - oldPosX) + "px";
    if (clientX < document.getElementById(activeSet).offsetWidth) {
        var oldLeft = elmnt.offsetLeft - document.getElementById("map").scrollLeft + document.getElementById("map").offsetLeft;
        var oldWidth = elmnt.offsetWidth;
        var oldTop = elmnt.offsetTop - document.getElementById("map").scrollTop + document.getElementById("map").offsetTop;
        var oldHeigth = elmnt.offsetHeight;

        document.getElementById(activeSet).appendChild(elmnt);
        elmnt.style.width = "100%";
        if (elmnt.getAttribute("onMap") == "yes") {
            elmnt.style.left = (clientX - (((clientX - oldLeft) * elmnt.offsetWidth) / oldWidth)) + "px";
            elmnt.style.top = (clientY - (((clientY - oldTop) * elmnt.offsetHeight) / oldHeigth) + (document.getElementById(activeSet).scrollTop) - document.getElementById(activeSet).offsetTop) + "px";
            elmnt.setAttribute("onMap", "no")
        }

    } else if (clientX > document.getElementById(activeSet).offsetWidth) {
        var oldLeft = elmnt.offsetLeft;
        var oldWidth = elmnt.offsetWidth;
        var oldTop = elmnt.offsetTop - document.getElementById(activeSet).scrollTop + document.getElementById(activeSet).offsetTop;
        var oldHeigth = elmnt.offsetHeight;

        document.getElementById("map").appendChild(elmnt);
        elmnt.style.width = 'auto';
        if (elmnt.getAttribute("onMap") == "no") {
            elmnt.style.left = (clientX - (((clientX - oldLeft) * elmnt.offsetWidth) / oldWidth) - document.getElementById("map").offsetLeft + document.getElementById("map").scrollLeft) + "px";
            elmnt.style.top = (clientY - (((clientY - oldTop) * elmnt.offsetHeight) / oldHeigth) - document.getElementById("map").offsetTop + document.getElementById("map").scrollTop) + "px";

            elmnt.setAttribute("onMap", "yes")
        }
    }
}

function endMoveElement(pieces, multipleElementsDragging) {
    pieces.forEach(elmnt => {
        var end_top = elmnt.style.offsetTop;
        var end_left = elmnt.style.offsetLeft;
        if (elmnt.getAttribute("onMap") == "no") {
            if (elmnt.getAttribute("single") == "yes") {//updating visibility of other side tiles
                var placeholderImage = document.getElementById("placeholder_" + elmnt.id);
                elmnt.setAttribute("onMap", "no");
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
                var placeholderImage = document.getElementById("placeholder_" + elmnt.id.substr(0, elmnt.id.lastIndexOf("_") + 1) + "1");
                elmnt.parentNode.removeChild(elmnt);
            }
        } else if (elmnt.getAttribute("onMap") == "yes") {

            if (elmnt.getAttribute("single") == "yes") {
                var tileFace = ""
                if (elmnt.id.charAt(elmnt.id.length - 1) == 'A') {
                    tileFace = 'B'
                } else if (elmnt.id.charAt(elmnt.id.length - 1) == 'B') {
                    tileFace = 'A'
                }
                var placeholderOtherSide = document.getElementById(elmnt.id.substring(0, elmnt.id.length - 1) + tileFace);
                if (placeholderOtherSide != null) {
                    placeholderOtherSide.style.visibility = "hidden";
                }
            }
            if (multipleElementsDragging == "yes" || elmnt.getAttribute("pieceType") == "tile") {
                snap(end_top, end_left, elmnt)
            }

            if (elmnt.getAttribute("single") == "yes")
                elmnt.style.zIndex = "-1";
            else
                elmnt.style.zIndex = "2";
        }
    });
    returnOnMap(pieces);
}

function dragElement(elmnt) {//setup the callbacks
    elmnt.setAttribute("orientation", "0");
    tiles[count] = elmnt.getAttribute("id");
    count++;

    elmnt.addEventListener('contextmenu', function (ev) {
        if (elmnt.getAttribute("pieceType") == "tile" && elmnt.getAttribute("onMap") == "yes" && selectedPieces.includes(elmnt)) {
            startRotateMultipleElements();
        } else {
            if (elmnt.getAttribute("pieceType") == "tile" && elmnt.getAttribute("onMap") == "yes") {
                rotateElement(elmnt)
            }
        }
    }, false);
    var pos1 = 0, pos2 = 0, pos3 = 0, pos4 = 0;
    elmnt.onmousedown = dragMouseDown;

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
        if (elmnt.getAttribute("onMap") == "yes") {
            if (elmnt.getAttribute("pieceType") == "tile") {

                let canvas = document.createElement("canvas");

                canvas.width = elmnt.offsetWidth;
                canvas.height = elmnt.offsetHeight;
                canvas.style.position = "absolute";
                canvas.style.top = 0 + "px";
                canvas.style.left = 0 + "px";
                canvas.getContext('2d').drawImage(elmnt, 0, 0);

                let x = e.clientX - elmnt.offsetLeft + document.getElementById("map").scrollLeft - document.getElementById("map").offsetLeft;
                let y = e.clientY - elmnt.offsetTop  + (document.getElementById("map").scrollTop) - document.getElementById("map").offsetTop;

                let point = canvas.getContext('2d').getImageData(x, y, 1, 1).data

                //if i clicked on the transparent area let's trigger click behind
                if (point[3] == 0) {
                    toDrag = false;
                    elmnt.style.zIndex = "-99"
                    let elementBehind = document.elementFromPoint(e.clientX, e.clientY);
                    if (elementBehind.style.zIndex != "-99") {
                        elementBehind.style.zIndex = "1";
                        triggerMouseEvent(elementBehind, e)
                    }
                    elmnt.style.zIndex = "-1"
                } else {//else check if we are moving multiple items
                    if (cntrlIsPressed) {
                        if (selectedPieces.includes(elmnt)) {
                            deselectPiece(elmnt)
                        } else {
                            selectPiece(elmnt)
                        }
                        return;
                    }
                    if (selectedPieces.includes(elmnt)) {
                        selectedPieces.forEach(element => {
                            startDragMultiElements(e);
                        });
                        return;
                    }
                    deselectAllPieces();//else deselect all pieces and go on with drag
                }
            } else {//this is done because we want to trigger drag if we click tiles on non transparent area
                //but we want to trigger always for non tiles elements
                if (selectedPieces.includes(elmnt)) {
                    selectedPieces.forEach(element => {
                        startDragMultiElements(e);
                    });
                    return;
                }
            }
        }

        if (toDrag) {
            document.onmousemove = elementDrag;
            document.onmouseup = closeDragElement;
        }
        if (e.clientX < document.getElementById(activeSet).offsetWidth) {
            if (elmnt.getAttribute("single") == "no") {
                var placeholderImage = document.getElementById("placeholder_" + elmnt.id.substr(0, elmnt.id.lastIndexOf("_") + 1) + "1");
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
        moveElement(pos1, pos2, pos3, pos4, elmnt);
    }

    function closeDragElement() {
        /* stop moving when mouse button is released:*/
        document.onmouseup = null;
        document.onmousemove = null;


        endMoveElement([elmnt], "no");
    }
}

function startRotateMultipleElements() {

    let i = 0;
    for (i = 0; i < selectedPieces.length; i++) {
        let newTop = (selectedPieces[0].offsetTop +
            (selectedPieces[i].offsetLeft - selectedPieces[0].offsetLeft)) + "px";

        let newLeft = (selectedPieces[0].offsetLeft +
            (selectedPieces[0].offsetTop + selectedPieces[0].offsetHeight -
                (selectedPieces[i].offsetTop + selectedPieces[i].offsetHeight))
        ) + "px";

        selectedPieces[i].style.top = newTop;
        selectedPieces[i].style.left = newLeft;
    }

    selectedPieces.forEach(elmnt => {
        rotateElement(elmnt)
    });

    returnOnMap(selectedPieces);
}

function returnOnMap(piecesToReadjust) {
    let translationRight = 0;
    let translationTop = 0;
    piecesToReadjust.forEach(elmnt => {
        if (elmnt.getAttribute("onMap") == "yes") {
            if ((elmnt.offsetLeft - document.getElementById(activeSet).offsetWidth + document.getElementById("map").offsetLeft) < translationRight) {
                translationRight = (elmnt.offsetLeft - document.getElementById(activeSet).offsetWidth + document.getElementById("map").offsetLeft);
            }
            if ((elmnt.offsetTop) < translationTop) {
                translationTop = (elmnt.offsetTop);
            }
        }
    });

    translationRight = Math.abs(translationRight)
    translationTop = Math.abs(translationTop)
    translationRight = (Math.round(translationRight / 72) * 72);
    translationTop = (Math.round(translationTop / 72) * 72);
    piecesToReadjust.forEach(elmnt => {
        elmnt.style.left = elmnt.offsetLeft + translationRight + "px"
        elmnt.style.top = elmnt.offsetTop + translationTop + "px"
    });
}


/**multiple elements dragging */
function startDragMultiElements(e) {
    if (e.which != 1) return false; //just listen to left click
    var pos1 = 0, pos2 = 0, pos3 = 0, pos4 = 0;
    pos3 = e.clientX;
    pos4 = e.clientY;

    selectedPieces.forEach(piece => {
        document.onmousemove = multipleElementDrag;
        document.onmouseup = multipleElementCloseDragElement;
    });

    function multipleElementDrag(e) {
        e = e || window.event;
        e.preventDefault();
        // calculate the new cursor position:
        pos1 = pos3 - e.clientX;
        pos2 = pos4 - e.clientY;
        pos3 = e.clientX;
        pos4 = e.clientY;

        selectedPieces.forEach(elmnt => {
            moveElement(pos1, pos2, pos3, pos4, elmnt);
        });
    }

    function multipleElementCloseDragElement(e) {

        document.onmouseup = null;
        document.onmousemove = null;
        endMoveElement(selectedPieces, "yes");
        if (e.clientX < document.getElementById(activeSet).offsetWidth) {
            deselectAllPieces();
        }

    }
}