const mongoose = require('mongoose');
const {MONGO_URI} = process.env;

const connectionDB = async()=>{
    try{
        await mongoose.connect(MONGO_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });
        console.log('Database connected');
    }catch(err){
        console.log(err);
    }
}

module.exports = connectionDB;
