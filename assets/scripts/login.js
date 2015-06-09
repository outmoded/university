document.onreadystatechange = function () {

    if (document.readyState === 'complete') {

        document.getElementById('btnLogin').addEventListener('click', function (event) {

            event.preventDefault();
            console.log('Login Button Clicked');
        });
    }
};
