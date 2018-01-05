const renderTest = () => {
    let testid = localStorage.getItem('testid');
    $.ajax({
        url: `/tests/test/${testid}`,
        type: 'get',
        contentType: 'application/json',
        success: renderTestData
    });
};

const renderTestData = (data) => {
    let title = `<h1>${data.testTitle}</h1>`;
    $('.take-test-title').html(title);
    let choices = (choices) => {
        let choicesGroup = '';
        for(choice in choices) {
            choicesGroup += `<option aria-label="${choices[choice]}">${choices[choice]}</option>` 
        }
        return choicesGroup;
    };   
    let question = (question, index) => `
        <div class="test-question">
            <h3>${question.title}</h3>
            <select class="question-select" data-id="${index}" aria-label="Answer Select Dropdown">${choices(question.answerChoices)}</select>
        </div>
    `;
    let questionsGroup = '';
    data.questions.forEach((item, index) => {
        questionsGroup += question(item, index);
    });
    $('.take-test-questions-form').append(questionsGroup);
    $('.take-test-questions-form').append(`<button class="submit-test-button" aria-label="Submit">Submit Answers</button>`);
    submitTest(data);
};

const submitTest = (data) => {
    $('.take-test-questions-form').submit((event) => {
        event.preventDefault();
        let answerWrong = 0;
        let answerRight = 0;
        $('.question-select').each(function(item) {
            if ($(this).val() === data.questions[$(this).attr('data-id')].correctAnswer) {
                answerRight++;
            } else {
                answerWrong++;
            }
        });
        let payload = {
            userId: localStorage.getItem('userId'),
            testId: data._id,
            answerRight: answerRight,
            answerWrong: answerWrong
        }
        $.ajax({
            url: '/users/results',
            type: 'put',
            data: JSON.stringify(payload),
            contentType: 'application/json',
            success: function() {
                window.location.href = '/users/home';      
            }
        });
    });
};

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
    renderTest();
};

$(handleFunctions);