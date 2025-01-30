let get = document.getElementById('get');
let remove = document.getElementById('remove');
let frame = document.getElementById('frame');
let watchId = null; // Variable to store the watch ID

get.addEventListener('click', () => {
    watchId = navigator.geolocation.watchPosition(sucessFunc, showError);
});

function sucessFunc(e) {
    let lat = e.coords.latitude;
    let long = e.coords.longitude;
    console.log(lat, long);

    frame.src = "http://maps.google.com/maps?q=" + lat + "," + long;
}

function showError(error) {
    switch (error.code) {
        case error.PERMISSION_DENIED:
            alert("User denied the request for Geolocation.");
            break;
        case error.POSITION_UNAVAILABLE:
            alert("Location information is unavailable.");
            break;
        case error.TIMEOUT:
            alert("The request to get user location timed out.");
            break;
        default:
            alert("An unknown error occurred.");
            break;
    }
}

remove.addEventListener('click', () => {
    if (watchId !== null) {
        navigator.geolocation.clearWatch(watchId);
        watchId = null; // Reset the watchId
        alert("Location tracking stopped.");
    } else {
        alert("No location tracking to remove.");
    }
});