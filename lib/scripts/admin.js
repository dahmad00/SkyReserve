var timePickers = document.getElementsByClassName("time-picker");
for (let i = 0; i < timePickers.length; i++) {

    timePickers[i].addEventListener('focusin', function() {
        timePickers[i].type='datetime-local'
    })
    timePickers[i].addEventListener('focusout', function() {
        timePickers[i].type='text'
    })
}
