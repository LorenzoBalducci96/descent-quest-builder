var completedImages = 0;

function bootstrap_page() {
    
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