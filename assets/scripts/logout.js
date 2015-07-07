

var internals = {};


internals.executeAJAX = function (url, data, callback) {

    var request = new XMLHttpRequest();

    request.open('POST', url);

    request.timedOut = false;

    var requestTimer = setTimeout(function () {

        // Request timed out, Retry or inform user.
        request.timedOut = true;
        request.abort();
    }, 3000);

    request.onreadystatechange = function () {

        if (request.readyState === 4 && callback) {
            return callback(request);
        }
    };

    request.setRequestHeader('Content-Type', 'application/json');

    request.send(JSON.stringify(data));

    return true;
};


internals.errorMessage = function (message) {

    //  handle error message

    var newP = document.createElement('p');
    newP.innerHTML = message;

    var att = document.createAttribute('class');
    att.value = 'errorMessage';
    newP.setAttributeNode(att);

    var header = document.getElementsByTagName('h3')[0];

    var parentDiv = header.parentNode;

    parentDiv.insertBefore(newP, header);

    return false;
};


internals.successMessage = function (request) {


    // Success clear and display authenticated users links.


    var parent1 = document.getElementsByTagName('body');

    // Parse response

    var data = JSON.parse(request.response);


    // Add links


    parent1[0].innerHTML = data.message + '<br/>' +
            '<a href="/home">Home</a><br/>';

    return;
};


document.onreadystatechange = function () {


    if (document.readyState === 'complete') {


        // Add click event handler

        document.getElementById('btnLogout').addEventListener('click', function (event) {


            console.log('logout request');
            event.preventDefault();


            // Get submitted form data
            var requestData = '{ request: \'logout\' }';



            internals.executeAJAX('/logout', requestData, function (request) {

                if (request.status === 200) {

                    internals.successMessage(request);

                } else {

                    // Oh no! request aborted

                    if (request.timedOut === true) {
                        internals.errorMessage('Your request timed out.  Most likely you have a slow internet connection.');
                    } else {
                        internals.errorMessage('[Error] Failed to load resource: Could not connect to the server.');
                    }
                }
            });
        });
    }
};
