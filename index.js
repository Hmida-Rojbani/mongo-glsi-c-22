require('./db/connect');

const { Course } = require('./models/course');

let course = new Course({
    title : 'Angular',
    author : 'S Saoudi',
    tags: ['frontend', 'ts'],
    isPublished: false
});

//course.save().then(doc => console.log(doc));

async function select() {
    let courses = await Course.find()
                            .limit(2)
                            .sort({title:1})
                            //.select({title:1,author:1,_id:0});
                            .select('title author -_id')
    console.log(courses);
}

select()