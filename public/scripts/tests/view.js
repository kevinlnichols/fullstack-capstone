const viewTests = () => {
    $.ajax({
        url: '/tests/list',
        type: 'get',
        contentType: 'application/json',
        success: function(data) {
                let options = '';
                for (i=0; i < data.length; i++) {
                    console.log(data[i]);
                    options += `<option aria-label="${data[i].testTitle}" value="${data[i]._id}">${data[i].testTitle}</option>`;
                };
                $('#dropdown-menu').append(options);
                viewTestDetails();
        }
    });
};

const viewTestDetails = () => {
    $('#dropdown-menu').change(event => {
       getTestFromApi();
    });
}

const getTestFromApi = () => {
    let id = $('#dropdown-menu').find(':selected').val();
    $.ajax({
        url: `/tests/list/${id}`,
        type: 'get',
        contentType: 'application/json',
        success: function(data) {

            let questionsTemplate = '';
            
            data.questions.forEach(question => {
                let questionChoices = '';
                for (let key in question.answerChoices) {
                    questionChoices += `<p>${question.answerChoices[key]}</p>`
                }
                questionsTemplate += 
                    `<div class="question">
                        <h3>Question: ${question.title}</h3>
                        <p>Correct Answer: ${question.correctAnswer}</p>
                        <p>${questionChoices}</p>
                        <button data-testid="${data._id}" data-questionid="${question._id}" class="delete-question">Delete Question</button>
                    </div>`;
            });
            let viewTestTitle = 
                `<h1>Test Title: ${data.testTitle}</h1>
                <button data-testid="${data._id}" class="delete-test">Delete Test</button>`;
            let viewTest = `${questionsTemplate}`;
            $('.view-test-title').html(viewTestTitle);
            $('.view-test').html(viewTest);
            deleteTest();
            deleteQuestion();
        }
    });
}

const deleteTest = () => {
    $('.delete-test').on('click', function(event) {
        event.preventDefault();
        let testid = $(this).attr('data-testid');
        console.log(testid);
        $.ajax({
            url: `/tests/list/delete/${testid}`,
            type: 'delete',
            success: function(data) {
                window.location.reload(true);
                viewTests();
            }
        });
    })
}

const deleteQuestion = () => {
    $('.delete-question').on('click', function(event) {
        event.preventDefault();
        let testid = $(this).attr('data-testid');
        let questionid = $(this).attr('data-questionid');
        console.log(testid, questionid);
        $.ajax({
            url: `/tests/list/delete/${testid}/${questionid}`,
            type: 'delete',
            success: function(data) {
                getTestFromApi();
            }
        });
    });
}

function handleFunctions () {
    viewTests();
};

$(handleFunctions);