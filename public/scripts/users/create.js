console.log('create js file');

$('.user-data-inputs').submit((event) => {
    event.preventDefault();
    console.log('sending data');
    let data = {
        firstName: $('.user-first-name').val(),
        lastName: $('.user-last-name').val(),
        username: $('.user-id').val(),
        password: $('.user-password').val()
    };
    $.ajax({
        url: '/authentication/users/create',
        type: 'post',
        data: JSON.stringify(data),
        contentType: 'application/json',
        success: function() {
            window.location.href = '/tests';      
        }
    });
});