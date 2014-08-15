function ajax (url, callback) { // http://www.html5rocks.com/de/tutorials/file/xhr2/
  var xmlhttp;
  xmlhttp = GetXmlHttpObject();
  if(xmlhttp == null){
    alert("Boo! Your browser doesn't support AJAX!");
    return;
  }
  xmlhttp.onreadystatechange = stateChanged;
  xmlhttp.open("GET", url, true);
  xmlhttp.send(null);

  function stateChanged(){
    if(xmlhttp.readyState == 4){
      // do something with the response text
      callback(xmlhttp.responseText);
    }
  }
  function GetXmlHttpObject(){
    // IE7+, Firefox, Chrome, Opera, Safari
    if(window.XMLHttpRequest){
      return new XMLHttpRequest();
    }

    //IE5, IE6
    if(window.ActiveXObject){
      return new ActiveXObject("Microsoft.XMLHTTP");
    }
    return null;
  }
}
function jsonp () {
  // @TODO: get jsonp request library from Conteninjector Module
}