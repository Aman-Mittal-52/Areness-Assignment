const express = require('express');
const cors = require('cors');
const connection = require('./config/db');
const userRoute = require('./routes/user.route');

const app = express();

app.use(cors());
app.use(express.json());
app.use('/user',userRoute)

app.get('/',(req,res)=>{
    res.send('Server is running fine...!!')
});

app.listen(4000,async ()=>{
    console.log('Server is running on port 4000')
    try {
        await connection;
    } catch (error) {

        console.log('Errorrequiring connection')
        console.log('\n')
        console.log(error)
    }
})