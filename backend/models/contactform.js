const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const contactFormSchema = new Schema({
    name:{
        type:String,
        required: true
    },
    contactNo:{
        type: Number,
        required: true
    },
    email:{
        type: String,
        required: true
    },
    message:{
        type: String,
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
})

module.exports = mongoose.model("ContactForm", contactFormSchema);