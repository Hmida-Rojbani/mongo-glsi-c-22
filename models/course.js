const mongoose = require('mongoose');
const Joi = require('joi');
Joi.objectId = require('joi-objectid')(Joi);

const course_schema = new mongoose.Schema({
    title : {
        type: String,
        required: true,
        unique: true,
        minlength : 5
    },
    author : {
        name : String,
        id : {
            type : mongoose.Schema.Types.ObjectId,
            ref: 'Author'
        }
    },
    tags : {
    type:[String],
    validate : {
        validator : function (val) {
            return val && val.length >= 2
        },
        message : 'A course must have at least two tags'
    }
},
    date : {
        type: Date,
        default: Date.now()
    },
    isPublished : Boolean,
    price : {
        type:Number,
        min : 10,
        required: function () {
            return this.isPublished;
        }
    }
});

const course_validation = Joi.object({
    title : Joi.string().min(3).required(),
    author : Joi.objectId(),
    tags : Joi.array().items(Joi.string().alphanum()).required(),
    isPublished : Joi.boolean(),
    price : Joi.number().positive()
});

const course_validation_update = Joi.object({
    title : Joi.string().min(3),
    author : Joi.objectId(),
    tags : Joi.array().items(Joi.string().alphanum()),
    isPublished : Joi.boolean(),
    price : Joi.number().positive()
});

const Course = mongoose.model('Course', course_schema);

module.exports.Course = Course; 
module.exports.course_validation = course_validation; 
module.exports.course_validation_update = course_validation_update; 