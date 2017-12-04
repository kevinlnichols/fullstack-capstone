const viewTests = () => {
    $.ajax({
        url: '/tests/list',
        type: 'get',
        contentType: 'application/json',
        success: function(data) {
                let options = '';
                for (i=0; i < data.length; i++) {
                    console.log(data[i]);
                    options += `<option value="${data[i]._id}">${data[i].testTitle}</option>`;
                };
                $('#dropdown-menu').append(options);
                viewTestDetails();
        }
    });
};

const viewTestDetails = () => {
    $('#dropdown-menu').change(event => {
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
                let viewTestTitle = `<h1>Test Title: ${data.testTitle}</h1>`;
                let viewTest = `${questionsTemplate}`;
                $('.view-test-title').html(viewTestTitle);
                $('.view-test').html(viewTest);
                deleteQuestion();
            }
        });
    });
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
                data.questions.forEach(question => {
                    for (let key in question._id) {
                        if (question._id[key] === id) {
                            delete question._id[key]
                        }
                    }
                });
            }
        });
    });
}

function handleFunctions () {
    viewTests();
};

$(handleFunctions);