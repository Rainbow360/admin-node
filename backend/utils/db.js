var mongoose = require('mongoose')
mongoose.connect('mongodb://localhost/node-admin', {
    useNewUrlParser: true, 
    useUnifiedTopology: true,
    useFindAndModify: true
})

var db = mongoose.connection
db.on('error', console.error.bind(console, 'connection error:'))

//构建userModel
var usersSchema = mongoose.Schema({
    username: String,
    password: String
})
var Users = mongoose.model('users', usersSchema)

exports.Users = Users