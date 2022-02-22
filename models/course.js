const mongoose = require('mongoose');
const Joi = require('joi');

const course_schema = new mongoose.Schema({
    title : String,
    author : String,
    tags : [String],
    date : {
        type: Date,
        default: Date.now()
    },
    isPublished : Boolean,
    price : Number
});

const course_validation = Joi.object({
    title : Joi.string().min(3).required(),
    author : Joi.string().min(5).max(30).required(),
    tags : Joi.array().items(Joi.string().alphanum()).required(),
    isPublished : Joi.boolean(),
    price : Joi.number().positive()
});

const course_validation_update = Joi.object({
    title : Joi.string().min(3),
    author : Joi.string().min(5).max(30),
    tags : Joi.array().items(Joi.string().alphanum()),
    isPublished : Joi.boolean(),
    price : Joi.number().positive()
});

const Course = mongoose.model('Course', course_schema);

module.exports.Course = Course; 
module.exports.course_validation = course_validation; 
module.exports.course_validation_update = course_validation_update; 