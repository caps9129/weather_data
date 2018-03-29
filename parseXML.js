/*main*/

var XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;
var xhttp;
var url = "localhost/weather-data/O-B0045-001.xml";
var method = "GET"

var xhr = makeCorsRequest(method, url);


// Create the XHR object.
function createCORSRequest(method, url) {
    var xhr = new XMLHttpRequest();
    if ("withCredentials" in xhr) {
        // XHR for Chrome/Firefox/Opera/Safari.
        xhr.open(method, url, true);
    } else if (typeof XDomainRequest != "undefined") {
        // XDomainRequest for IE.
        xhr = new XDomainRequest();
        xhr.open(method, url);
    } else {
        // CORS not supported.
        xhr = null;
    }
    return xhr;
}


// Make the actual CORS request.
function makeCorsRequest(method, url) {
    // This is a sample server that supports CORS.

    var xhr = createCORSRequest('GET', url);
    if (!xhr) {
        console.log('CORS not supported');
        return;
    }

    // Response handlers.
    xhr.onload = function () {
        var text = xhr.responseText;
        console.log('Content ' + text);
    };

    xhr.onerror = function () {
        console.log('Woops, there was an error making the request.');
    };

    xhr.send();
}
