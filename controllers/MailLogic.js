const nodemailer = require('nodemailer');
const cron = require('node-cron');

const MailLogic = (req, diffMin, diffHr) => {
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
    console.log("Mail Scheduled");
}

module.exports = {
    MailLogic
};