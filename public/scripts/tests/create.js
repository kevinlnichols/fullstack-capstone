
//Add Question Template and creating a test
const addQuestion = () => {
    let questionTemplate = `
    <div id="create-test-question-container">
        <div class="create-test-question" id="create-test-question">
            <div class="create-test-title" id="create-test-title">
                <input type="text" placeholder="Enter Title Name Here" value="" class="testTitle" id="testTitle">
            </div>
            <div class="create-test-answers">
                <input type="text" placeholder="Choice 1">
                <input type="text" placeholder="Choice 2">
                <input type="text" placeholder="Choice 3">
                <input type="text" placeholder="Choice 4">
                <input type="text" placeholder="Correct Answer Index">
            </div>
        </div>
    </div>`;
    $('#addQuestion').click(() => {
        $('#create-test-question-container').append(questionTemplate);
    });
};


function handleFunctions () {
    addQuestion();
};

$(handleFunctions);