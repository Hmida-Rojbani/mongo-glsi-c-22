require('./db/connect');
const express = require('express');
const course_router= require('./routers/courses')
const author_router= require('./routers/authors')
const user_router= require('./routers/users');
const auth = require('./middlewares/auth')
const port = process.env.PORT || 3000;
const app = express();
app.use(express.json());

app.use('/api/courses',course_router);
app.use('/api/authors',auth,author_router);
app.use('/api/users',user_router);

app.listen(port, () =>  console.log(`Server running on ${port}`));