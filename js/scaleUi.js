function increaseUiZoom(){
    actualZoom = parseFloat(document.getElementById("zoom").innerHTML);
    //we want to support just resolutions that we want
    if(actualZoom == 0.25){
        actualZoom = 0.5;
        scale = actualZoom;
        document.getElementById("zoom").innerHTML = actualZoom;
        document.documentElement.style.setProperty('--scale', actualZoom);
        document.getElementById("map").setAttribute("scale", actualZoom);
        rearrangeElementsAfterZoomMap(0.25, actualZoom);
    }else if(actualZoom == 0.5){
        actualZoom = 0.75;
        scale = actualZoom;
        document.getElementById("zoom").innerHTML = actualZoom;
        document.documentElement.style.setProperty('--scale', actualZoom);
        document.getElementById("map").setAttribute("scale", actualZoom);
        
        rearrangeElementsAfterZoomMap(0.5, actualZoom);
    }else if(actualZoom == 0.75){
        actualZoom = 1.0;
        scale = actualZoom;
        document.getElementById("zoom").innerHTML = actualZoom;
        document.documentElement.style.setProperty('--scale', actualZoom);
        document.getElementById("map").setAttribute("scale", actualZoom);
        rearrangeElementsAfterZoomMap(0.75, actualZoom);
    }else if(actualZoom == 1){
        return;
    }
}

function decreaseUiZoom(){
    actualZoom = parseFloat(document.getElementById("zoom").innerHTML);
    //we want to support just resolutions that we want
    
    if(actualZoom == 0.25){
        return;
    }else if(actualZoom == 0.5){
        actualZoom = 0.25;
        scale = actualZoom;
        document.getElementById("zoom").innerHTML = actualZoom;
        document.documentElement.style.setProperty('--scale', actualZoom);
        document.getElementById("map").setAttribute("scale", actualZoom);
        rearrangeElementsAfterZoomMap(0.5, actualZoom);
    }else if(actualZoom == 0.75){
        actualZoom = 0.50;
        scale = actualZoom;
        document.getElementById("zoom").innerHTML = actualZoom;
        document.documentElement.style.setProperty('--scale', actualZoom);
        document.getElementById("map").setAttribute("scale", actualZoom);
        rearrangeElementsAfterZoomMap(0.75, actualZoom);
    }else if(actualZoom == 1){
        actualZoom = 0.75;
        scale = actualZoom;
        document.getElementById("zoom").innerHTML = actualZoom;
        document.documentElement.style.setProperty('--scale', actualZoom);
        document.getElementById("map").setAttribute("scale", actualZoom);

        rearrangeElementsAfterZoomMap(1.0, actualZoom);
    }
}

function applyUiZoom(){
    scale = parseFloat(document.getElementById("zoom").innerHTML);
    document.documentElement.style.setProperty('--scale', scale);
    document.getElementById("map").setAttribute("scale", scale);
}

function rearrangeElementsAfterZoomMap(oldZoom, newZoom){
    document.querySelectorAll("[piecetype='tile'][onmap='yes']").forEach(elmnt => {
        let scaleFactor = newZoom/oldZoom;
        elmnt.style.top = elmnt.offsetTop*scaleFactor + "px";
        elmnt.style.left = elmnt.offsetLeft*scaleFactor + "px";
        snap(elmnt);
    });
    document.querySelectorAll("[piecetype='text'][onmap='yes']").forEach(elmnt => {
        let scaleFactor = newZoom/oldZoom;
        elmnt.childNodes[3].childNodes[1].style.fontSize = parseInt(elmnt.childNodes[3].childNodes[1].style.fontSize)*scaleFactor + "px";
        //elmnt.style.top = (elmnt.childNodes[3].childNodes[1].offsetTop*scaleFactor + elmnt.childNodes[1].offsetHeight*scaleFactor) + "px";
        //elmnt.style.left = (elmnt.offsetLeft*scaleFactor) + "px";
        
        elmnt.style.top = (elmnt.offsetTop*scaleFactor /*- elmnt.childNodes[1].offsetHeight*scaleFactor*/) + "px";
        elmnt.style.left = elmnt.offsetLeft*scaleFactor + "px";
    });
}