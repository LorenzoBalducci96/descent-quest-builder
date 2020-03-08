var activeSet = "baseSetOutside"
var activeArea = "Outside";
var activeSetName = "baseSet";

function loadTokens() {
    document.getElementById(activeSet).style.visibility = "hidden"
    document.getElementById("tokens").style.visibility = ""

    document.getElementById('insideButton').style.display = "none"
    document.getElementById('miscellaneousButton').style.display = "none"
    activeSet = "tokens"
}

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

function loadMiscellaneous(){
    document.getElementById(activeSet).style.visibility = "hidden"
    document.getElementById("miscellaneous").style.visibility = ""
    
    document.getElementById('insideButton').style.display = "none"
    document.getElementById('miscellaneousButton').style.display = "none"
    activeSet = "miscellaneous";
}

function loadMonsters(){
    document.getElementById(activeSet).style.visibility = "hidden"
    document.getElementById("monsters").style.visibility = ""
    
    document.getElementById('insideButton').style.display = "none"
    document.getElementById('miscellaneousButton').style.display = "none"
    activeSet = "monsters";
}




function loadShadowOfNerekhallOutside() {
    document.getElementById(activeSet).style.visibility = "hidden"
    document.getElementById("shadowOfNerekhallOutside").style.visibility = ""
    
    document.getElementById('insideButton').style.display = ""
    document.getElementById('insideButton').onclick = loadShadowOfNerekhallInside
    document.getElementById('miscellaneousButton').onclick = loadShadowOfNerekhallMiscellaneous;
    document.getElementById('miscellaneousButton').style.display = ""
    activeSet = "shadowOfNerekhallOutside";
}

function loadShadowOfNerekhallInside() {
    document.getElementById(activeSet).style.visibility = "hidden"
    document.getElementById("shadowOfNerekhallInside").style.visibility = ""

    document.getElementById('insideButton').style.display = ""
    document.getElementById('insideButton').onclick = loadShadowOfNerekhallOutside
    document.getElementById('miscellaneousButton').onclick = loadShadowOfNerekhallMiscellaneous;
    document.getElementById('miscellaneousButton').style.display = ""
    activeSet = "shadowOfNerekhallInside";
}

function loadShadowOfNerekhallMiscellaneous() {
    document.getElementById(activeSet).style.visibility = "hidden"
    document.getElementById("shadowOfNerekhallMiscellaneous").style.visibility = ""

    document.getElementById('insideButton').style.display = ""
    document.getElementById('miscellaneousButton').style.display = ""
    activeSet = "shadowOfNerekhallMiscellaneous";
}

function loadLabyrinthOfRuinOutside() {
    document.getElementById(activeSet).style.visibility = "hidden"
    document.getElementById("labyrinthOfRuinOutside").style.visibility = ""

    document.getElementById('insideButton').onclick = loadLabyrinthOfRuinInside
    document.getElementById('insideButton').style.display = ""
    document.getElementById('miscellaneousButton').style.display = "none"
    activeSet = "labyrinthOfRuinOutside";

}

function loadLabyrinthOfRuinInside() {
    document.getElementById(activeSet).style.visibility = "hidden"
    document.getElementById("labyrinthOfRuinInside").style.visibility = ""

    document.getElementById('insideButton').onclick = loadLabyrinthOfRuinOutside
    document.getElementById('insideButton').style.display = ""
    document.getElementById('miscellaneousButton').style.display = "none"
    activeSet = "labyrinthOfRuinInside";
}

function loadLairOfTheWyrmOutside(){
    document.getElementById(activeSet).style.visibility = "hidden"
    document.getElementById("lairOfTheWyrmOutside").style.visibility = ""

    document.getElementById('insideButton').onclick = loadLairOfTheWyrmInside
    document.getElementById('insideButton').style.display = ""
    document.getElementById('miscellaneousButton').style.display = "none"
    activeSet = "lairOfTheWyrmOutside";
}

function loadLairOfTheWyrmInside(){
    document.getElementById(activeSet).style.visibility = "hidden"
    document.getElementById("lairOfTheWyrmInside").style.visibility = ""

    document.getElementById('insideButton').onclick = loadLairOfTheWyrmOutside
    document.getElementById('insideButton').style.display = ""
    document.getElementById('miscellaneousButton').style.display = "none"
    activeSet = "lairOfTheWyrmInside";
}

function loadTrollfensOutside(){
    document.getElementById(activeSet).style.visibility = "hidden"
    document.getElementById("trollfensOutside").style.visibility = ""

    document.getElementById('insideButton').onclick = loadTrollfensInside
    document.getElementById('insideButton').style.display = ""
    document.getElementById('miscellaneousButton').style.display = "none"
    activeSet = "trollfensOutside";
}

function loadTrollfensInside(){
    document.getElementById(activeSet).style.visibility = "hidden"
    document.getElementById("trollfensInside").style.visibility = ""

    document.getElementById('insideButton').onclick = loadTrollfensOutside
    document.getElementById('insideButton').style.display = ""
    document.getElementById('miscellaneousButton').style.display = "none"
    activeSet = "trollfensInside";
}

function loadLieutenants(){
    document.getElementById(activeSet).style.visibility = "hidden"
    document.getElementById("lieutenants").style.visibility = ""
    document.getElementById('insideButton').style.display = "none"
    document.getElementById('miscellaneousButton').style.display = "none"
    activeSet = "lieutenants";
}