const mongoose = require('mongoose');

mongoose.connect('mongodb+srv://user:1234@db.mhbax.mongodb.net/gl-c-22?retryWrites=true&w=majority')
    .then(()=>console.log('MongoDB is up.'))
    .catch((err)=>console.log('MongoDB is Down, raison :',err.message));