const express = require('express');
const app = express();
const PORT = 8000;
require("./db/conn");
const users = require('./models/schema');
const cors = require('cors');
const router = require('./routes/router');

app.use(cors());
app.use(express.json());
app.use(router);

app.listen(PORT,()=>{
    console.log(`server listening at port ${PORT}`);
})