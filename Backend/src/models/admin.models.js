const mongoose = require('mongoose');

const adminSchema = mongoose.Schema({
    email : {
        type : String,
        required : true,
        lowercase: true,   
        trim: true,
    },
    password : {
        type : String,
        required : true,
        trim:true
    }
})

module.exports = mongoose.model("Admin",adminSchema);
