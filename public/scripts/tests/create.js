
//Add Question Template and creating a test
let questionCount = 1;

class question {
    constructor(question) {
        this.title = question.title;
        this.answerChoices = question.answerChoices;
        this.correctAnswer = question.correctAnswer;
    }
}

let testData = {
    testTitle: '',
    questions: []
}

testData.testTitle = 'title';


const render = testData => {
    $('#create-test-questions-container').html('');
    testData.questions.forEach((question, index) => {
        index++;
        $('#create-test-questions-container').append(`    
            <div class="create-test-question">
                <div class="create-test-title">
                    <p>Question ${index}</p>
                    <input disabled aria-label="question" class="input-border" type="text" placeholder="Enter Question Here" class="testTitle" id="testTitle" value="${question.title}" required>
                </div>
                <div class="create-test-answers">
                    <input disabled aria-label="create choice 1" class="input-border" type="text" placeholder="Choice 1" value="${question.answerChoices.choice1}" required>
                    <input disabled aria-label="create choice 2" class="input-border" type="text" placeholder="Choice 2" value="${question.answerChoices.choice2}" required>
                    <input disabled aria-label="create choice 3" class="input-border" type="text" placeholder="Choice 3" value="${question.answerChoices.choice3}" required>
                    <input disabled aria-label="create choice 4" class="input-border" type="text" placeholder="Choice 4" value="${question.answerChoices.choice4}" required>
                    <input disabled aria-label="correct choice" class="input-border question-spacer" type="text" placeholder="Correct Answer" value="${question.correctAnswer}" required>
                </div>
            </div>`);
    });
};

const addQuestion = () => {
    $('#addQuestion').click((e) => {
        e.preventDefault();
        saveAndAddQuestion();
        render(testData);
        $('#question-title').val('');
        $('#choice1').val('');
        $('#choice2').val('');
        $('#choice3').val('');
        $('#choice4').val('');
        $('#correct-answer').val('');
    });
};

const submitTest = () => {
    $('#submit-test').click(event => {
        event.preventDefault();
        testData.testTitle = $('#quiz-title').val();
        saveAndAddQuestion();
        $.ajax({
            url: '/tests/create',
            type: 'post',
            data: JSON.stringify(testData),
            contentType: 'application/json',
            success: function() {
                window.location.href = '/tests';      
            }
        });
    });
};

const saveAndAddQuestion = () => {
    if ($('#choice1').val() !== '' && $('#choice2').val() !== '' && $('#choice3').val() !== '' && $('#choice4').val() !== '' && $('#question-title').val() !== '') {
        let questionOne = new question({
            title: $('#question-title').val(),
            answerChoices: {
                choice1: $('#choice1').val(),
                choice2: $('#choice2').val(),
                choice3: $('#choice3').val(),
                choice4: $('#choice4').val()
            },
            correctAnswer: $('#correct-answer').val()
        });
        testData.questions.push(questionOne);
    }
    else {
        alert('You cannot leave a field blank');
    }
};

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
    addQuestion();
    submitTest();

};

$(handleFunctions);