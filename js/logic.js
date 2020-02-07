//var pdfPageWidth =  620;var pdfPageHeight = 876; //75dpi
var pdfPageWidth = 1240; var pdfPageHeight = 1754; //150dpi
//var pdfPageWidth = 1654; var pdfPageHeight = 2339 //200dpi
//var pdfPageWidth =  2480;var pdfPageHeight = 3508; //300dpi
var marginLeft = 0;
var marginTop = 0;

var pdfDocument;
var imageToPrintOnPdf;
const save_files_folder = 'save_files'
var documentToSave = "" //we have to save before unless we get the override of the modal

function loadSave(backupFile) {
    try {
        let fs = require('fs');
        let backup = fs.readFileSync(backupFile, "UTF-8")
        $("#loadProjectModal").modal("hide");
        document.documentElement.innerHTML = backup;
        bootstrap_page();
    } catch (e) {
        alert('function not available in web application, please install the desktop application');
    }
}

function handleFileSelect(event){
    const reader = new FileReader()
    reader.onload = handleFileLoad;
    reader.readAsText(event.target.files[0])
  }
  
  function handleFileLoad(event){
    document.documentElement.innerHTML = event.target.result;
    bootstrap_page()
  }

function loadSaveList() {
    try {
        let fs = require('fs');

        var files = fs.readdirSync(__dirname + '/' + save_files_folder);

        var tableSave = document.getElementById('save_list')
        tableSave.innerHTML = "";
        files.forEach(element => {
            if (fs.lstatSync(__dirname + '/' + save_files_folder + '/' + element.toString()).isDirectory()) {
                let newSave = tableSave.insertRow()

                let loadButtonCell = newSave.insertCell(0);
                let loadButton = document.createElement("button");
                loadButton.setAttribute("class", "selectButton");
                loadButton.innerHTML = "load";
                loadButton.onclick = function () {
                    loadSave(__dirname + '/' + save_files_folder + '/' +
                        element + "/" + 'save_page.html')
                }
                loadButtonCell.appendChild(loadButton);

                let cancelButtonCell = newSave.insertCell(1);
                let cancelButton = document.createElement("button");
                cancelButton.setAttribute("class", "cancelSaveButton");
                cancelButton.innerHTML = "cancel";
                cancelButton.onclick = function () {
                    cancelSave(__dirname + '/' + save_files_folder + '/' + element);
                }
                cancelButtonCell.appendChild(cancelButton);

                var saveName = newSave.insertCell(2);
                saveName.innerHTML = element.toString();
                /*
                saveName.onclick = function () {
                    loadSave(__dirname + '/' + save_files_folder + '/' +
                        element + "/" + 'save_page.html')
                }
                */
                tableSave.insertRow(newSave);

            }
        });
        $("#loadProjectModal").modal("show");
    } catch (e) {
        alert("give me the backup file you want to restore");
        document.getElementById("restorePageInputFile").addEventListener('change', handleFileSelect, false);
        document.getElementById("restorePageInputFile").click();
    }
}

function cancelSave(path) {
    try{
        const fs = require('fs');
        const Path = require('path');

        if (fs.existsSync(path)) {
            fs.readdirSync(path).forEach((file, index) => {
                const curPath = Path.join(path, file);
                if (fs.lstatSync(curPath).isDirectory()) { // recurse
                    deleteFolderRecursive(curPath);
                } else { // delete file
                    fs.unlinkSync(curPath);
                }
            });
            fs.rmdirSync(path);
            loadSaveList();
        }
    }catch(e){
        alert("function not available in web application, please install the desktop application")
    }
}


function saveProject() {
    try {
        var fs = require('fs');
        let projectName = document.getElementById("projectSaveName").value;
        try {
            let dirPath = __dirname + '/' + save_files_folder + '/' + projectName + "/";
            if (!fs.existsSync(dirPath)) {
                $("#saveProjectModal").modal("hide");
                fs.mkdirSync(dirPath);
                fs.writeFileSync(__dirname + '/' + save_files_folder + '/' +
                    projectName + "/" + 'save_page.html', documentToSave, 'utf-8');
            } else {
                alert("project with this name already exist, please use different name")
            }
        } catch (e) {
            alert('unknown error in saving project');
        }
    } catch (e) {
        alert('function not available in web application, please install the desktop application');
    }
}

function savePage() {
    var tilesOnMap = [].slice.call(document.getElementById("map").children);//get all the elements on the map
    for (var i = 0; i < tilesOnMap.length; i++) {
        if (tilesOnMap[i].getAttribute("pieceType") == "text") {
            tilesOnMap[i].childNodes[3].childNodes[1].innerHTML = tilesOnMap[i].childNodes[3].childNodes[1].value;
        }
    }
    documentToSave = document.documentElement.innerHTML;
    try {
        let fs = require('fs');
        document.getElementById('previewSaving');
        $('#saveProjectModal').modal('show');
    } catch (e) {
        alert("you are going to download a backup file")
        var blob = new Blob([documentToSave],
            { type: "text/plain;charset=utf-8" });
        anchor = document.createElement('a');
    
        anchor.download = "backupMap.html";
        anchor.href = (window.webkitURL || window.URL).createObjectURL(blob);
        anchor.dataset.downloadurl = ['text/plain', anchor.download, anchor.href].join(':');
        anchor.click();
    }
}

function deleteProject() {
    try {
        let fs = require('fs');
    } catch (e) {
        alert("function not available in web application, please install the desktop application")
    }
}

function exportPDF() {
    pdfDocument = new jsPDF('potrait');
    pdfDocument.addImage(imageToPrintOnPdf, 'PNG', 0, 0, 210, 297);//A4 format
    pdfDocument.save('dungeon.pdf');
}

function createImg(outputImage) {
    html2canvas(document.getElementById("output"), {
        onrendered: function (canvas) {
            imageToPrintOnPdf = canvas.toDataURL('image/png');//cera
            var imageRendered = document.getElementById(outputImage);
            imageRendered.src = imageToPrintOnPdf
        }
    });
}

function createOutputDivForPrint(){
    document.getElementById("output").innerHTML = "";
    var tilesOnMap = [].slice.call(document.getElementById("map").children);//get all the elements on the map
    for (var i = 0; i < tilesOnMap.length; i++) {
        if (tilesOnMap[i].getAttribute("pieceType") == "placeholder") {
            tilesOnMap.splice(i, 1);
        }
    }
    var minX = parseInt(tilesOnMap[0].style.left, 10);
    var minY = parseInt(tilesOnMap[0].style.top, 10);
    var maxX = parseInt(tilesOnMap[0].style.left, 10) + parseInt(tilesOnMap[0].offsetWidth, 10);
    var maxY = parseInt(tilesOnMap[0].style.top, 10) + parseInt(tilesOnMap[0].offsetHeight, 10);
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
    createImg('mapRendered')//after the output div is prepared let's print on image
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
