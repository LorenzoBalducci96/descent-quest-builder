function setImage(elmnt){
    if(appType == "web"){ //if web app, has the base64 images
        if(elmnt.getAttribute("orientation") == "90"){
            rotatedImage = rotateBase64Image90deg(router(elmnt.getAttribute("set"), elmnt.getAttribute("image"), "0"), true)
            elmnt.src = rotatedImage       
        }else if(elmnt.getAttribute("orientation") == "180"){
            rotatedImage = rotateBase64Image180deg(router(elmnt.getAttribute("set"), elmnt.getAttribute("image"), "0"))
            elmnt.src = rotatedImage       
        }else if(elmnt.getAttribute("orientation") == "270"){
            rotatedImage = rotateBase64Image90deg(router(elmnt.getAttribute("set"), elmnt.getAttribute("image"), "0"), false)
            elmnt.src = rotatedImage       
        }else if(elmnt.getAttribute("orientation") == "0"){
            elmnt.src = router(elmnt.getAttribute("set"), elmnt.getAttribute("image"), elmnt.getAttribute("orientation"))
        }
    }else{//(appType == "electron") in the electron app we use img src
        if(elmnt.getAttribute("orientation") == "90"){
            elmnt.src= getTileSrcPath(elmnt.getAttribute("set"), elmnt.getAttribute("image"), "_090");
        }else if(elmnt.getAttribute("orientation") == "180"){
            elmnt.src= getTileSrcPath(elmnt.getAttribute("set"), elmnt.getAttribute("image"), "_180");
        }else if(elmnt.getAttribute("orientation") == "270"){
            elmnt.src= getTileSrcPath(elmnt.getAttribute("set"), elmnt.getAttribute("image"), "_270");
        }else if(elmnt.getAttribute("orientation") == "0"){
            elmnt.src= getTileSrcPath(elmnt.getAttribute("set"), elmnt.getAttribute("image"), "_000");
        }
    }
}

function startapImage(elmnt){
    if(appType == "electron"){//for a faster startup and maintenance of the page, in the electron app
        //we set src="assets/tiles/base/01A_000.png" in the html, so here nothing to do
        return;
    }else{
        setImage(elmnt);
    }
}

function getTileSrcPath(setName, imageName, orientation){
    switch(setName){
        case "baseSetOutside" : return "assets/tiles/base/" + imageName + orientation + ".png"; 
        case "baseSetInside" : return "assets/tiles/base/" + imageName + orientation + ".png"; 
        case "baseSetMiscellaneous" : return "assets/tiles/base/" + imageName + orientation + ".png"; 
        case "shadowOfNerekhallOutside" : return "assets/tiles/shadowOfNerekhall/" + imageName + orientation + ".png"; 
        case "shadowOfNerekhallInside" : return "assets/tiles/shadowOfNerekhall/" + imageName + orientation + ".png"; 
        case "shadowOfNerekhallMiscellaneous" : return "assets/tiles/shadowOfNerekhall/" + imageName + orientation + ".png";
        case "labyrinthOfRuinOutside" : return "assets/tiles/labyrinthOfRuin/" + imageName + orientation + ".png";
        case "labyrinthOfRuinInside" : return "assets/tiles/labyrinthOfRuin/" + imageName + orientation + ".png";
        case "trollfensOutside" : return "assets/tiles/trollfens/" + imageName + orientation + ".png";
        case "trollfensInside" : return "assets/tiles/trollfens/" + imageName + orientation + ".png";
        case "lairOfTheWyrmOutside" : return "assets/tiles/lairOfTheWyrm/" + imageName + orientation + ".png";
        case "lairOfTheWyrmInside" : return "assets/tiles/lairOfTheWyrm/" + imageName + orientation + ".png";
        case "miscellaneous" : return "assets/tiles/miscellaneous/" + imageName + orientation + ".png";
        case "tokens" : return "assets/tiles/tokens/" + imageName + orientation + ".png";
        case "monsters" : return "assets/tiles/monsters/" + imageName + orientation + ".png";
        case "lieutenants" : return "assets/tiles/lieutenants/" + imageName + orientation + ".png";
    }
}

function router(setName, id, orientation){
    switch(setName){
        case "baseSetOutside" : return baseSetOutside(id, orientation); break;
        case "baseSetInside" : return baseSetInside(id, orientation); break;
        case "baseSetMiscellaneous" : return baseSetOutside(id, orientation); break;
        case "shadowOfNerekhallOutside" : return shadows_of_nerekhall(id, orientation); break;
        case "shadowOfNerekhallInside" : return shadows_of_nerekhall(id, orientation); break;
        case "shadowOfNerekhallMiscellaneous" : return shadows_of_nerekhall(id, orientation); break;
        case "labyrinthOfRuinOutside" : return labyrinth_of_ruin(id, orientation); break;
        case "labyrinthOfRuinInside" : return labyrinth_of_ruin(id, orientation); break;
        case "trollfensOutside" : return trollfens(id, orientation); break;
        case "trollfensInside" : return trollfens(id, orientation); break;
        case "lairOfTheWyrmOutside" : return lair_of_the_wyrm(id, orientation); break;
        case "lairOfTheWyrmInside" : return lair_of_the_wyrm(id, orientation); break;
        case "miscellaneous" : return miscellaneous(id, orientation); break;
        case "tokens" : return tokens(id, orientation); break;
        case "monsters" : return monsters(id, orientation); break;
        case "lieutenants" : return lieutenants(id, orientation); break;
    }
}

function rotateBase64Image180deg(base64Image) {
    // create an off-screen canvas
    var offScreenCanvas = document.createElement('canvas');
    offScreenCanvasCtx = offScreenCanvas.getContext('2d');

    // cteate Image
    var img = new Image();
    img.src = base64Image;

    offScreenCanvas.height = img.height;
    offScreenCanvas.width = img.width;

    // rotate and draw source image into the off-screen canvas:
    //offScreenCanvasCtx.translate(img.height, img.width);
    offScreenCanvasCtx.rotate(Math.PI);
    offScreenCanvasCtx.translate(-offScreenCanvas.width, -offScreenCanvas.height);
        
    offScreenCanvasCtx.drawImage(img, 0, 0);

    // encode image to data-uri with base64
    return offScreenCanvas.toDataURL("image/png");
}

function rotateBase64Image90deg(base64Image, isClockwise) {
    // create an off-screen canvas
    var offScreenCanvas = document.createElement('canvas');
    offScreenCanvasCtx = offScreenCanvas.getContext('2d');

    // cteate Image
    var img = new Image();
    img.src = base64Image;

    // set its dimension to rotated size
    offScreenCanvas.height = img.width;
    offScreenCanvas.width = img.height;

    // rotate and draw source image into the off-screen canvas:
    if (isClockwise) { 
        offScreenCanvasCtx.rotate(90 * Math.PI / 180);
        offScreenCanvasCtx.translate(0, -offScreenCanvas.width);
    } else {
        offScreenCanvasCtx.rotate(-90 * Math.PI / 180);
        offScreenCanvasCtx.translate(-offScreenCanvas.height, 0);
    }
    offScreenCanvasCtx.drawImage(img, 0, 0);

    // encode image to data-uri with base64
    return offScreenCanvas.toDataURL("image/png");
}