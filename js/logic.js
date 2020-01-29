//var pdfPageWidth =  620;var pdfPageHeight = 876; //75dpi
var pdfPageWidth =  1240;var pdfPageHeight = 1754; //150dpi
//var pdfPageWidth = 1654; var pdfPageHeight = 2339 //200dpi
//var pdfPageWidth =  2480;var pdfPageHeight = 3508; //300dpi
var scale = false;

var pdfDocument;

function exportPDF() {
    pdfDocument.save('dungeon.pdf');
}

function testPdf() {

    //send the div to PDF
    html2canvas(document.getElementById("output"), { // DIV ID HERE
        onrendered: function (canvas) {
            var imgData = canvas.toDataURL('image/png');//cera
            var imageRendered = document.getElementById("mapRendered");
            imageRendered.src = imgData

            //imgData.style.width = "50%"
            pdfDocument = new jsPDF('potrait');
            //const imgProps= doc.getImageProperties(imgData);
            //const pdfWidth = doc.internal.pageSize.getWidth();
            //const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;
            //doc.addImage(imgData, 'PNG', 0, 0, 210, 297);//changing last 2 parameters here cause scaling...
            pdfDocument.addImage(imgData, 'PNG', 0, 0, 210, 297);
            //doc.save('dungeon.pdf'); //SAVE PDF FILE
        }
    });
}

function goToTextEdit() {
    //$('#modal').modal()
    document.getElementById("output").innerHTML = "";
    document.getElementById("output").style.width = "0px"
    document.getElementById("output").style.height = "0px"
    var tilesOnMap = [].slice.call(document.getElementById("map").children);
    //var tilesOnMap = document.getElementById("map").children
    for (var i = 0; i < tilesOnMap.length; i++) {
        if (tilesOnMap[i].getAttribute("id") == "placeholder") {
            tilesOnMap.splice(i, 1);
        }
    }
    var minX = tilesOnMap[0].offsetLeft;
    var minY = tilesOnMap[0].offsetTop;
    var maxX = tilesOnMap[0].offsetLeft + tilesOnMap[0].offsetWidth;
    var maxY = tilesOnMap[0].offsetTop + tilesOnMap[0].offsetHeight;
    tilesOnMap.forEach(tile => {
        if (tile.offsetTop < minY) {
            minY = tile.offsetTop;
        }
        if (tile.offsetTop + tile.offsetHeight > maxY) {
            maxY = tile.offsetTop + tile.offsetHeight;
        }
        if (tile.offsetLeft < minX) {
            minX = tile.offsetLeft;
        }
        if (tile.offsetLeft + tile.offsetWidth > maxX) {
            maxX = tile.offsetLeft + tile.offsetWidth;
        }
    });
    var pageWidth = maxX - minX
    var pageHeight = maxY - minY
    //if (scale) {
        //document.getElementById("output").style.width = pageWidth + "px";
        //document.getElementById("output").style.height = pageHeight + "px";
    //} else {
        document.getElementById("output").style.width = pdfPageWidth + "px";
        document.getElementById("output").style.height = pdfPageHeight + "px";  
    //}

    document.getElementById("output").style.display = "block"
    tilesOnMap.forEach(tile => {
        if (tile.getAttribute("onMap") == "yes") {//check if is a tile
            var copyTile = tile.cloneNode(true);
            if (scale) {
                copyTile.style.width = (tile.offsetWidth * (pdfPageWidth / pageWidth)) + "px"
                copyTile.style.height = (tile.offsetHeight * (pdfPageWidth / pageWidth)) + "px"
                copyTile.style.left = ((tile.offsetLeft - minX) * (pdfPageWidth / pageWidth)) + "px";
                copyTile.style.top = ((tile.offsetTop - minY) * (pdfPageWidth / pageWidth)) + "px";
            } else {
                copyTile.style.width = tile.offsetWidth;
                copyTile.style.height = tile.offsetHeight;
                copyTile.style.left = (tile.offsetLeft - minX) + "px";
                copyTile.style.top = (tile.offsetTop - minY) + "px";
            }
            document.getElementById("output").appendChild(copyTile);
        }
    });
    $("#outputModal").modal('show')
    testPdf()
}

function scaleRes(){
    var value = document.getElementById("zoomScaling").value
    if(value == 0.5){
        pdfPageWidth =  2480; 
        pdfPageHeight = 3508;
    }
    if(value == 1.0){
        pdfPageWidth = 1654; 
        pdfPageHeight = 2339;
    }
    if(value == 1.5){
        pdfPageWidth =  1240;
        pdfPageHeight = 1754;
    }
    if(value == 2.0){
        pdfPageWidth =  620;
        pdfPageHeight = 876;;
    }
    goToTextEdit();
}

function setWhiteBackground(){
    if(document.getElementById("output").style.backgroundColor != "white"){
        document.getElementById("output").style.backgroundColor = "white";
        testPdf();
    }
}

function setBlackBackground(){
    if(document.getElementById("output").style.backgroundColor != "black"){
        document.getElementById("output").style.backgroundColor = "black";
        testPdf();
    }
}

function setSmokyBackground(){
    alert("not available yet");
}
