const renderAdminHome = () => {
    let adminId = localStorage.getItem('userId');
    let adminToken = localStorage.getItem('token');
    $.ajax({
        url: `/tests/admin/${adminId}`,
        type: 'get',
        contentType: 'application/json',
        headers: {
            token: adminToken
        },
        success: renderAdminData
    });
};

const renderAdminData = data => {
    let logout = `
        <form class="admin-logout" role="form" >
            <input type="submit" value="Logout" id="logout" class="logout-button">
        </form>`;
    let name = `<p class="admin-welcome">Hello ${data.fullName} </br>
                Please select an option below to get started.</p>`;
    $('.logout-admin').html(logout);
    $('.welcome-instruct').html(name);
    adminLogout();
};

const adminLogout = () => {
    $('.admin-logout').on('submit', function(event) {
        event.preventDefault();
        console.log('Logging out');
        localStorage.clear();
        window.location.href='/authentication';
    });
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
    renderAdminHome();
};

$(handleFunctions);