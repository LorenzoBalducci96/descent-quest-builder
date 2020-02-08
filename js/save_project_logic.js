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

function handleFileSelect(event) {
    const reader = new FileReader()
    reader.onload = handleFileLoad;
    reader.readAsText(event.target.files[0])
}

function handleFileLoad(event) {
    document.documentElement.innerHTML = event.target.result;
    bootstrap_page()
}

function erasePreviewMissionData(){
    document.getElementById('restoreProjectNotes').innerHTML = "";
    document.getElementById('previewLoading').src = "";
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

                newSave.onmouseover = function () {
                    document.getElementById('previewLoading').src = __dirname + '/' +
                    save_files_folder + '/' + element + "/" + 'preview.png';
                    
                    document.getElementById('restoreProjectNotes').innerHTML = "notes: " + fs.readFileSync(__dirname + '/' +
                    save_files_folder + '/' + element + '/' + 'notes.txt', 'utf-8');
                }

                newSave.onmouseout = erasePreviewMissionData();

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
                    erasePreviewMissionData();
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
    try {
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
    } catch (e) {
        alert("function not available in web application, please install the desktop application")
    }
}


function saveProject() {
    try {
        let fs = require('fs');
        let projectName = document.getElementById("projectSaveName").value;
        try {
            let dirPath = __dirname + '/' + save_files_folder + '/' + projectName + "/";
            if (!fs.existsSync(dirPath)) {
                $("#saveProjectModal").modal("hide");
                fs.mkdirSync(dirPath);
                fs.writeFileSync(__dirname + '/' + save_files_folder + '/' +
                    projectName + "/" + 'save_page.html', documentToSave, 'utf-8');
                let base64Data =  document.getElementById('previewSaving').src.replace(/^data:image\/png;base64,/, "");
                fs.writeFileSync(__dirname + '/' + save_files_folder + '/' +
                    projectName + "/" + 'preview.png', base64Data, 'base64');
                fs.writeFileSync(__dirname + '/' + save_files_folder + '/' +
                    projectName + '/' + 'notes.txt',document.getElementById('projectSaveNotes').value, 'utf-8');
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
        createOutputDivForPrint();
        createImg('previewSaving');

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