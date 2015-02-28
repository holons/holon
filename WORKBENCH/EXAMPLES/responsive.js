
var addEvent = function(elem, type, eventHandle) {
    if (elem == null || typeof(elem) == 'undefined') return;
    if ( elem.addEventListener ) {
        elem.addEventListener( type, eventHandle, false );
    } else if ( elem.attachEvent ) {
        elem.attachEvent( "on" + type, eventHandle );
    } else {
        elem["on"+type]=eventHandle;
    }
};



var GO = function () {
  var currentWidth = document.body.offsetWidth;
  var newSize = currentWidth / 815.3 + 'em';
  document.querySelector('#CONTAINER').style.fontSize = newSize;
};


addEvent(window, "resize", function() { GO(); });

window.onload = GO;

GO();
