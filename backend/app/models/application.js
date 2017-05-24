var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var autoIncrement = require('mongoose-auto-increment');
var employeeScheme = require('./employee').schema;
autoIncrement.initialize(mongoose.connection);

var applicationScheme = new Schema({
    task: {
        name: {
            type: String,
            required: [true, "nameRequired"],
            maxlength: [256, "tooLong"],
            minlength: [6, "tooShort"]
        },
        description: {
            type: String,
            required: [true, "descriptionRequired"],
            maxlength: [1024, "tooLong"],
            minlength: [6, "tooShort"]
        },
        date: Date,
        address: String
    },
    customer: {
        fio: {
            type: String,
            required: [true, "fioRequired"]
        },
        email: String,
        telephone: {
            type: String,
            required: [true, "telephoneRequired"]
        }
    },
    date_create: Date,
    workman: {
        type: employeeScheme,
        default: null
    },
    status: {
        type: Number,
        default: 0
    },
    comment: {
        type: String,
        default: ''
    }
});
applicationScheme.plugin(autoIncrement.plugin, {model: 'Application', field: 'number', startAt: 1026});
module.exports = mongoose.model("Application", applicationScheme);