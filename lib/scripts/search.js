var selected = {
    first: null,
    second: null,
    round: false
}

function selectFlightOneWay(seat_type, ID) {
    
    selected.first = {
        seat_type: seat_type,
        FlightID: ID
    }

    $('#selectButton').show()
    
}

function selectFlightTwoWay(ticket_type, seat_type, ID) {
    
    if (ticket_type == 'Departure') {
        selected.first = {
            seat_type: seat_type,
            FlightID: ID
        }    
    } 
    else {
        selected.second = {
            seat_type: seat_type,
            FlightID: ID
        }  
    }

    if (selected.first !== null && selected.second !== null) {
        $('#selectButton').show()
    }
}

function oneWay() {
    
    var arrival = document.getElementById('arrival-col')

    if (typeof oneWay.width == 'undefined') {
        oneWay.width = arrival.offsetWidth
    }

    if (arrival.style.display == "block" || arrival.style.display == "") {
        arrival.style.display = "none"
    }
    else {
        arrival.style.display = "block"
    }
}


var datePickers = document.getElementsByClassName("date-picker");
for (let i = 0; i < datePickers.length; i++) {

    datePickers[i].addEventListener('focusin', function() {
        datePickers[i].type='date'
    })
    datePickers[i].addEventListener('focusout', function() {
        datePickers[i].type='text'
    })
}

//send search ajax
function searchQuery() {
    //alert(econ.A)
    $('#selectButton').hide()
    var roundTrip = false
    var from = document.getElementById('from').value
    var to = document.getElementById('to').value
    var departure = document.getElementById('departure').value
    var arrival = document.getElementById('arrival').value

    var oneWayTrip = document.getElementById('one-way')
    if (oneWayTrip.checked == false) {
        roundTrip = true
    } 

    console.log(roundTrip)
    console.log(to)
    console.log(from)
    console.log(departure)
    console.log(arrival)

    url = 'http://localhost:3000/search/findFlights'

    //url = url + '-' +roundTrip + "-"+to + "-" +from + "-"+departure+"-" +arrival  

    $.get({
        url: url,
        data: {
            roundTrip: roundTrip,
            to: to,
            from: from, 
            departure: departure,
            arrival:arrival
        },
        success: function(data) {
            selected.first = null
            selected.second = null

            if(roundTrip) {
                selected.round = true
                console.log('Round')
                console.log(data)
                fillTwoWayResults(data)
            }
            else {
                selected.round = false
                console.log('One way')
                fillOneWayResults(data)
            }
        }
    })

}

$(document).ready(
    function() {
        
    }
)


function fillTwoWayResults(data_received) {
    console.log(data_received)
    $('#search-result').html('');
    $('#search-result-arrival').html('');

    if (data_received.arrival.length > 0 && data_received.departure.length > 0) {

        html_departure_header = ` <div class="row">
    <h1 style="color:#231818">Departure Flights</h1>
    <div class="col-6 row" style="padding:0px"></div>
    <div class="col-6 row">
        <div class="col-1"></div>
            <div class="col-5 text-center" style="height:30px; background-color: #D81324; color:white">
                Economy
            </div>
            <div class="col-5 text-center" style="height:30px; background-color: #207e33; color:white">
                Business
            </div>      
    </div>
    </div>`

        html_arrival_header = `   <div class="row">
    <h1 style="color:#231818">Arrival Flights</h1>
    <div class="col-6 row" style="padding:0px"></div>
    <div class="col-6 row">
        <div class="col-1"></div>
            <div class="col-5 text-center" style="height:30px; background-color: #D81324; color:white">
                Economy
            </div>
            <div class="col-5 text-center" style="height:30px; background-color: #207e33; color:white">
                Business
            </div>      
    </div>
    </div>`
        $('#search-result').append(html_departure_header);
        $('#search-result-arrival').append(html_arrival_header);

        data = data_received.departure

        inner = ""

        for (let i = 0; i < data.length; i++) {
            content = `<div class="row result-box">
        <div class="col-6 row" style="padding:0px">
            <div class="col-4 py-3 ps-4">
            <h2>`
            from_date = new Date(data[i].Departure)
            hour = from_date.getHours()
            from_time = from_date.toLocaleTimeString(navigator.language, { hour: '2-digit', minute: '2-digit' }).replace(/(:\d{2}| [AP]M)$/, "")

            content += from_time

            if (hour < 12) {
                content += ' AM'
            } else {
                content += ' PM'
            }

            content += '</h2><h3>' + data[i].location_from + '</h3><h6>' + data[i].date_departure + '</h6></div>'

            content += `<div class="col-4" style="margin:auto auto">
        <p class="text-center" style="position: absolute;margin-left: 3.5rem;margin-top: -17px;">24:00</p>
        <div>
            <i class="fas fa-plane me-2"></i>
            <img src="img/arrow.png" style="margin-bottom: 4px; width:60%">
            <i class="fas fa-plane ms-2"></i>
        </div>
    </div>
    <div class="col-4 py-3">
        <h2>`

            to_date = new Date(data[i].Arrival)
            hour = to_date.getHours()
            to_time = to_date.toLocaleTimeString(navigator.language, { hour: '2-digit', minute: '2-digit' }).replace(/(:\d{2}| [AP]M)$/, "")

            content += to_time
            if (hour < 12) {
                content += ' AM'
            } else {
                content += ' PM'
            }
            content += '</h2><h3>'
            content += data[i].location_to + '</h3><h6>' + data[i].date_arrival + '</h6>'

            content += `</div>
        </div>
    
        <div class="col-6 row">
            <div class="col-1"></div>
            <div class="col-5 text-center" style="height:100%; background-color: #e2ffe2; border-left:1px solid #207e33; border-right: 1px solid #207e33;">
                <h4 class="text-center mt-3">PKR <br>`

            content += data[i].Economy_Fare

            content += `</h4>
        <button type="button" class="btn btn-success text-center ms-auto" onclick ="selectFlightTwoWay('Departure', 'Economy',` +data[i].FlightID + `)">Select</button>
        </div>
        <div class="col-5 text-center" style="height:100%; background-color: #fff3d1;; border-right: 1px solid #207e33;">
        <h4 class="text-center mt-3">PKR <br>`

            content += data[i].Business_Fare

            content += `</h4>
        <button type="button" class="btn btn-success text-center ms-auto" onclick ="selectFlightTwoWay('Departure', 'Business',` +data[i].FlightID + `)">Select</button>
        </div>
        </div></div>`

            inner += content
        }

        $('#search-result').append(inner)

        data = data_received.arrival

        inner = ""

        for (let i = 0; i < data.length; i++) {
            content = `<div class="row result-box">
        <div class="col-6 row" style="padding:0px">
            <div class="col-4 py-3 ps-4">
            <h2>`
            from_date = new Date(data[i].Departure)
            hour = from_date.getHours()
            from_time = from_date.toLocaleTimeString(navigator.language, { hour: '2-digit', minute: '2-digit' }).replace(/(:\d{2}| [AP]M)$/, "")

            content += from_time

            if (hour < 12) {
                content += ' AM'
            } else {
                content += ' PM'
            }

            content += '</h2><h3>' + data[i].location_from + '</h3><h6>' + data[i].date_departure + '</h6></div>'

            content += `<div class="col-4" style="margin:auto auto">
        <p class="text-center" style="position: absolute;margin-left: 3.5rem;margin-top: -17px;">24:00</p>
        <div>
            <i class="fas fa-plane me-2"></i>
            <img src="img/arrow.png" style="margin-bottom: 4px; width:60%">
            <i class="fas fa-plane ms-2"></i>
        </div>
    </div>
    <div class="col-4 py-3">
        <h2>`

            to_date = new Date(data[i].Arrival)
            hour = to_date.getHours()
            to_time = to_date.toLocaleTimeString(navigator.language, { hour: '2-digit', minute: '2-digit' }).replace(/(:\d{2}| [AP]M)$/, "")

            content += to_time
            if (hour < 12) {
                content += ' AM'
            } else {
                content += ' PM'
            }
            content += '</h2><h3>'
            content += data[i].location_to + '</h3><h6>' + data[i].date_arrival + '</h6>'

            content += `</div>
        </div>
    
        <div class="col-6 row">
            <div class="col-1"></div>
            <div class="col-5 text-center" style="height:100%; background-color: #e2ffe2; border-left:1px solid #207e33; border-right: 1px solid #207e33;">
                <h4 class="text-center mt-3">PKR <br>`

            content += data[i].Economy_Fare

            content += `</h4>
        <button type="button" class="btn btn-success text-center ms-auto" onclick ="selectFlightTwoWay('Arrival', 'Economy',` +data[i].FlightID + `)">Select</button>
        </div>
        <div class="col-5 text-center" style="height:100%; background-color: #fff3d1;; border-right: 1px solid #207e33;">
        <h4 class="text-center mt-3">PKR <br>`

            content += data[i].Business_Fare

            content += `</h4>
        <button type="button" class="btn btn-success text-center ms-auto" onclick ="selectFlightTwoWay('Arrival', 'Business',` +data[i].FlightID + `)">Select</button>
        </div>
        </div></div>`

            inner += content
        }
        $('#search-result-arrival').append(inner)
    } //endif
    else {
        $('#search-result').html('<h5>No round trip flights found on said dates</h5>');
    }

}



function fillOneWayResults(data) {

    console.log(data)
    $('#search-result').html('')
    $('#search-result-arrival').html('')
    inner = ""

    if (data.length > 0) {
        for (let i = 0; i < data.length; i++) {
            content = `<div class="row result-box">
            <div class="col-6 row" style="padding:0px">
                <div class="col-4 py-3 ps-4">
                <h2>`
            from_date = new Date(data[i].Departure)
            hour = from_date.getHours()
            from_time = from_date.toLocaleTimeString(navigator.language, {hour: '2-digit', minute:'2-digit'}).replace(/(:\d{2}| [AP]M)$/, "")
    
            content += from_time
    
            if(hour < 12) {
                content += ' AM'
            } else {
                content += ' PM'
            }
    
            content += '</h2><h3>' + data[i].location_from + '</h3><h6>' + data[i].date_departure + '</h6></div>'
    
            content += `<div class="col-4" style="margin:auto auto">
            <p class="text-center" style="position: absolute;margin-left: 3.5rem;margin-top: -17px;">24:00</p>
            <div>
                <i class="fas fa-plane me-2"></i>
                <img src="img/arrow.png" style="margin-bottom: 4px; width:60%">
                <i class="fas fa-plane ms-2"></i>
            </div></div><div class="col-4 py-3"><h2>`
    
            to_date = new Date(data[i].Arrival)
            hour = to_date.getHours()
            to_time = to_date.toLocaleTimeString(navigator.language, {hour: '2-digit', minute:'2-digit'}).replace(/(:\d{2}| [AP]M)$/, "")
    
            content += to_time
            if(hour < 12) {
                content += ' AM'
            } else {
                content += ' PM'
            }
            content += '</h2><h3>'
            content += data[i].location_to + '</h3><h6>' + data[i].date_arrival + '</h6>'
    
            content += `</div>
            </div>
        
            <div class="col-6 row">
                <div class="col-1"></div>
                <div class="col-5 text-center" style="height:100%; background-color: #e2ffe2; border-left:1px solid #207e33; border-right: 1px solid #207e33;">
                    <h4 class="text-center mt-3">PKR <br>`
    
            content += data[i].Economy_Fare
    
            content += `</h4>
            <button type="button" class="btn btn-success text-center ms-auto" `
            content += `onclick = "selectFlightOneWay('Economy',` + data[i].FlightID + `)"`
            content += `>Select</button>
            </div>
            <div class="col-5 text-center" style="height:100%; background-color: #fff3d1;; border-right: 1px solid #207e33;">
            <h4 class="text-center mt-3">PKR <br>`
    
            content += data[i].Business_Fare
    
            content += `</h4>
            <button type="button" class="btn btn-success text-center ms-auto" onclick ="selectFlightOneWay('Business',` +data[i].FlightID + `)">Select</button>
            </div>
            </div></div>`    
    
            console.log(content)
            inner += content
        }
    
        $('#search-result').append(inner)
    }
    else {
        $('#search-result').html('<h5>No flights found on said date</h5>');
    }

}

$('#selectButton').click(function() {
    $('#booking-data').val(JSON.stringify(selected))
    $('#booking-form').submit()
})
