const viewTests = () => {
    $('#dropdown-menu').click(event => {
        console.log('hi');
        event.preventDefault();  
        let options = '';
        $('#dropdown-menu').each(function(value) {
            options += `<option value = "${value}">${value}</option>`;
        });
        $('#dropdown-menu').append(options);
        $.ajax({
            url: '/tests/list',
            type: 'get',
            contentType: 'application/json',
            success: function(data) {
                console.log(data);    
            }
        });
    });
};

function handleFunctions () {
    viewTests();
};

$(handleFunctions);