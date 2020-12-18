const request = require('request');
const handleTime = require('./TimeLogic');

const Logic = (req, res) => {

    const sLat = parseFloat(req.body.user.customer.sLat);
    const sLng = parseFloat(req.body.user.customer.sLong);
    const dLat = parseFloat(req.body.user.customer.dLat);
    const dLng = parseFloat(req.body.user.customer.dLong);
    const key = 'AIzaSyAW8v9wOOvEviACg4YbowQEQn0SLplfOJM';
    const reach = req.body.user.customer.time;
    const url = 'https://maps.googleapis.com/maps/api/distancematrix/json?origins='+ sLat +','+ sLng +'&destinations='+ dLat +','+ dLng +'&key=' + key;
    const params = req.params;

    request.get({
        url, qs: params
    }, function(err, response, body){
        const box = JSON.parse(body)
        let timeOfJourney = box.rows[0].elements[0].duration.text;
        
        timeOfJourney = timeOfJourney.split(" ").join(""); 

        handleTime.TimeLogic(req, reach, timeOfJourney);        

    });

}

module.exports= {
    Logic
}