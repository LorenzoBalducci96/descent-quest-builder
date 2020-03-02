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
    this.loadAndArrangeTiles("lairOfTheWyrmOutside");
    this.loadAndArrangeTiles("lairOfTheWyrmInside");
    this.loadAndArrangeTiles("trollfensOutside");
    this.loadAndArrangeTiles("trollfensInside");
    
    this.loadAndArrangeTiles("tokens");
    this.loadAndArrangeTiles("monsters");

    this.loadAndArrangeTiles("textAreas");

    window.addEventListener("resize", rearrangeAllTiles);//we want to rearrange all tiles on zoom change
    

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

    $('#startButton').click();

    /*
    document.getElementById("canvasDragShower").width = window.innerWidth;
    document.getElementById("canvasDragShower").height = window.innerHeight;
    */
    

}

window.onload = function () {
    this.bootstrap_page();
};

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

    this.rearrangeTilesAfterResize("textAreas");
}