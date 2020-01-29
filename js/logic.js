function testPdf(){
 
    //send the div to PDF
    html2canvas($("#output"), { // DIV ID HERE
        onrendered: function(canvas) {
            var imgData = canvas.toDataURL('image/png'); 
            var doc = new jsPDF('potrait');
            doc.addImage(imgData, 'PNG', 0, 0);
            doc.save('sample-file.pdf'); //SAVE PDF FILE
        }
    });

}

function goToTextEdit(){
    //$('#modal').modal()
    document.getElementById("output").innerHTML = "";
    var tilesOnMap = [].slice.call(document.getElementById("map").children);
    //var tilesOnMap = document.getElementById("map").children
    
    var topX = tilesOnMap[0].offsetLeft;
    var topY = tilesOnMap[0].offsetTop;
    var bottomX = tilesOnMap[0].offsetLeft + tilesOnMap[0].offsetWidth;
    var bottomY = tilesOnMap[0].offsetTop + tilesOnMap[0].offsetHeight;
    tilesOnMap.forEach(tile => {
        if(tile.offsetTop < topY){
            topY = tile.offsetTop;
        }
        if(tile.offsetTop + tile.offsetHeight > bottomY){
            bottomY = tile.offsetTop + tile.offsetHeight;
        }
        if(tile.offsetLeft < topX){
            topX = tile.offsetLeft;
        }
        if(tile.offsetLeft + tile.offsetWidth > bottomX){
            bottomX = tile.offsetLeft + tile.offsetWidth;
        }
    });
    var pageWidth = bottomX - topX
    var pageHeight = bottomY - topY
    document.getElementById("output").style.width = pageWidth + "px";
    document.getElementById("output").style.height = pageHeight + "px";
    
    document.getElementById("output").style.display = "block"
    tilesOnMap.forEach(tile => {
        var copyTile = tile.cloneNode(true);
        copyTile.style.left = (tile.offsetLeft - topX)  + "px";
        copyTile.style.top = (tile.offsetTop - topY) + "px";
        document.getElementById("output").appendChild(copyTile);
    });
    
}

