const router = require('express').Router();
const {Course, course_validation} = require('../models/course');

// add course to DB
// add Joi 
router.post('',async (req,res)=>{
    try {
        let result_valid= course_validation.validate(req.body);
        if(result_valid.error)
            return res.status(400).send(result_valid.error.details[0].message);
        let course = new Course(req.body);
        course =  await course.save();
        res.status(201).send(course);
    } catch (error) {
        res.status(400).send('Problem saving Course : '+error.message)
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

// update 
router.put('/:id', async (req,res)=> {
    // new data is validated

    //update content
});

module.exports=router;