$('.admin-info').submit((event) => {
    event.preventDefault();
    console.log('sending data');
    let data = {
        firstName: $('#admin-first-name').val(),
        lastName: $('#admin-last-name').val(),
        username: $('#admin-username').val(),
        password: $('#admin-password').val(),
        retypePassword: $('#retype-password').val()
    };
    let settings = {
        url: '/authentication/admin/create',
        type: 'post',
        data: JSON.stringify(data),
        contentType: 'application/json',
        success: loginVerified,
        error: function(err) {
            if (data.password.length < 10) {
                $('#length-error').html("Password must be at least 10 characters long")
            }
            if (data.password.length !== data.retypePassword.length) {
                $('#match-error').html("Passwords must be the same length")
            }
            if (data.password !== data.retypePassword) {
                $('#match-error').html("Passwords must match")
            }
        }
    };
    $.ajax(settings);
});

const loginVerified = data => {
    console.log('Loading');
    console.log(data.token);
    console.log(data.adminId);
    localStorage.setItem('token', data.token);
    localStorage.setItem('adminId', data.adminId);
    window.location.href = '/tests';
};