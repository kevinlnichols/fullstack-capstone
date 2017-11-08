//Mock Data

var MOCK_USER_DATA = {
    "userData": [
        {
        "name": {
            "firstName": "Kevin",
            "lastName": "Nichols"
        },
        "username": "kevinlnichols",
        "password": "password123",
        "results": {
            "test": {
                "answerRight": 9,
                "answerWrong": 10
            }
        },
        "type": "admin"},
        {
        "name": {
            "firstName": "Finn",
            "lastName": "Nichols"
        },
        "username": "finnjnichols",
        "password": "password456",
        "results": {
            "test": {
                "answerRight": 10,
                "answerWrong": 10
            }
        },
        "type": "user"},
    ]
};

var testDataArray = [{
    title: "test Title",
    questions: [
        {
            title: "Question title",
            answers: [
                "possible answer 1",
                "possible answer 2",
                "possible answer 3",
                "possible answer 4"
            ],
            correctAnswerIndex: 0
        },
        {
            title: "Question title 2",
            answers: [
                "possible answer 1 for question 2",
                "possible answer 2 for question 2",
                "possible answer 3 for question 2",
                "possible answer 4 for question 2"
            ],
            correctAnswerIndex: 2
        }
    ]
}];



//Homepage buttons
const adminLogin = () => {
    $('#admin-button').click(() => {
        $('#signup-login-header').addClass('hidden');
        $('#admin-login-page').removeClass('hidden');
    });
};

const adminSignup = () => {
    $('#signup-button').click(() => {
        $('#signup-login-header').addClass('hidden');
        $('#signup-page').removeClass('hidden');
    });
};
const toUserLogin = () => {
    $('#user-button').click(() => {
        $('#signup-login-header').addClass('hidden');
        $('#user-login-page').removeClass('hidden');
    });
};

//Admin signup page back to main page

const adminSignupSubmit = () => {
    $('#signup-submit').click(() => {
        $('#signup-page').addClass('hidden');
        $('#signup-login-header').removeClass('hidden');
    });
};

//Admin login page to admin home page

const adminLoginSubmit = () => {
    $('#admin-submit').click(() => {
        $('#admin-login-page').addClass('hidden');
        $('#admin-home').removeClass('hidden');
    });
};

//Admin home to create user

const createUser = () => {
    $('#create-user-button').click(() => {
        $('#admin-home').addClass('hidden');
        $('#create-user-page').removeClass('hidden');
    });
};

//Admin home to view users

const viewUsers = () => {
    $('#view-user-button').click(() => {
        $('#admin-home').addClass('hidden');
        $('#user-list-page').removeClass('hidden');
    });
};

//Admin home to create test

const createTest = () => {
    $('#create-test-button').click(() => {
        $('#admin-home').addClass('hidden');
        $('#create-test-page').removeClass('hidden');
    });
};

//Admin home to view tests

const viewTest = () => {
    $('#view-test-button').click(() => {
        $('#admin-home').addClass('hidden');
        $('#test-page').removeClass('hidden');
    });
};

//List of users to individual users

const viewOneUser = () => {
    $('#').click(() => {
        $('#user-list-page').addClass('hidden');
        $('#user-info-page').removeClass('hidden');
    });
};


//Creating a user
const addUser = () => {
    $('#submit-user-button').click(() => {

    });
};

//User login page to user home page
const userLogin = () => {
    $('#user-submit').click(() => {
        $('#user-login-page').addClass('hidden');
        $('#user-home-page').removeClass('hidden');
    });
};


function handleFunctions () {
    adminLogin();
    adminSignup();
    toUserLogin();
    adminSignupSubmit();
    adminLoginSubmit();
    createUser();
    viewUsers();
    createTest();
    viewTest();
    addUser();
    userLogin();
};

$(handleFunctions);