const router = require('express').Router();
const {Course} = require('../models/course');

router.post('',async (req,res)=>{
    try {
        let course = new Course(req.body);
        course =  await course.save();
        res.send(course);
    } catch (error) {
        res.status(400).send('Proble saving Course : '+error.message)
    }
    
});

router.get('',async (req,res)=>{
    let courses = await Course.find({},'title author isPublished -_id');
    res.send(courses);
});

module.exports=router;