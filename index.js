const express = require('express');
const handleLogic = require('./controllers/Logic');
const cors = require('cors');
const app = express();



app.use(express.json());
app.use(cors());


app.get('/', (req, res) => {
    res.send('Hello');
})

app.post('/schedule', (req, res) => {
    handleLogic.Logic(req, res);
   
});

app.listen(process.env.PORT || 3001, () => {
    console.log('Server is running on Port 3001')
})
