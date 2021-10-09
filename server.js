const mongoose = require("mongoose");
const dotenv = require('dotenv');

dotenv.config({ path: './config.env' });


const app = require('./app');

const port = process.env.PORT || 3000

mongoose.connect(process.env.LOCAL_DATABASE, { useNewUrlParser: true }).then(()=>{
    app.listen(port,()=>{
        console.log(`server started on PORT: ${port}...`);
    })
}).catch((error)=>console.log(error));