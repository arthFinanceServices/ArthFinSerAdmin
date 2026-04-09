const mongoose = require('mongoose');

const connectDb = async()=>{
    try {
        await mongoose.connect(process.env.MOBGODB_URI);
        console.log("mongodb connected successfully");
    } catch (error) {
        console.log("Error in connecting db");
        console.log(error);
    }
}

module.exports = connectDb;