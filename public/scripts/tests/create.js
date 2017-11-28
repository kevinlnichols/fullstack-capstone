
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
                    <input disabled class="input-border" type="text" placeholder="Enter Question Here" class="testTitle" id="testTitle" value="${question.title}">
                </div>
                <div class="create-test-answers">
                    <input disabled class="input-border" type="text" placeholder="Choice 1" value="${question.answerChoices.choice1}">
                    <input disabled class="input-border" type="text" placeholder="Choice 2" value="${question.answerChoices.choice2}">
                    <input disabled class="input-border" type="text" placeholder="Choice 3" value="${question.answerChoices.choice3}">
                    <input disabled class="input-border" type="text" placeholder="Choice 4" value="${question.answerChoices.choice4}">
                    <input disabled class="input-border question-spacer" type="text" placeholder="Correct Answer" value="${question.correctAnswer}">
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
        console.log(testData);
        $.ajax({
            url: '/tests/create',
            type: 'post',
            data: JSON.stringify(testData),
            contentType: 'application/json',
            success: function() {
                //window.location.href = '/tests';      
            }
        });
    });
};

const saveAndAddQuestion = () => {
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
};

function handleFunctions () {
    addQuestion();
    submitTest();

};

$(handleFunctions);