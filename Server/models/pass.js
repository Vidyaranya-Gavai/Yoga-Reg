const mongoose = require("mongoose");
const {Schema} = mongoose;

const passSchema = new mongoose.Schema({
	firstName: { type: String},
	lastName: { type: String },	
	age: {type:Number},
	gender: {type:String},
	batch: {type: String},
    referedBy:{type:Schema.Types.ObjectId, ref:'user'}
});


const Batch_pass = mongoose.model("BatchPass", passSchema);



module.exports = Batch_pass;
