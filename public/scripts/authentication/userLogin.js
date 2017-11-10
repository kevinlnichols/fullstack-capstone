/*$('.admin-button').submit((event) => {
    event.preventDefault();
    let username = $('.user-id').val();
    let password = $('.user-password').val();
    
    if (username === '') {
        $('.user-id').notify('Please fill out this field');
    } else if (password === '') {
        $('.user-password').notify('Please fill out this field');
    } else {
        let userData ={ username: username, password: password};
        $.ajax({
            url: '/userLogin',
            method: 'POST',
            data: JSON.stringify(userData),
            dataType: 'json',
            contentType: 'application/json',
            success: function() {
                for(let i = 0; i < user.length; i++) {
                    if(username === user[i].username && password === user[i].password) {

                        return; 
                    } else {
                        return prompt('Invalid username or password');
                    };
                };
            };
        };
    }
});*/