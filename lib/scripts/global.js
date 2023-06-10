function validateBookingForm() {

    var name = document.getElementById('booking-name').value
    var cnic = document.getElementById('cnic').value
    var dob = document.getElementById('dob').value
    var email = document.getElementById('email').value


    if (name == "") {
        alert('Name can not be empty')
        return false
    }
    var regName = /^[a-zA-Z]+ [a-zA-Z]+$/;
    if(!regName.test(name)) {
        alert('Invalid Name')
        return false
    }

    else if (cnic.length != 13) {
        alert('Invalid CNIC')
        return false
    }

    else if (dob == "") {
        alert('Please select a Date of Birth')
        return false
    }

    else if (email == "") {
        alert('Email can not be  empty')
        return false
    }

    return true
}