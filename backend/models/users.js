const { Users } = require('../utils/db')

const findUser = (username) => {
    return Users.findOne({username})
}

const singup = ({username, password  }) => {
    const users = new Users({
        username,
        password
    })
    return users.save()
}

const findList = () => {
    return Users.find().sort({ _id: -1 })
}

const remove = id => {
    // return Users.findByIdAndRemove(id)
    return Users.deleteOne({_id: id})
}
exports.singup = singup
exports.findUser = findUser
exports.findList = findList
exports.remove = remove

// module.exports = {
// singup
// }