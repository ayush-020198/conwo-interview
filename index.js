const express = require('express');
const request = require('request');
const cors = require('cors');
const app = express();

const nodemailer = require('nodemailer');
let cron = require('node-cron');


app.use(express.json());
app.use(cors());


app.get('/', (req, res) => {
    res.send('Hello');
})

app.post('/schedule', (req, res) => {
    
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

        newTimeArr = [];
        
        var j, flag=0;
        for(j=0; j<timeOfJourney.length; j++){
            if(timeOfJourney[1]==='m' || timeOfJourney[2]==='m') break;
            if((timeOfJourney[j]>='a' && timeOfJourney[j]<='z')){
                flag=1;
                continue;
            }
            if(flag===1) {
                flag=0;
                break;
            }
            newTimeArr.push(parseInt(timeOfJourney[j]));
        }
        newTimeArr.push(':');
        
        if(newTimeArr[1] === ':'){
            newTimeArr.unshift(0);
        }

        while(j<timeOfJourney.length){
            if((timeOfJourney[j]>='a' && timeOfJourney[j]<='z') || timeOfJourney[j]===' '){
                break;
            }
            newTimeArr.push(parseInt(timeOfJourney[j]));
            j++;
        }

        if(newTimeArr.length===3 && newTimeArr[2]===':'){
            newTimeArr.push(0);
            newTimeArr.push(0);
        }

        if(newTimeArr.length<=3 && newTimeArr[0]===':'){
            newTimeArr.splice(0,0,0);
            newTimeArr.splice(0,0,0);
        }

        if(newTimeArr.length===4){
            newTimeArr.splice(3, 0, 0);
        }
        
        let timeToReach = newTimeArr.join().replace(/,/g,""); 

        let diffHr = (parseInt(reach[0])*10 + parseInt(reach[1])) - (parseInt(timeToReach[0])*10 + parseInt(timeToReach[1]));
        if(diffHr<0){
            diffHr = 24+diffHr;
        }

        let diffMin = (parseInt(reach[3])*10 + parseInt(reach[4])) - (parseInt(timeToReach[3])*10 + parseInt(timeToReach[4]));

        if(diffMin<0){
            if((parseInt(timeToReach[3])*10 + parseInt(timeToReach[4]))===60){
                diffHr= diffHr-1;
                diffMin = 60+diffMin;
            } else{
                diffMin = 60+diffMin;
             }
        }

        console.log("Time to reach "+reach);
        console.log("Time taken to reach "+timeToReach);
        console.log("Time to send the mail "+diffHr+":"+diffMin);

        const mailOptions = {
            from: 'hatimsrinivas@gmail.com',
            to: req.body.user.customer.email,
            subject: 'Test',
            text: 'Hi'
        };

        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: 'hatimsrinivas@gmail.com',
                pass: 'hatim@123'
            }
        })

        var task = cron.schedule(diffMin +' '+ diffHr + ' * * *', () =>  {    
            transporter.sendMail(mailOptions, function(error, info){
                if(error){
                    console.log(error);
                    task.destroy();
                } else {
                    console.log('Email sent: ' + info.response);
                    task.destroy();
                }
            })
        });

    });
});

app.listen(process.env.PORT || 3001, () => {
    console.log('Server is running on Port 3001')
})
