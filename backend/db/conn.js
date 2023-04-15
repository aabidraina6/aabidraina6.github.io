const mongoose = require('mongoose')

const uri = "mongodb+srv://admin:admin@cluster0.7lzev9q.mongodb.net/test?retryWrites=true&w=majority";
mongoose.set('strictQuery', false);

mongoose.connect(uri , {
    useNewUrlParser : true,
    useUnifiedTopology : true

}).then(()=>{
    console.log('Mongodb Connected')
    }).catch(()=>{
        console.log('Error connecting mongodb')
        })

const conn = mongoose.connection