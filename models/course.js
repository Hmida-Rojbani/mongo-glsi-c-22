const mongoose = require('mongoose');

let course_schema= new mongoose.Schema({
    title : String,
    author : String,
    tags : [String],
    date : { type : Date , default : Date.now()},
    isPublished: Boolean
});

let Course = mongoose.model('Course',course_schema);

module.exports.Course = Course;
