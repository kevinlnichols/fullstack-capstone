$('.admin-info').submit((event) => {
    event.preventDefault();
    console.log('sending data');
    let data = {
        firstName: $('#admin-first-name').val(),
        lastName: $('#admin-last-name').val(),
        username: $('#admin-username').val(),
        password: $('#admin-password').val()
    };
    $.ajax({
        url: '/authentication/admin/create',
        type: 'post',
        data: JSON.stringify(data),
        contentType: 'application/json'
    });
});