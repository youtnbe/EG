var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var autoIncrement = require('mongoose-auto-increment');
autoIncrement.initialize(mongoose.connection);

var employeeScheme = new Schema({
    username: {
        type:String,
        required:[true,"usernameRequired"],
        maxlength:[32,"tooLong"],
        minlength:[4,"tooShort"],
        match:[/^[a-zA-Z][a-zA-Z0-9-_\.]{1,20}$/,"usernameIncorrect"],
        unique:true
    },
    password: {
        type:String,
        maxlength:[32,"tooLong"],
        minlength:[4, "tooShort"],
        //match:[/^[A-Za-z0-9]+$/,"passwordIncorrect"],
        required:[true,"passwordRequired"]
    },
    email: {
        type:String,
        match:[/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,"emailIncorrect"],
        required:[true,"emailRequired"]
    },
    telegram: {
        type: String,
        default: ''
    },
    telephone: {
        type:String,
        maxlength:[32,"tooLong"],
        required:[true,"telephoneRequired"]
    },
    firstName: {
        type: String,
        maxlength:[50,"tooLong"]
    },
    lastName: {
        type: String,
        maxlength:[50,"tooLong"]
    }
});
module.exports.Schema = employeeScheme;
employeeScheme.plugin(autoIncrement.plugin, {model: 'Employee', field: 'id', startAt: 0});
module.exports = mongoose.model("Employee", employeeScheme);