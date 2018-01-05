$('.admin-login-fields').submit((event) => {
    event.preventDefault();
    let username = $('.admin-id').val();
    let password = $('.admin-password').val();
    let userData = { username: username, password: password};
    $.ajax({
        url: '/authentication/adminLogin',
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
        localStorage.setItem('userId', data.adminId);
        window.location.href = '/tests';
    };
};