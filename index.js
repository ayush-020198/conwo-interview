const express = require('express');
const handleLogic = require('./controllers/Logic');
const cors = require('cors');
const app = express();



app.use(express.json());
app.use(cors());

app.post('/schedule', (req, res) => {
    handleLogic.Logic(req, res);
   
});

if(process.env.NODE_ENV === 'production'){
    app.use(express.static('client/build'));

    const path = require('path');
    app.get('*', (req, res) =>{
        res.sendFile(path.resolve(__dirnmame, 'client', 'build', 'index.html' ))
    })
}

app.listen(process.env.PORT || 3001, () => {
    console.log('Server is running on Port 3001')
})
