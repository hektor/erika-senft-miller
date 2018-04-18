// submit on enter

$(document).ready(function() {
    $('.commentarea').keydown(function(event) {
        if (event.keyCode == 13) {
            this.form.submit();
            return false;
         }
    });
});


// disable tab key

$(document).keydown(function(objEvent) {
    if (objEvent.keyCode == 9) {  //tab pressed
        objEvent.preventDefault(); // stops its action
    }
})