const mongoose = require('mongoose');

Schema = mongoose.Schema;
var userSchema = new Schema({}, { strict: false });
var userModel = mongoose.model('userData', userSchema, "userData");
module.exports = {
    userSchema: userSchema,
    userModel: userModel
}