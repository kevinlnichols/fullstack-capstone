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
    console.log(data);    
}

function handleFunctions () {
    viewUsers();
};

$(handleFunctions);