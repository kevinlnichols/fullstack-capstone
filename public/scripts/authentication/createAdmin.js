$('.admin-info').submit((event) => {
    event.preventDefault();
    console.log('sending data');
    let data = {name: $('#admin-first-name').val()}
    $.ajax({
        url: '/authentication/admin/create',
        type: 'post',
        data: data
    });
});