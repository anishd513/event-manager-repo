const request = require('request');

const geocode = (address, callback) => {
    const url = "https://api.mapbox.com/geocoding/v5/mapbox.places/" + encodeURIComponent(address) + ".json?types=country&access_token=pk.eyJ1IjoiYW5pc2g1MTMyIiwiYSI6ImNreThwMXQxMzEyMjEycHBmdTkyZjc1NXcifQ.D_ueGbAm2DnYcdeBs0JuYg&limit=1";
    request({ url: url, json: true }, (error, { body }) => {
        //console.log(response.body.features.length);
        if (error) {
            callback("unable to connect to location services", undefined);
        }
        else if (body.features.length === 0) {
            callback("unable to find the given location", undefined)

        }
        else {
            callback(undefined, {
                latitude: body.features[0].center[1],
                longitude: body.features[0].center[0],
                location: body.features[0].place_name
            })
        }

    })
}
module.exports = geocode;