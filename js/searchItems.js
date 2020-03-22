
function resetSearch(){
    document.getElementById('search_list').innerHTML = "";
    document.getElementById("map").removeEventListener("mousedown", resetSearch);
    document.getElementById("map").removeEventListener("touchstart", resetSearch);
}

var listnerCloseSearch;

function searchItems(){
    searchedElement = document.getElementById("searchBar").value//.replace(/\ /g, "-");
    searchedWords = searchedElement.split(" ");
    let searchQuery = "";
    searchedWords.forEach(word => {
        if(word != ""){
            searchQuery += "[piecetype='ghost'][tags*='" + word + "' i]";
        }
    });
    
    let tableSearch = document.getElementById('search_list')
    tableSearch.innerHTML = "";
    if(searchQuery != ""){
        let pieces = document.querySelectorAll(searchQuery);
        
        pieces.forEach(element => {
            let elementRow = tableSearch.insertRow()
            let imageCell = elementRow.insertCell(0);
        
            image = document.createElement("img");
            image.style.width = "calc(var(--search-bar-lenght) / 4)"
            image.src = element.getAttribute("src");
            imageCell.appendChild(image)

            let name = elementRow.insertCell(1);
            name.innerHTML = element.getAttribute("tags");

            elementRow.onclick = function () {
                document.getElementById('search_list').innerHTML = "";
                selectSearchedElement(element)
            }
        });
    }
    document.getElementById("map").addEventListener("mousedown", resetSearch);
    document.getElementById("map").addEventListener("touchstart", resetSearch);
}


function selectSearchedElement(piece){
    switch(piece.getAttribute("set")){
        case "baseSetOutside": document.getElementById("baseLoadButton").click();  break;
        case "baseSetInside": document.getElementById("baseLoadButton").click(); loadBaseSetInside(); break;
        case "baseSetMiscellaneous": document.getElementById("baseLoadButton").click(); loadBaseSetMiscellaneous(); break;
        case "shadowOfNerekhallOutside": document.getElementById("shadowOfNerekhallLoadButton").click();  break;
        case "shadowOfNerekhallInside": document.getElementById("shadowOfNerekhallLoadButton").click(); loadShadowOfNerekhallInside(); break;
        case "shadowOfNerekhallMiscellaneous": document.getElementById("shadowOfNerekhallLoadButton").click(); loadShadowOfNerekhallMiscellaneous(); break;
        case "labyrinthOfRuinOutside": document.getElementById("labyrinthOfRuinLoadButton").click();  break;
        case "labyrinthOfRuinInside": document.getElementById("labyrinthOfRuinLoadButton").click(); loadLabyrinthOfRuinInside(); break;
        case "lairOfTheWyrmOutside": document.getElementById("lairOfTheWyrmLoadButton").click();  break;
        case "lairOfTheWyrmInside": document.getElementById("lairOfTheWyrmLoadButton").click(); loadLairOfTheWyrmInside(); break;
        case "trollfensOutside": document.getElementById("trollfensLoadButton").click();  break;
        case "trollfensInside": document.getElementById("trollfensLoadButton").click(); loadTrollfensInside(); break;
        case "monsters": document.getElementById("monstersLoadButton").click();  break;
        case "lieutenants": document.getElementById("lieutenantsLoadButton").click(); break;
        case "miscellaneous": document.getElementById("miscellaneousLoadButton").click(); break;
        case "heroes": document.getElementById("heroesButton").click(); break;
        case "tokens": document.getElementById("tokensLoadButton").click(); break;
    }
    document.getElementById(activeSet).scrollTop = piece.offsetTop;
    piece.blinkon = false;
    blink(piece, 10);
    //blink(pieces[0], 10)
    //blink(pieces[1], 10)
    
}

/*
function blink(image, count){
    if(count <= 0){
        image.style.filter = "brightness(1)"
        return;
    }else{
        count--;
        if(image.style.filter == "brightness(1)"){
            image.style.filter = "brightness(3)"
        }else{
            image.style.filter = "brightness(1)"
        }
        setTimeout(() => { 
            blink(image, count);
        },200);
    }
}
*/
function blink(image, count){
    if(count <= 0){
        image.style.border = '0px solid #E8272C'
        return;
    }else{
        count--;
        if(image.blinkon == false){
            image.style.border = '0.4vw solid #E8272C'
            image.blinkon = true;
        }else{
            image.style.border='0px solid #E8272C'
            image.blinkon = false;
        }
        setTimeout(() => { 
            blink(image, count);
        },200);
    }
}