// preloader

$(window).on('load', function () {
    $('#status').delay(2000).fadeOut();
    $('#preloader').delay(2250).fadeOut('slow');
    $('body').delay(2250).css({
        'overflow': 'visible'
    });
});

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