const bcrypt = require('bcrypt');

const saltRounds = 10;

exports.hash = (myPlaintextPassword) => {
    return new Promise((resolve, reject) => {
        bcrypt.hash(myPlaintextPassword, saltRounds, function(err, hash) {
            if (err) {
                reject(err)
            }
            resolve(hash)
        })
    })
}

exports.compare = (myPlaintextPassword, hash) => {
    return new Promise((resolve, reject) => {
        bcrypt.compare(myPlaintextPassword, hash, function(err, hash) {
            resolve(hash)
        })
    })
}