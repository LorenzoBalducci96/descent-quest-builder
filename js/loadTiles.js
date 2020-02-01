var activeSet = "baseSetOutside"
var activeArea = "Outside";
var activeSetName = "baseSet";

function loadBaseSetMiscellaneous() {
    document.getElementById(activeSet).style.visibility = "hidden"
    document.getElementById("baseSetMiscellaneous").style.visibility = ""

    document.getElementById('insideButton').style.display = ""
    document.getElementById('miscellaneousButton').style.display = ""
    activeSet = "baseSetMiscellaneous"
}

function loadBaseSetInside() {
        document.getElementById(activeSet).style.visibility = "hidden"
        document.getElementById("baseSetInside").style.visibility = ""
        
        document.getElementById('insideButton').onclick = loadBaseSetOutside
        document.getElementById('insideButton').style.display = ""
        document.getElementById('miscellaneousButton').onclick = loadBaseSetMiscellaneous;
        document.getElementById('miscellaneousButton').style.display = ""
        activeSet = "baseSetInside";
}

function loadBaseSetOutside() {
        document.getElementById(activeSet).style.visibility = "hidden"
        document.getElementById("baseSetOutside").style.visibility = ""
        
        document.getElementById('insideButton').onclick = loadBaseSetInside
        document.getElementById('insideButton').style.display = ""
        document.getElementById('miscellaneousButton').onclick = loadBaseSetMiscellaneous;
        document.getElementById('miscellaneousButton').style.display = ""
        activeSet = "baseSetOutside";
}

function loadTextAreas(){
    document.getElementById(activeSet).style.visibility = "hidden"
    document.getElementById("textAreas").style.visibility = ""
    
    document.getElementById('insideButton').style.display = "none"
    document.getElementById('miscellaneousButton').style.display = "none"
    activeSet = "textAreas";
}


function LoadShadowOfNerekhallOutside() {
    document.getElementById(activeSet).style.visibility = "hidden"
    document.getElementById("shadowOfNerekhallOutside").style.visibility = ""
    
    document.getElementById('insideButton').style.display = ""
    document.getElementById('insideButton').onclick = LoadShadowOfNerekhallInside
    document.getElementById('miscellaneousButton').onclick = LoadShadowOfNerekhallMiscellaneous;
    document.getElementById('miscellaneousButton').style.display = ""
    activeSet = "shadowOfNerekhallOutside";
}

function LoadShadowOfNerekhallInside() {
    document.getElementById(activeSet).style.visibility = "hidden"
    document.getElementById("shadowOfNerekhallInside").style.visibility = ""

    document.getElementById('insideButton').style.display = ""
    document.getElementById('insideButton').onclick = LoadShadowOfNerekhallOutside
    document.getElementById('miscellaneousButton').onclick = LoadShadowOfNerekhallMiscellaneous;
    document.getElementById('miscellaneousButton').style.display = ""
    activeSet = "shadowOfNerekhallInside";
}

function LoadShadowOfNerekhallMiscellaneous() {
    document.getElementById(activeSet).style.visibility = "hidden"
    document.getElementById("shadowOfNerekhallMiscellaneous").style.visibility = ""

    document.getElementById('insideButton').style.display = ""
    document.getElementById('miscellaneousButton').style.display = ""
    activeSet = "shadowOfNerekhallMiscellaneous";
}

function LoadLabyrinthOfRuinOutside() {
    document.getElementById(activeSet).style.visibility = "hidden"
    document.getElementById("labyrinthOfRuinOutside").style.visibility = ""

    document.getElementById('insideButton').onclick = LoadLabyrinthOfRuinInside
    document.getElementById('insideButton').style.display = ""
    document.getElementById('miscellaneousButton').style.display = "none"
    activeSet = "labyrinthOfRuinOutside";

}

function LoadLabyrinthOfRuinInside() {
    document.getElementById(activeSet).style.visibility = "hidden"
    document.getElementById("labyrinthOfRuinInside").style.visibility = ""

    document.getElementById('insideButton').onclick = LoadLabyrinthOfRuinOutside
    document.getElementById('insideButton').style.display = ""
    document.getElementById('miscellaneousButton').style.display = "none"
    activeSet = "labyrinthOfRuinInside";
}
/*
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
*/