$('.user-data-inputs').submit((event) => {
    event.preventDefault();
    let data = {
        firstName: $('.user-first-name').val(),
        lastName: $('.user-last-name').val(),
        username: $('.user-id').val(),
        password: $('.user-password').val(),
        retypePassword: $('#retype-password').val()
    };
    $.ajax({
        url: '/authentication/users/create',
        type: 'post',
        data: JSON.stringify(data),
        contentType: 'application/json',
        success: function() {
            window.location.href = '/tests';      
        },
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
    });
});

const verifyUser = () => {
    const userId = localStorage.getItem('userId');
    $.ajax({
        url: '/authentication/verify',
        type: 'post',
        contentType: 'application/json',
        data: JSON.stringify({userId: userId}),
        success: function(response) {
            console.log(response)
        },
        error: function() {
            window.location = '/authentication/adminLogin';
        }
    });
}

function handleFunctions () {
    verifyUser();
};

$(handleFunctions);