const mongoose = require('mongoose');
const DB = "mongodb+srv://siddhanth:mumbaiindians0629@cluster0.becuj.mongodb.net/?retryWrites=true&w=majority";

mongoose.connect(DB,{
    useNewUrlParser:true,
    useUnifiedTopology:true
}).then(()=>console.log('connection successful')).catch((err)=>{'error'})

