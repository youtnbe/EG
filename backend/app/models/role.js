var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var autoIncrement = require('mongoose-auto-increment');
autoIncrement.initialize(mongoose.connection);

var roleScheme = new Schema({
    code: {
        type:String,
        required:[true,"codeRequired"],
        maxlength:[32,"tooLong"],
        minlength:[4,"tooShort"],
        unique:true
    },
    name: {
        type:String,
        maxlength:[32,"tooLong"],
        minlength:[4, "tooShort"],
        required:[true,"nameRequired"]
    }
});
module.exports.Schema = roleScheme;
roleScheme.plugin(autoIncrement.plugin, {model: 'Role', field: 'id', startAt: 0});
module.exports = mongoose.model("Role", roleScheme);