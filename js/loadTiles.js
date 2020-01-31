var activeSet = "baseSetOutside"
var activeArea = "outside";

function LoadShadowOfNerekhall() {
    backupToInvisibleDiv();
    document.getElementById("sidenav").innerHTML = document.getElementById("shadowOfNerekhallElements").innerHTML;
    activeSet = "shadowOfNerekhallElements";
    loadAndArrangeTiles();
}

function LoadLabyrinthOfRuin() {
    backupToInvisibleDiv();
    document.getElementById("sidenav").innerHTML = document.getElementById("labyrinthOfRuinElements").innerHTML;
    activeSet = "labyrinthOfRuinElements";
    loadAndArrangeTiles();
}

function backupToInvisibleDiv() {
    if (activeSet == "baseSetOutside") {
        document.getElementById("baseSetOutside").innerHTML = document.getElementById("sidenav").innerHTML;
    } else if (activeSet == "baseSetInside") {
        document.getElementById("baseSetInside").innerHTML = document.getElementById("sidenav").innerHTML;
    } else if (activeSet == "baseSetMiscellaneous") {
        document.getElementById("baseSetMiscellaneous").innerHTML = document.getElementById("sidenav").innerHTML;
    } else if (activeSet == "shadowOfNerekhallElements") {
        document.getElementById("shadowOfNerekhallElements").innerHTML = document.getElementById("sidenav").innerHTML;
    } else if (activeSet == "labyrinthOfRuinElements") {
        document.getElementById("labyrinthOfRuinElements").innerHTML = document.getElementById("sidenav").innerHTML;
    }
}

function loadMiscellaneous() {
    backupToInvisibleDiv();
    if (activeSet == "baseSetOutside" || activeSet == "baseSetInside") { //we will put check for expansions
        document.getElementById("sidenav").innerHTML = document.getElementById("baseSetMiscellaneous").innerHTML;
        activeSet = "baseSetMiscellaneous"
        loadAndArrangeTiles();
    }
}

function loadBaseSetInside() {
    backupToInvisibleDiv();
    if (activeSet == "baseSetOutside" || activeSet == "baseSetMiscellaneous") {
        document.getElementById("sidenav").innerHTML = document.getElementById("baseSetInside").innerHTML;
        activeSet = "baseSetInside";
        loadAndArrangeTiles();
    }
}

function loadBaseSetOutside() {
    backupToInvisibleDiv();
    if (activeSet == "baseSetInside" || activeSet == "baseSetMiscellaneous") {
        document.getElementById("sidenav").innerHTML = document.getElementById("baseSetOutside").innerHTML;
        activeSet = "baseSetOutside";
        loadAndArrangeTiles();
    }
}

function insideOutsideTrigger(){

}