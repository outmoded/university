var inform = function inform (){

    console.log('You clicked on the button');
};

// alternative to load event
document.onreadystatechange = function () {

    if (document.readyState === 'complete') {

      // Button Click Event handler.
        var x = document.getElementById('boom');

        x.onclick = function (){

            inform();
        };
    }
};
