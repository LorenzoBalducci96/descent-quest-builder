var activeSet = "baseSet"

function LoadShadowOfNerekhall(){
    if(activeSet == "baseSet"){
        document.getElementById("baseSet").innerHTML = document.getElementById("sidenav").innerHTML;
        document.getElementById("sidenav").innerHTML = document.getElementById("shadowOfNerekhallElements").innerHTML
    }
    loadAndArrangeTiles();
}

function loadBaseSet(){

}