const mongoose = require('mongoose');

const { Schema } = mongoose;
const parkingDataSchema = new Schema({
    createAt: {
        type: Date,
        required: true,
        default: new Date(new Date(Date.now()).getTime() + (3600000*9)) //KST
    },
    topic: {
        type:String,
        required: true
    },
    pNumber: {
        type:String,
        required: true
    },
    pAreaNumber:{
        type:Number,
        required:true
    },
    use:{
        type:String,
        required:true
    },
    battery:{
        type:String,
        required:true
    },
    sensorFailure:{
        type:String,
        required:true
    },
    enviroment:{
        temper: Number,
        humidi: Number
    },
});

module.exports = mongoose.model('parkingData', parkingDataSchema);