const mongoose = require('mongoose');
mongoose.set('strictQuery', false);

mongoose.connect('mongodb+srv://esmeblare:OTavM9wr9NxN8Nb8@blog-app.vikzx.mongodb.net/')
.then(() => console.log('connected to mongo db hey'))
.catch((e) => console.log(e)
);



