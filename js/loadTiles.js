var activeSet = "baseSetOutside"
var activeArea = "Outside";
var activeSetName = "baseSet";



function LoadShadowOfNerekhallOutside() {
    backupToInvisibleDiv();
    document.getElementById("sidenav").innerHTML = document.getElementById("shadowOfNerekhallOutside").innerHTML;
    document.getElementById("shadowOfNerekhallOutside").innerHTML = "";
    document.getElementById('insideButton').style.display = ""
    document.getElementById('insideButton').onclick = LoadShadowOfNerekhallInside
    document.getElementById('miscellaneousButton').onclick = LoadShadowOfNerekhallMiscellaneous;
    document.getElementById('miscellaneousButton').style.display = ""
    activeSet = "shadowOfNerekhallOutside";
    loadAndArrangeTiles();
}

function LoadShadowOfNerekhallInside() {
    backupToInvisibleDiv();
    document.getElementById("sidenav").innerHTML = document.getElementById("shadowOfNerekhallInside").innerHTML;
    document.getElementById("shadowOfNerekhallInside").innerHTML = "";
    document.getElementById('insideButton').style.display = ""
    document.getElementById('insideButton').onclick = LoadShadowOfNerekhallOutside
    document.getElementById('miscellaneousButton').onclick = LoadShadowOfNerekhallMiscellaneous;
    document.getElementById('miscellaneousButton').style.display = ""
    activeSet = "shadowOfNerekhallInside";
    loadAndArrangeTiles();
}

function LoadShadowOfNerekhallMiscellaneous() {
    backupToInvisibleDiv();
    document.getElementById("sidenav").innerHTML = document.getElementById("shadowOfNerekhallMiscellaneous").innerHTML;
    document.getElementById("shadowOfNerekhallMiscellaneous").innerHTML = "";
    document.getElementById('insideButton').style.display = ""
    document.getElementById('miscellaneousButton').style.display = ""
    activeSet = "shadowOfNerekhallMiscellaneous";
    loadAndArrangeTiles();
}

function LoadLabyrinthOfRuinOutside() {
    backupToInvisibleDiv();
    document.getElementById("sidenav").innerHTML = document.getElementById("labyrinthOfRuinOutside").innerHTML;
    document.getElementById("labyrinthOfRuinOutside").innerHTML = "";
    document.getElementById('insideButton').onclick = LoadLabyrinthOfRuinInside
    document.getElementById('insideButton').style.display = ""
    document.getElementById('miscellaneousButton').style.display = "none"
    activeSet = "labyrinthOfRuinOutside";
    loadAndArrangeTiles();
}

function LoadLabyrinthOfRuinInside() {
    backupToInvisibleDiv();
    document.getElementById("sidenav").innerHTML = document.getElementById("labyrinthOfRuinInside").innerHTML;
    document.getElementById("labyrinthOfRuinInside").innerHTML = "";
    document.getElementById('insideButton').onclick = LoadLabyrinthOfRuinOutside
    document.getElementById('insideButton').style.display = ""
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
    } else if (activeSet == "shadowOfNerekhallOutside") {
        document.getElementById("shadowOfNerekhallOutside").innerHTML = document.getElementById("sidenav").innerHTML;
    } else if (activeSet == "shadowOfNerekhallInside") {
        document.getElementById("shadowOfNerekhallInside").innerHTML = document.getElementById("sidenav").innerHTML;
    } else if (activeSet == "shadowOfNerekhallMiscellaneous") {
        document.getElementById("shadowOfNerekhallMiscellaneous").innerHTML = document.getElementById("sidenav").innerHTML;
    } else if (activeSet == "labyrinthOfRuinInside") {
        document.getElementById("labyrinthOfRuinInside").innerHTML = document.getElementById("sidenav").innerHTML;
    }else if (activeSet == "labyrinthOfRuinOutside") {
        document.getElementById("labyrinthOfRuinOutside").innerHTML = document.getElementById("sidenav").innerHTML;
    }else if (activeSet == "textAreas") {
        document.getElementById("textAreas").innerHTML = document.getElementById("sidenav").innerHTML;
    }
    
}

function loadBaseSetMiscellaneous() {
    backupToInvisibleDiv();
    //if (activeSet == "baseSetOutside" || activeSet == "baseSetInside") { //we will put check for expansions
        document.getElementById("sidenav").innerHTML = document.getElementById("baseSetMiscellaneous").innerHTML;
        document.getElementById("baseSetMiscellaneous").innerHTML = "";
        document.getElementById('insideButton').style.display = ""
        document.getElementById('miscellaneousButton').style.display = ""
        activeSet = "baseSetMiscellaneous"
        loadAndArrangeTiles();
    //}
}

function loadBaseSetInside() {
    backupToInvisibleDiv();
    //if (activeSet == "baseSetOutside" || activeSet == "baseSetMiscellaneous") {
        document.getElementById("sidenav").innerHTML = document.getElementById("baseSetInside").innerHTML;
        document.getElementById("baseSetInside").innerHTML = "";
        document.getElementById('insideButton').onclick = loadBaseSetOutside
        document.getElementById('insideButton').style.display = ""
        document.getElementById('miscellaneousButton').onclick = loadBaseSetMiscellaneous;
        document.getElementById('miscellaneousButton').style.display = ""
        
        activeSet = "baseSetInside";
        loadAndArrangeTiles();
    //}
}

function loadBaseSetOutside() {
    backupToInvisibleDiv();
    //if (activeSet == "baseSetInside" || activeSet == "baseSetMiscellaneous") {
        document.getElementById("sidenav").innerHTML = document.getElementById("baseSetOutside").innerHTML;
        document.getElementById("baseSetOutside").innerHTML = "";
        document.getElementById('insideButton').onclick = loadBaseSetInside
        document.getElementById('insideButton').style.display = ""
        document.getElementById('miscellaneousButton').onclick = loadBaseSetMiscellaneous;
        document.getElementById('miscellaneousButton').style.display = ""
        activeSet = "baseSetOutside";
        loadAndArrangeTiles();
    //}
}

function loadTextAreas(){
    backupToInvisibleDiv();
    //if (activeSet == "baseSetInside" || activeSet == "baseSetMiscellaneous") {
    document.getElementById("sidenav").innerHTML = document.getElementById("textAreas").innerHTML;
    document.getElementById("textAreas").innerHTML = "";
    document.getElementById('insideButton').style.display = "none"
    document.getElementById('miscellaneousButton').style.display = "none"
    activeSet = "textAreas";
    loadAndArrangeTiles();
}