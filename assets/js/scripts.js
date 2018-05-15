// preloader

$(window).on('load', function () {
    $('#status').delay(2000).fadeOut();
    $('#preloader').delay(2250).fadeOut('slow');
    $('body').delay(2250).css({
        'overflow': 'visible'
    });
})

// input — generate random word

var questions = [
    'When do you lean in?',
    'What supports you?',
    'Where do you fall?',
    'Where do you show up?',
    'What gives you traction?',
    'How do you connect?',
    'What does collaboration look like?',
    'Does ego have a place in creative expression?',
    'How do you choose to move?',
    'What keeps you going?',
    'How do you see?',
    'How do you listen?'
    ];

var getRandomQuestion = function () {
    return questions[Math.floor(Math.random() * questions.length)];
};

$(function () {
    $('.question').html(getRandomQuestion());
});

// input — submit on enter

$(document).ready(function () {
    $('.commentarea').keydown(function (event) {
        if (event.keyCode == 13) {
            this.form.submit();
            return false;
        }
    });
});

// input — disable tab key

$(document).keydown(function (objEvent) {
    if (objEvent.keyCode == 9) { //tab pressed
        objEvent.preventDefault(); // stops its action
    }
})

// accordion

var acc = document.getElementsByClassName("accordion");
var i;

for (i = 0; i < acc.length; i++) {
    acc[i].addEventListener("click", function () {
        this.classList.toggle("open");
        var panel = this.nextElementSibling;
        if (panel.style.display === "block") {
            panel.style.display = "none";
        } else {
            panel.style.display = "block";
        }
    });
}

// perspective toggle

function openCity(evt, cityName) {
    var i, tabcontent, tablinks;
    tabcontent = document.getElementsByClassName("tabcontent");
    for (i = 0; i < tabcontent.length; i++) {
        tabcontent[i].style.display = "none";
    }
    tablinks = document.getElementsByClassName("tablinks");
    for (i = 0; i < tablinks.length; i++) {
        tablinks[i].className = tablinks[i].className.replace(" active", "");
    }
    document.getElementById(cityName).style.display = "block";
    evt.currentTarget.className += " active";
}

// Get the element with id="defaultOpen" and click on it
document.getElementById("defaultOpen").click();