

var internals = {};


internals.executeAJAX = function (url, data, callback) {

    internals.clearErrors();

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

    var form = document.getElementsByTagName('form')[0];

    var parentDiv = form.parentNode;

    parentDiv.insertBefore(newP, form);

    return false;
};

internals.clearErrors = function () {

    var errorMessages = document.getElementsByTagName('p');

    if (errorMessages.length > 0) {

        console.log('Has Errors');
        errorMessages[0].parentNode.removeChild(errorMessages[0]);
    }
};

internals.successMessage = function (request) {


    // Success clear and display authenticated users links.


    var form = document.getElementsByTagName('form')[0];
    var parent1 = form.parentNode;


    // Parse response

    var data = JSON.parse(request.response);


    // Add links


    parent1.innerHTML = 'Welcome: ' + data.username + ' <br/>' +
            '<a href="/account">' + data.username + '\'s Account </a><br/>';

    return;
};


document.onreadystatechange = function () {


    if (document.readyState === 'complete') {


        // Add click event handler

        document.getElementById('btnLogin').addEventListener('click', function (event) {


            event.preventDefault();


            // Get submitted form data


            var username = document.getElementsByName('username')[0].value;
            var password = document.getElementsByName('password')[0].value;
            var requestData = { username: username, password: password };


            internals.executeAJAX('/login', requestData, function (request) {

                if (request.status === 200) {

                    internals.successMessage(request);

                } else if (request.status !== 0) {

                    // Boom error message received from server.

                    var responseJson = JSON.parse(request.response);
                    internals.errorMessage(responseJson.message);

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
