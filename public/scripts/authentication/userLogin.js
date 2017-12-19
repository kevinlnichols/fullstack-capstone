$('.user-login-fields').submit((event) => {
    event.preventDefault();
    let username = $('.user-id').val();
    let password = $('.user-password').val();
    
    if (username === '') {
        $('.user-id').notify('Please fill out this field');
    } else if (password === '') {
        $('.user-password').notify('Please fill out this field');
    } else {console.log('sending user data');
        let userData = { username: username, password: password};
        $.ajax({
            url: '/authentication/userLogin',
            method: 'POST',
            data: JSON.stringify(userData),
            dataType: 'json',
            contentType: 'application/json',
            success: loginVerified
        });
    }
});



const loginVerified = data => {
    console.log(data);
    if (data.token) {
        localStorage.setItem('token', data.token);
        localStorage.setItem('userId', data.userId);
        window.location.href = '/users/home';
   };
};