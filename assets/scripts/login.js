document.onreadystatechange = function () {

    if (document.readyState === 'complete') {

        document.getElementById('login_button').addEventListener('click', function (event) {

            event.preventDefault();
            console.log('Login Button Clicked');
        });
    }
};
