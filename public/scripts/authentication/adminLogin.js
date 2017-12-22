$('.admin-login-fields').submit((event) => {
    event.preventDefault();
    let username = $('.admin-id').val();
    let password = $('.admin-password').val();
    
    if (username === '') {
        $('.admin-id').notify('Please fill out this field');
    } else if (password === '') {
        $('.admin-password').notify('Please fill out this field');
    } else {console.log('sending user data');
        let userData = { username: username, password: password};
        $.ajax({
            url: '/authentication/adminLogin',
            method: 'POST',
            data: JSON.stringify(userData),
            dataType: 'json',
            contentType: 'application/json',
            success: loginVerified
        });
    }
});

const loginVerified = data => {
    console.log('Loading');
    if (data.token) {
        localStorage.setItem('token', data.token);
        localStorage.setItem('adminId', data.adminId);
        window.location.href = '/tests';
    };
};