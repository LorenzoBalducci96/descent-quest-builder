//var pdfPageWidth =  620;var pdfPageHeight = 876; //75dpi
var pdfPageWidth = 1240; var pdfPageHeight = 1754; //150dpi
//var pdfPageWidth = 1654; var pdfPageHeight = 2339 //200dpi
//var pdfPageWidth =  2480;var pdfPageHeight = 3508; //300dpi
var marginLeft = 0;
var marginTop = 0;

function exportPDF() {
    let pdfDocument = new jsPDF('potrait');
    pdfDocument.addImage(document.getElementById('mapRendered'), 'PNG', 0, 0, 210, 297);//A4 format
    pdfDocument.save('dungeon.pdf');
}

function createImg(imgOutput){
    html2canvas(document.getElementById("output"), {
        onrendered: function (canvas) {
            document.getElementById(imgOutput).src = canvas.toDataURL('image/png');;
        }
    });
}

function createOutputDivForPrint() {
    document.getElementById("output").innerHTML = "";
    var tilesOnMap = [].slice.call(document.getElementById("map").children);//get all the elements on the map
    for (var i = 0; i < tilesOnMap.length; i++) {
        if (tilesOnMap[i].getAttribute("pieceType") == "placeholder") {
            tilesOnMap.splice(i, 1);
        }
    }
    let minX = 0;
    let minY = 0;
    let maxX = 0;
    let maxY = 0;
    if (tilesOnMap.length > 0) {
        minX = parseInt(tilesOnMap[0].style.left, 10);
        minY = parseInt(tilesOnMap[0].style.top, 10);
        maxX = parseInt(tilesOnMap[0].style.left, 10) + parseInt(tilesOnMap[0].offsetWidth, 10);
        maxY = parseInt(tilesOnMap[0].style.top, 10) + parseInt(tilesOnMap[0].offsetHeight, 10);
    }
    tilesOnMap.forEach(tile => {
        if (tile.offsetTop < minY) {
            minY = parseInt(tile.style.top, 10);
        }
        if (tile.offsetTop + tile.offsetHeight > maxY) {
            maxY = parseInt(tile.style.top, 10) + parseInt(tile.offsetHeight, 10);
        }
        if (tile.offsetLeft < minX) {
            minX = parseInt(tile.style.left, 10);
        }
        if (tile.offsetLeft + tile.offsetWidth > maxX) {
            maxX = parseInt(tile.style.left, 10) + parseInt(tile.offsetWidth, 10);
        }
    });

    var pageWidth = maxX - minX
    var pageHeight = maxY - minY

    document.getElementById("output").style.width = pdfPageWidth + "px";
    document.getElementById("output").style.height = pdfPageHeight + "px";


    document.getElementById("output").style.display = "block"
    tilesOnMap.forEach(tile => {
        if (tile.getAttribute("pieceType") == "tile") {//we print just the tiles
            var copyTile = tile.cloneNode(true);
            copyTile.style.width = tile.offsetWidth;
            copyTile.style.height = tile.offsetHeight;
            copyTile.style.left = (tile.offsetLeft - minX + marginLeft) + "px";
            copyTile.style.top = (tile.offsetTop - minY + marginTop) + "px";
            document.getElementById("output").appendChild(copyTile);
        }
        if (tile.getAttribute("pieceType") == "text") {//for the text just print the text and adjust offset height
            //we have to convert to label because html2canvas has a bug for textarea
            var label = document.createElement('label');
            label.style.position = "absolute";
            label.style.top = (tile.offsetTop + tile.childNodes[3].childNodes[1].offsetTop - minY + marginTop) + "px";
            label.style.left = (tile.offsetLeft + tile.childNodes[3].childNodes[1].offsetLeft - minX + marginLeft) + "px";
            label.style.width = tile.childNodes[3].childNodes[1].offsetWidth + "px";
            label.style.height = tile.childNodes[3].childNodes[1].offsetHeight + "px";
            label.style.fontSize = tile.childNodes[3].childNodes[1].style.fontSize;
            label.style.fontWeight = tile.childNodes[3].childNodes[1].style.fontWeight;
            label.style.color = tile.childNodes[3].childNodes[1].style.color;
            label.innerHTML = tile.childNodes[3].childNodes[1].value.replace("\n", "<br>");
            document.getElementById("output").appendChild(label);
        }
    });
}

function goToExport() {
    //basing on pdfPageWidth and pdfPageHeight the output div if prepared for printing on canvas
    createOutputDivForPrint();
    $("#outputModal").modal('show')

    createImg('mapRendered');
}

function scaleRes() {
    //we want to support just A4 "standard" resolution
    var value = document.getElementById("zoomScaling").value
    if (value == 0.5) {
        pdfPageWidth = 2480;
        pdfPageHeight = 3508;
    }
    if (value == 1.0) {
        pdfPageWidth = 1654;
        pdfPageHeight = 2339;
    }
    if (value == 1.5) {
        pdfPageWidth = 1240;
        pdfPageHeight = 1754;
    }
    if (value == 2.0) {
        pdfPageWidth = 620;
        pdfPageHeight = 876;;
    }
    goToExport();
}

function setMarginLeft() {
    marginLeft = parseInt(document.getElementById("marginLeft").value)
    goToExport();
}

function setMarginTop() {
    marginTop = parseInt(document.getElementById("marginTop").value)
    goToExport();
}

function setWhiteBackground() {
    if (document.getElementById("output").style.backgroundColor != "white") {
        document.getElementById("output").style.backgroundImage = "none";
        document.getElementById("output").style.backgroundColor = "white";
        createImg('mapRendered');
    }
}

function setBlackBackground() {
    if (document.getElementById("output").style.backgroundColor != "black") {
        document.getElementById("output").style.backgroundImage = "none";
        document.getElementById("output").style.backgroundColor = "black";
        createImg('mapRendered');
    }
}

function setSmokyBackground() {
    if (document.getElementById("output").style.backgroundImage != "url('assets/pdf_background.jpg')") {
        document.getElementById("output").style.backgroundColor = "none";
        document.getElementById("output").style.backgroundImage = "url('assets/pdf_background.jpg')";
        createImg('mapRendered');
    }
}