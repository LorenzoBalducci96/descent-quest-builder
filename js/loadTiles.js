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

function loadTextAreas(){
    document.getElementById(activeSet).style.visibility = "hidden"
    document.getElementById("textAreas").style.visibility = ""
    
    document.getElementById('insideButton').style.display = "none"
    document.getElementById('miscellaneousButton').style.display = "none"
    activeSet = "textAreas";
}

function loadMonsters(){
    document.getElementById(activeSet).style.visibility = "hidden"
    document.getElementById("monsters").style.visibility = ""
    
    document.getElementById('insideButton').style.display = "none"
    document.getElementById('miscellaneousButton').style.display = "none"
    activeSet = "monsters";
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

function LoadLairOfTheWyrmOutside(){
    document.getElementById(activeSet).style.visibility = "hidden"
    document.getElementById("lairOfTheWyrmOutside").style.visibility = ""

    document.getElementById('insideButton').onclick = LoadLairOfTheWyrmInside
    document.getElementById('insideButton').style.display = ""
    document.getElementById('miscellaneousButton').style.display = "none"
    activeSet = "lairOfTheWyrmOutside";
}

function LoadLairOfTheWyrmInside(){
    document.getElementById(activeSet).style.visibility = "hidden"
    document.getElementById("lairOfTheWyrmInside").style.visibility = ""

    document.getElementById('insideButton').onclick = LoadLairOfTheWyrmOutside
    document.getElementById('insideButton').style.display = ""
    document.getElementById('miscellaneousButton').style.display = "none"
    activeSet = "lairOfTheWyrmInside";
}

function LoadTrollfensOutside(){
    document.getElementById(activeSet).style.visibility = "hidden"
    document.getElementById("trollfensOutside").style.visibility = ""

    document.getElementById('insideButton').onclick = LoadTrollfensInside
    document.getElementById('insideButton').style.display = ""
    document.getElementById('miscellaneousButton').style.display = "none"
    activeSet = "trollfensOutside";
}

function LoadTrollfensInside(){
    document.getElementById(activeSet).style.visibility = "hidden"
    document.getElementById("trollfensInside").style.visibility = ""

    document.getElementById('insideButton').onclick = LoadTrollfensOutside
    document.getElementById('insideButton').style.display = ""
    document.getElementById('miscellaneousButton').style.display = "none"
    activeSet = "trollfensInside";
}