const handleMail = require('./MailLogic')
const handleTimeLoop = require('./TimeLoop')

const TimeLogic = (req, reach, timeOfJourney) => {
        
        let timeToReach = handleTimeLoop.TimeLoop(timeOfJourney)

        let diffHr = (parseInt(reach[0])*10 + parseInt(reach[1])) - (parseInt(timeToReach[0])*10 + parseInt(timeToReach[1]));

        let diffMin = (parseInt(reach[3])*10 + parseInt(reach[4])) - (parseInt(timeToReach[3])*10 + parseInt(timeToReach[4]));
        if(diffMin<0){
            diffHr= diffHr-1;
            diffMin = 60+diffMin;
        }

        if(diffHr<0) diffHr+=24;

        console.log("Mail will be sent at "+diffHr+":"+diffMin);
        console.log("Time of reaching "+reach);
        console.log("Time taken to reach "+timeToReach)

        handleMail.MailLogic(req, diffMin, diffHr);
        
}

module.exports = {
    TimeLogic
};