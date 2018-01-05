const viewUsers = () => { 
    $.ajax({
        url: '/users/list',
        type: 'get',
        contentType: 'application/json',
        success: renderUserTable
    });
};

const renderUserTable = (data) => {
    let users = '';
    data.sort();
    for (i=0; i < data.length; i++) {
        users += `
        <tr class="user-test-info">
            <td>${data[i].fullName}</td>
            <td>${data[i].username}</td>
            <td>Will complete later.</td>
        </tr>`;
    };
    
    $('.user-table').append(users);  
}

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
    viewUsers();
};

$(handleFunctions);