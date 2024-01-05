(function (global) {

    // Set up a namespace for our utility
    var ajaxUtils = {};

    // Returns an HTTP request object
    function getRequestObject() {
        if (window.XMLHttpRequest) {
            return new XMLHttpRequest();
        } else if (window.ActiveXObject) {
            // For very old IE browsers (optional)
            return new ActiveXObject("Microsoft.XMLHTTP");
        } else {
            // Alert is not recommended, consider logging or other error handling
            console.error("Ajax is not supported!");
            return null;
        }
    }

    // Makes an Ajax GET request to 'requestUrl'
    ajaxUtils.sendGetRequest = function (requestUrl, responseHandler, isJsonResponse) {
        var request = getRequestObject();
        if (!request) {
            return;
        }
        request.onreadystatechange = function () {
            handleResponse(request, responseHandler, isJsonResponse);
        };
        request.open("GET", requestUrl, true);
        request.send(null); // for GET requests, should be null
    };

    // Only calls the user-provided 'responseHandler' function if the response is ready and not an error
    function handleResponse(request, responseHandler, isJsonResponse) {
        if (request.readyState == 4) {
            // 4 means the response is complete
            if (request.status == 200) {
                // 200 means "OK"
                // Default to isJsonResponse = true
                if (isJsonResponse == undefined) {
                    isJsonResponse = true;
                }
                if (isJsonResponse) {
                    responseHandler(JSON.parse(request.responseText));
                } else {
                    responseHandler(request.responseText);
                }
            } else {
                // Handle errors, this is a simple alert, consider logging or other error handling
                console.error("Error: " + request.status);
            }
        }
    }

    // Expose utility to the global object
    global.$ajaxUtils = ajaxUtils;

})(window);

// Check the provided URLs for validity
var allCategoriesUrl = "https://coursera-jhu-default-rtdb.firebaseio.com/categories.json";
var menuItemsUrl = "https://coursera-jhu-default-rtdb.firebaseio.com/menu_items.json?category=";

// You need to check these URLs based on your server setup and data availability
// The validity of these URLs cannot be determined here.
console.log("allCategoriesUrl is valid: " + isValidUrl(allCategoriesUrl));
console.log("menuItemsUrl is valid: " + isValidUrl(menuItemsUrl));

// Function to check the validity of a URL
function isValidUrl(url) {
    var pattern = new RegExp('^(https?:\\/\\/)?' + // protocol
        '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|' + // domain name
        '((\\d{1,3}\\.){3}\\d{1,3}))' + // OR ip (v4) address
        '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*' + // port and path
        '(\\?[;&a-z\\d%_.~+=-]*)?' + // query string
        '(\\#[-a-z\\d_]*)?$', 'i'); // fragment locator
    return !!pattern.test(url);
}
