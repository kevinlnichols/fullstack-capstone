const viewTests = () => {
    $('#dropdown-menu').one('click', event => {
        console.log('hi');
        event.preventDefault();  
        $.ajax({
            url: '/tests/list',
            type: 'get',
            contentType: 'application/json',
            success: function(data) {
                /*let options = '';
                $('#dropdown-menu').each(function(value) {
                    options += `<option value="${this.value}">${this.value}</option>`;
                });*/
               
                    let options = '';
                    for (i=0; i < data.length; i++) {
                        console.log(data);
                        options += `<option value="${data[i].testTitle}">${data[i].testTitle}</option>`;
                    };
                    
                    $('#dropdown-menu').append(options);
                    
                //$('#dropdown-menu').append(options);
                console.log(data);    
            }
        });
    });
};

const viewTestDetails = () => {
    $('option').one('click', event => {
        event.preventDefault;
        $.ajax({
            url: '/tests/list',
            type: 'get',
            contentType: 'application/json',
            success: function(data) {
               let viewTest = 
                `<h1>${data.testTitle}</h1>`;
                $('.view-test').append(viewTest);
            }
        });
    });
}

viewTests().then(viewTestDetails);

function handleFunctions () {
    viewTests();
    viewTestDetails();
};

$(handleFunctions);