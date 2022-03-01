const router = require('express').Router();
const {Course, course_validation, course_validation_update} = require('../models/course');
const {Author} = require('../models/author');
const auth = require('../middlewares/auth');
const autoris = require('../middlewares/autoris');
// add course to DB
// add Joi 
// change this to support the new collection author
// must update courses in Author
router.post('',auth,async (req,res)=>{
    try {
        let result_valid= course_validation.validate(req.body);
        if(result_valid.error)
            return res.status(400).send(result_valid.error.details[0].message);
        let author = await Author.findById(req.body.author);
        if(! author )
            return res.status(400).send('Author Id does not exist');
        
        let course = new Course(req.body);
        course.author.name = author.name;
        course.author.id = author._id;
        course =  await course.save();
        author.courses.push(course._id);
        await author.save();
        res.status(201).send(course);
    } catch (error) {
        res.status(400).send('Problem saving Course : '+error.message)
    }
    
});

// get all courses
router.get('',async (req,res)=>{
    //let courses = await Course.find({},'title author isPublished -_id');
    let courses = await Course.find().populate('author.id');
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
router.put('/:id', auth,async (req,res)=> {
    // new data is validated
    let result_valid= course_validation_update.validate(req.body);
    if(result_valid.error)
        return res.status(400).send(result_valid.error.details[0].message);
    
    //update content
    await Course.updateOne({_id: req.params.id},req.body);
    res.send(await Course.findById(req.params.id));
});

// delete 
router.delete('/:id',[auth,autoris], async (req,res)=> {
    let course = await Course.findByIdAndRemove(req.params.id);
    if(! course )
        return res.status(404).send('Course id is not found');
    res.send(course);
});

module.exports=router;