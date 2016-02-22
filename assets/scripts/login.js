'use strict';

document.onreadystatechange = function () {

    if (document.readyState === 'complete') {
        document.getElementById('btnLogin').addEventListener('click', (event) => {

            event.preventDefault();
            console.log('Login Button Clicked');
        });
    }
};
