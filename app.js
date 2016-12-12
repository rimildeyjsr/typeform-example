
var first_page = "one";

/////////////////////
// Individual page actions
/////////////////////
var pages = {
    "page_one": function() {
        fadeInStepsInPage('one', ['one', 'two', 'three', 'four']);
        // When the user clicks on the ready button, go to page two
        this.on('click', '#ready', function() {
            goToPage('two');
        });
    },
    "page_two": function() {
        // Defer and focus the form for user input
        setTimeout(function() {
            $('#form').attr('src', 'https://forms.typeform.io/to/5E769Xwujc');
            $('#form').focus();
        }, 0);

        $(window).on('message', function(ev) {
            if(ev.originalEvent.data === 'form-submit') {
                goToPage('three');
                formEventHaveBeenSubmitted();
            }
        });
    },
    "page_three": function() {
        fadeInStepsInPage('three', ['one', 'two', 'three', 'four']);
    },
}

$(document).ready(function() {
    goToPage(first_page);
});

function hideAllPages() {
    Object.keys(pages).forEach(function(page) {
        $('#' + page).hide();
    });
}

// Hides all the pages, show the one declared in page_name and then executes the
// page function
function goToPage(page_name) {
    hideAllPages();
    $page = $('#page_' + page_name);
    $page.show();
    pages['page_' + page_name].bind($page)();
}

// Function to switch the status of the debug event-status
function formEventHaveBeenSubmitted() {
    $('.event_not_yet').hide();
    $('.event_submitted').fadeIn();
}

// Function to animate the steps like a flashy intro
function fadeInStepsInPage(page, steps) {
    if(steps.length > 0) {
        $('#page_' + page + ' .step_' + steps[0]).fadeIn(1000, function() {
            fadeInStepsInPage(page, steps.slice(1));
        });
    }
}