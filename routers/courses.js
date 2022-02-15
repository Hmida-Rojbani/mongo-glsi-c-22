const router = require('express').Router();
const {Course, course_validation} = require('../models/course');

// add course to DB
// add Joi 
router.post('',async (req,res)=>{
    try {
        let course = new Course(req.body);
        course =  await course.save();
        res.send(course);
    } catch (error) {
        res.status(400).send('Proble saving Course : '+error.message)
    }
    
});

// get all courses
router.get('',async (req,res)=>{
    let courses = await Course.find({},'title author isPublished -_id');
    res.send(courses);
});
// get title starts with a prefix
router.get('/title/starts/:prefix',async (req,res)=>{
    let courses = await Course.find({title : new RegExp('^'+req.params.prefix,'i')});
    res.send(courses);
});

// get with price over
router.get('/price/over/:p',async (req,res)=>{
    let courses = await Course.find({price : { $gte : req.params.p}});
    res.send(courses);
});

// get with price under
// operations 
// ==  | $eq
// !=  | $neq
// > | $gt
// >= | $gte
// < | $lt
// <= | $lte
// $in $nin
router.get('/price/under/:p',async (req,res)=>{
    let courses = await Course.find({price : { $lte : req.params.p}});                                
    res.send(courses);
});

module.exports=router;