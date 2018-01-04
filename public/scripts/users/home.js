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
    let logout = `
        <form class="user-logout" role="form" >
            <input type="submit" value="Logout" id="logout" class="logout-button">
        </form>`;
    let name = `<h1 class="user-welcome">Hello ${data.fullName}</h1>`;
    $('.user-header').html(logout);
    $('.user-name').html(name);
    userLogout();
};

const renderTests = () => {
    let token = localStorage.getItem('token');
    let userId = localStorage.getItem('userId');
    $.ajax({
        url: `/users/score/${userId}`,
        type: 'get',
        contentType: 'application/json',
        headers: {
            token: token
        },
        success: renderTestData
    });
};

let tests;
const renderTestData = data => {
    let tests = data;
    console.log(data);
    for (i=0; i < data.score.length; i++) {
        tests += `
        <tr class="user-test-info">
            <td class="test-id" testid="${data.score[i].id}">${data.score[i].title}</td>
            <td>${data.score[i].score}</td>
        </tr>`;
    };
    $('.test-table').append(tests);
    $('.test-table td').on('click', function(event) {
        let testid = $(this).attr('testid');
        localStorage.setItem('testid', testid);
        window.location.href='/tests/test/';
    }); 
};

const userLogout = () => {
    $('.user-logout').on('submit', function(event) {
        event.preventDefault();
        console.log('Logging out');
        localStorage.clear();
        window.location.href='/';
    });
}

const verifyUser = () => {
    const userId = localStorage.getItem('userId');
    $.ajax({
        url: '/authentication/verifyUser',
        type: 'post',
        contentType: 'application/json',
        data: JSON.stringify({userId: userId}),
        success: function(response) {
            console.log(response)
        },
        error: function() {
            window.location = '/authentication/userLogin';
        }
    });
}

function handleFunctions () {
    verifyUser();
    renderUserHome();
    renderTests();
};

$(handleFunctions);