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
        success: renderUserData
    });
};

const renderUserData = data => {
    let name = `<h1 class="user-welcome">Hello ${data.fullName}</h1>`;
    $('.user-name').html(name);
};

const renderTests = () => {
    $.ajax({
        url: '/tests/list/',
        type: 'get',
        contentType: 'application/json',
        success: renderTestData
    });
};


const renderTestData = data => {
    let tests = '';
    for (i=0; i < data.length; i++) {
        tests += `
        <tr class="user-test-info">
            <td class="test-id" testid="${data[i]._id}" id="take-test">${data[i].testTitle}</td>
            <td>Not Completed%</td>
        </tr>`;
    };
    $('.test-table').append(tests);
    $('.test-table td').on('click', function(event) {
        let testid = $(this).attr('testid');
        localStorage.setItem('testid', testid);
        console.log("hello");
        window.location.href='/tests/test/';
    }); 
};



function handleFunctions () {
    renderUserHome();
    renderTests();
};

$(handleFunctions);