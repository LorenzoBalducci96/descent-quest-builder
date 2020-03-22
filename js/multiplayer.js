var selected_hero = null;
var selected_class = null;

var webSocket;
var socketInitialized = false;
var playerNickname = null;

var game = false;

function selectCharacter(character){
    selected_hero = character;
    document.querySelectorAll("#choose_items_modal .item_small").forEach(card => {
        card.setAttribute("selected", "no");
    });

    document.querySelectorAll("#configuration_modal .hero_class_small").forEach(card => {
        card.setAttribute("selected", "no");
    });


    $('#multiplayer_modal').modal('hide');
    let cards = document.querySelectorAll("#choose_class_modal img");
    cards.forEach(card => {
        card.parentElement.style.display = "none";
    });
    cards = document.querySelectorAll("#choose_class_modal [color='" + selected_hero.getAttribute("color") + "']");
    cards.forEach(card => {
        card.parentElement.style.display = "";
    });
    $('#choose_class_modal').modal('show');
}

function selectClass(trait){
    selected_class = trait;
    let traitSelected = trait.getAttribute("trait");
    let allTraits = document.querySelectorAll("#configuration_modal [trait]");
    allTraits.forEach(elmnt => {
        elmnt.style.display = "none";
    });
    allTraits = document.querySelectorAll("#configuration_modal [trait='" + traitSelected + "']");
    allTraits.forEach(elmnt => {
        elmnt.style.display = "";
    });
    $('#choose_class_modal').modal('hide');
    $('#configuration_modal').modal('show');
}

function selectCard(card){
    if(card.getAttribute("selected") == "no"){
        card.setAttribute("selected", "yes"); 
    
    }else{
        card.setAttribute("selected", "no"); 
        
    }
}

function selectItems(){
    $("#configuration_modal").modal("hide");
    $("#choose_items_modal").modal("show");
}

function startGame(){
    $("#choose_items_modal").modal("hide");
    let img = document.createElement("img");
    img.classList.add("characterOnSidenav");
    img.src = selected_hero.getAttribute("src");

    let count=0;
    document.querySelectorAll("#configuration_modal [selected='yes']").forEach(selectedImg => {
        img.setAttribute("img_" + count, selectedImg.getAttribute("src"));
        count++;
    });
    document.querySelectorAll("#choose_items_modal [selected='yes']").forEach(selectedImg => {
        img.setAttribute("img_" + count, selectedImg.getAttribute("src"));
        count++;
    });

    img.setAttribute("onclick","openCharacterData(this)");
    img.setAttribute("playerNickname", playerNickname);
    sendHeroConfig(img);
    
    deleteForUpdateCharacter(playerNickname);
    document.getElementById("multiplayerSidenav").appendChild(img);
    
}

function deleteForUpdateCharacter(playerNickname){
    document.querySelectorAll("[playernickname='" + 
            playerNickname + "']").forEach(element => {
                element.remove();
    }); 
}

function openCharacterData(img){
    document.getElementById("characterDetails").innerHTML = "";
    let heroSheet = document.createElement("img");
    heroSheet.src = img.getAttribute("src");
    heroSheet.classList.add("imgesOnCharaterDetails");
    let div = document.createElement("div");
    div.classList.add("col-lg-4");
    div.classList.add("col-md-6");
    div.classList.add("col-sm-8");
    div.classList.add("col-12");
    div.appendChild(heroSheet);
    document.getElementById("characterDetails").appendChild(div);

    
    let count = 0;
    while(img.getAttribute("img_" + count) != null){
        div = document.createElement("div");
        div.classList.add("col-lg-2");
        div.classList.add("col-md-3");
        div.classList.add("col-sm-4");
        div.classList.add("col-6");
        let card = document.createElement("img");
        card.classList.add("imgesOnCharaterDetails");
        card.src = img.getAttribute("img_" + count);
        div.appendChild(card);
        document.getElementById("characterDetails").appendChild(div);
        count++;
    }
    $('#characterDetailsModal').modal('show');
}


function htmlToElement(html) {
    var template = document.createElement('template');
    html = html.trim(); // Never return a text node of whitespace as the result
    template.innerHTML = html;
    return template.content.firstChild;
}

function initializeSocket(playAsAHero){
    webSocket = new WebSocket(document.getElementById("socketId").value);
    webSocket.onmessage = function(event){
        message = JSON.parse(event.data);
        if (message.messageType == "MOVE" || message.messageType == "TEXT"){
            elmnt = document.getElementById(message.pieceId);
            if(message.onMap == "no"){
                document.getElementById(activeSet).appendChild(elmnt);
                elmnt.style.width = "100%";
                elmnt.setAttribute("onMap", "no")
                if (elmnt.getAttribute("single") == "yes") {//updating visibility of other side tiles
                    var placeholderImage = document.getElementById("placeholder_" + elmnt.getAttribute("image"));
                    elmnt.setAttribute("onMap", "no");
                    elmnt.setAttribute("orientation", "0");
                    //elmnt.src = placeholderImage.src;
                    elmnt.src = placeholderImage.getAttribute("src");
                    document.getElementById(elmnt.getAttribute("set")).appendChild(elmnt);
                    elmnt.style.top = placeholderImage.offsetTop + "px";
                    elmnt.style.left = placeholderImage.offsetLeft + "px";
                    elmnt.style.width = "100%"//placeholderImage.offsetWidth + "px";
    
                    var tileFace = ""
                    if (elmnt.id.charAt(elmnt.id.length - 1) == 'A') {
                        tileFace = 'B'
                    } else if (elmnt.id.charAt(elmnt.id.length - 1) == 'B') {
                        tileFace = 'A'
                    }
                    var placeholderOtherSide = document.getElementById(elmnt.id.substring(0, elmnt.id.length - 1) + tileFace);
                    placeholderOtherSide.style.visibility = "";
                } else {
                    var placeholderImage = document.getElementById("placeholder_" + elmnt.getAttribute("image"));//elmnt.id.substr(0, elmnt.id.lastIndexOf("_") + 1) + "1");
                    elmnt.parentNode.removeChild(elmnt);
                }
            }else if(!(elmnt.getAttribute("onMap") == "yes")){//we have to put on map
                //alert("piece " + message.pieceId + " not on map, put it on map and ask other player to move it again");
                if (elmnt.getAttribute("single") == "no") {
                    var placeholderImage = document.getElementById("placeholder_" + elmnt.getAttribute("image"));
                    var backup = elmnt.cloneNode(true);
                    document.getElementById(elmnt.getAttribute("set")).appendChild(backup);
                    backup.style.top = placeholderImage.offsetTop + "px";
                    backup.style.left = placeholderImage.offsetLeft + "px";
                    backup.style.width = "100%"//placeholderImage.offsetWidth + "px";
                    //backup.src = placeholderImage.src;
                    backup.src = placeholderImage.getAttribute("src");
                    backup.style.zIndex = "0";
                    backup.id = elmnt.id.substr(0, elmnt.id.lastIndexOf("_") + 1) + (parseInt(elmnt.id.match(/(\d+)$/)[0], 10) + 1);
                    backup.setAttribute("onMap", "no");
                    dragElement(backup);
                }
                elmnt.setAttribute("onMap", "yes")
                document.getElementById("map").appendChild(elmnt);
                elmnt.style.width = 'auto';
                
                elmnt.style.top = message.top;
                elmnt.style.left = message.left;
                elmnt.style.zIndex = message.zIndex;
            }else{//it's alreasy on map
                document.getElementById(message.pieceId).style.top = message.top;
                document.getElementById(message.pieceId).style.left = message.left;
                document.getElementById(message.pieceId).style.zIndex = message.zIndex;
            }
            if(message.messageType == 'TEXT'){
                document.getElementById(message.pieceId).childNodes[3].childNodes[1].value = message.text;
            }
        }else if (message.messageType == "LIGHT"){
            if(message.light == "on"){
                document.getElementById(message.pieceId).style.filter = "brightness(2.0)";
            }else{
                document.getElementById(message.pieceId).style.filter = "brightness(1.0)";
            }
        }else if (message.messageType == "ROLL"){
            executeRollDice(document.getElementById(message.pieceId), message.num);
        }else if(message.messageType == 'ROTATION'){
            document.getElementById(message.pieceId).setAttribute("orientation", message.orientation);
            setImage(document.getElementById(message.pieceId));
        }else if(message.messageType == "HERO"){
            
            deleteForUpdateCharacter(message.playerNickname);
            document.getElementById('multiplayerSidenav').appendChild(htmlToElement(message.imageHtml));
        }
    }
    socketInitialized = true;
    $('#start_game_modal').modal("hide");
    if(playAsAHero){
        playerNickname = document.getElementById("playerName").value;
        $('#multiplayer_modal').modal("show");
    }
}

function reconfigure(){
    $('#characterDetailsModal').modal("hide");
    $('#multiplayer_modal').modal('show');
}

function switchGraphicToGame(){
    document.getElementById("multiplayerSidenav").style.visibility = "";
    document.getElementById("control_bar").style.display = "none";
    document.getElementById("multiplayer_controls").style.display = "flex";
    document.getElementById("editor_controls").style.display = "none";
}

function switchGraphicToEditor(){
    document.getElementById("multiplayerSidenav").style.visibility = "hidden";
    document.getElementById("control_bar").style.display = "block";
    document.getElementById("multiplayer_controls").style.display = "none";
    document.getElementById("editor_controls").style.display = "flex";
}

function sendDiceRoll(id, roll){
    if(socketInitialized){
        let message;
        message = {
            messageType: 'ROLL',
            pieceId: id,
            num: roll
        };
        webSocket.send(JSON.stringify(message));
    }
}

function sendLightOn(elmnt){
    if(socketInitialized){
        let message;
        message = {
            messageType: 'LIGHT',
            pieceId: elmnt.getAttribute("id"),
            light: "on"
        };
        webSocket.send(JSON.stringify(message));
    }
}

function sendLightOff(elmnt){
    if(socketInitialized){
        let message;
        message = {
            messageType: 'LIGHT',
            pieceId: elmnt.getAttribute("id"),
            light: "off"
        };
        webSocket.send(JSON.stringify(message));
    }
}

function sendRotation(elmnt){
    if(socketInitialized){
        let message;
        message = {
            messageType: 'ROTATION',
            pieceId: elmnt.getAttribute("id"),
            orientation: elmnt.getAttribute("orientation")
        };
        webSocket.send(JSON.stringify(message));
    }
}

function sendHeroConfig(img){
    if(socketInitialized){
        let message = { 
            messageType: 'HERO',
            playerNickname: img.getAttribute('playerNickname'),
            imageHtml: img.outerHTML
        };
        webSocket.send(JSON.stringify(message));
    }
}

function sendSocketUpdate(elmnt){
    if(socketInitialized){
        let message;
        if(elmnt.getAttribute("pieceType") == "tile"){
            message = { 
                messageType: 'MOVE',
                pieceId: elmnt.getAttribute("id"),
                top: elmnt.style.top,
                left: elmnt.style.left,
                zIndex: elmnt.style.zIndex,
                onMap: elmnt.getAttribute("onMap"),
                orientation: elmnt.getAttribute("orientation")
            };
        }else if(elmnt.getAttribute("pieceType") == "text"){
            message = { 
                messageType: 'TEXT',
                pieceId: elmnt.getAttribute("id"),
                top: elmnt.style.top,
                left: elmnt.style.left,
                zIndex: elmnt.style.zIndex,
                text: elmnt.childNodes[3].childNodes[1].value,
                onMap: elmnt.getAttribute("onMap")
            };
        }
        webSocket.send(JSON.stringify(message));
    }
}
