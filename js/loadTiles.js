var activeSet = "baseSetOutside"
var activeArea = "Outside";
var activeSetName = "baseSet";



function LoadShadowOfNerekhallOutside() {
    backupToInvisibleDiv();
    document.getElementById("sidenav").innerHTML = document.getElementById("shadowOfNerekhallOutside").innerHTML;
    document.getElementById('insideButton').onclick = LoadShadowOfNerekhallInside
    document.getElementById('miscellaneousButton').style.display = "none"
    activeSet = "shadowOfNerekhallOutside";
    loadAndArrangeTiles();
}

function LoadShadowOfNerekhallInside() {
    backupToInvisibleDiv();
    document.getElementById("sidenav").innerHTML = document.getElementById("shadowOfNerekhallInside").innerHTML;
    document.getElementById('insideButton').onclick = LoadShadowOfNerekhallOutside
    document.getElementById('miscellaneousButton').style.display = "none"
    activeSet = "shadowOfNerekhallInside";
    loadAndArrangeTiles();
}

function LoadLabyrinthOfRuinOutside() {
    backupToInvisibleDiv();
    document.getElementById("sidenav").innerHTML = document.getElementById("labyrinthOfRuinOutside").innerHTML;
    document.getElementById('insideButton').onclick = LoadLabyrinthOfRuinInside
    document.getElementById('miscellaneousButton').style.display = "none"
    activeSet = "labyrinthOfRuinInside";
    loadAndArrangeTiles();
}

function LoadLabyrinthOfRuinInside() {
    backupToInvisibleDiv();
    document.getElementById("sidenav").innerHTML = document.getElementById("labyrinthOfRuinInside").innerHTML;
    document.getElementById('insideButton').onclick = LoadLabyrinthOfRuinOutside
    document.getElementById('miscellaneousButton').style.display = "none"
    activeSet = "labyrinthOfRuinInside";
    loadAndArrangeTiles();
}

function backupToInvisibleDiv() {
    if (activeSet == "baseSetOutside") {
        document.getElementById("baseSetOutside").innerHTML = document.getElementById("sidenav").innerHTML;
    } else if (activeSet == "baseSetInside") {
        document.getElementById("baseSetInside").innerHTML = document.getElementById("sidenav").innerHTML;
    } else if (activeSet == "baseSetMiscellaneous") {
        document.getElementById("baseSetMiscellaneous").innerHTML = document.getElementById("sidenav").innerHTML;
    } else if (activeSet == "LoadShadowOfNerekhallOutside") {
        document.getElementById("LoadShadowOfNerekhallOutside").innerHTML = document.getElementById("sidenav").innerHTML;
    } else if (activeSet == "LoadShadowOfNerekhallInside") {
        document.getElementById("LoadShadowOfNerekhallInside").innerHTML = document.getElementById("sidenav").innerHTML;
    } else if (activeSet == "labyrinthOfRuinElements") {
        document.getElementById("labyrinthOfRuinElements").innerHTML = document.getElementById("sidenav").innerHTML;
    }
}

function loadBaseSetMiscellaneous() {
    backupToInvisibleDiv();
    //if (activeSet == "baseSetOutside" || activeSet == "baseSetInside") { //we will put check for expansions
        document.getElementById("sidenav").innerHTML = document.getElementById("baseSetMiscellaneous").innerHTML;
        document.getElementById('miscellaneousButton').style.display = ""
        activeSet = "baseSetMiscellaneous"
        loadAndArrangeTiles();
    //}
}

function loadBaseSetInside() {
    backupToInvisibleDiv();
    //if (activeSet == "baseSetOutside" || activeSet == "baseSetMiscellaneous") {
        document.getElementById("sidenav").innerHTML = document.getElementById("baseSetInside").innerHTML;
        document.getElementById('insideButton').onclick = loadBaseSetOutside
        document.getElementById('miscellaneousButton').style.display = ""
        activeSet = "baseSetInside";
        loadAndArrangeTiles();
    //}
}

function loadBaseSetOutside() {
    backupToInvisibleDiv();
    //if (activeSet == "baseSetInside" || activeSet == "baseSetMiscellaneous") {
        document.getElementById("sidenav").innerHTML = document.getElementById("baseSetOutside").innerHTML;
        document.getElementById('insideButton').onclick = loadBaseSetInside
        document.getElementById('miscellaneousButton').style.display = ""
        activeSet = "baseSetOutside";
        loadAndArrangeTiles();
    //}
}
