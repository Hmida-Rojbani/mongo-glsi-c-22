require('./db/connect');
const express = require('express');
const course_router= require('./routers/courses')
const port = process.env.PORT || 3000;
const app = express();
app.use(express.json());

app.use('/api/courses',course_router);

app.listen(port, () =>  console.log(`Server running on ${port}`));