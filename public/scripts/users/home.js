const renderUserHome = () => {
    let userId = localStorage.getItem('userId');
    let token = localStorage.getItem('token');
    $.ajax({
        url: `/users/list/${userId}`,
        type: 'get',
        contentType: 'application/json',
        headers: {
            token: token
        },
        success: function(data) {
            let name = `<p>Hello ${data.username}</p>`;
            $('.user-name').html(name);
        }
    });
};


function handleFunctions () {
    renderUserHome();
};

$(handleFunctions);