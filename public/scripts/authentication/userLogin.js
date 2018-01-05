$('.user-login-fields').submit((event) => {
    event.preventDefault();
    let username = $('.user-id').val();
    let password = $('.user-password').val();
    let userData = {username: username, password: password};
    $.ajax({
        url: '/authentication/userLogin',
        method: 'POST',
        data: JSON.stringify(userData),
        dataType: 'json',
        contentType: 'application/json',
        success: loginVerified
    });
});



const loginVerified = data => {
    if (data.token) {
        localStorage.setItem('token', data.token);
        localStorage.setItem('userId', data.userId);
        window.location.href = '/users/home';
   };
};