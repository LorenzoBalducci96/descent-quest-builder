var activeSet = "baseSet"

function LoadShadowOfNerekhall(){
    backupToInvisibleDiv();
    document.getElementById("sidenav").innerHTML = document.getElementById("shadowOfNerekhallElements").innerHTML;
    activeSet = "ShadowOfNerekhall";
    loadAndArrangeTiles();
}

function LoadLabyrinthOfRuin(){
    backupToInvisibleDiv();
    document.getElementById("sidenav").innerHTML = document.getElementById("labyrinthOfRuinElements").innerHTML;
    activeSet = "LabyrinthOfRuin";
    loadAndArrangeTiles();
}

function loadBaseSet(){
    backupToInvisibleDiv();
    document.getElementById("sidenav").innerHTML = document.getElementById("baseSet").innerHTML;
    activeSet = "baseSet";
    loadAndArrangeTiles();
}

function backupToInvisibleDiv(){
    if(activeSet == "baseSet"){
        document.getElementById("baseSet").innerHTML = document.getElementById("sidenav").innerHTML;
    }else if(activeSet == "ShadowOfNerekhall"){
        document.getElementById("shadowOfNerekhallElements").innerHTML = document.getElementById("sidenav").innerHTML;
    }
}