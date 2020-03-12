//this file redirect touch logic into mouse events
function touchHandler(event)
{
    var touches = event.changedTouches,
        first = touches[0],
        type = "";
    switch(event.type)
    {
        case "touchstart": type = "mousedown"; break;
        case "touchmove":  type = "mousemove"; break;        
        case "touchend":   type = "mouseup";   break;
        default:           return;
    }

    // initMouseEvent(type, canBubble, cancelable, view, clickCount, 
    //                screenX, screenY, clientX, clientY, ctrlKey, 
    //                altKey, shiftKey, metaKey, button, relatedTarget);

    var simulatedEvent = document.createEvent("MouseEvent");
    simulatedEvent.initMouseEvent(type, true, true, window, 1, 
                                  first.screenX, first.screenY, 
                                  first.clientX, first.clientY, false, 
                                  false, false, false, 0/*left*/, null);

    first.target.dispatchEvent(simulatedEvent);
    
}

var tapedTwice = false;

function doubleTapHandler(event) {
    if(!tapedTwice) {
        tapedTwice = true;
        setTimeout( function() { tapedTwice = false; }, 300 );
        touchHandler(event)
    }else{
        event.preventDefault();
        alert("found 3")
        var ev3 = new MouseEvent("contextmenu", {
            bubbles: true,
            cancelable: false,
            view: window,
            button: 2,
            buttons: 0,
            clientX: event.clientX,
            clientY: event.clientY
        });
        document.dispatchEvent(ev3);
    }
 }


function mapTouchEvents() 
{
    //document.addEventListener("touchstart", touchHandler, true);
    //document.addEventListener("touchmove", touchHandler, true);
    //document.addEventListener("touchend", touchHandler, true);
    //document.addEventListener("touchcancel", touchHandler, true);  
    //document.addEventListener("touchstart", doubleTapHandler);

  
}