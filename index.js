const express = require('express');
const cors = require('cors');
const app = express();

app.use(express.json());
app.use(cors());


app.get('/', (req, res) => {
    res.send('Hello');
})

app.post('/schedule', (req, res) => {
    const customer = {
        sLat: req.body.sLat,
        sLong: req.body.sLong,
        dLat: req.body.dLat,
        dLong: req.body.dLong,
        time: req.body.time,
        email: req.body.email
    }

    res.send(req.body);
})

app.listen(process.env.PORT || 3001, () => {
    console.log('Server is running on Port 3001')
})