function bootstrap_page() {
    //loadAndArrange decide the position of each tile in his bar

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

    multiDragOnMapSelect(document.getElementById('map'))
    //used for restoring save point
    var piecesOnMap = [].slice.call(document.getElementById("map").children);
    piecesOnMap.forEach(element => {
        if (element.getAttribute("pieceType") == "tile" || element.getAttribute("pieceType") == "text") {
            dragElement(element);
        }
    });
    initCanvasDragShower(document.getElementById('canvasDragShower'));

}

window.onload = function () {
    this.bootstrap_page();
};
