const {Users} = require('../models');

const getAll = () => new Promise((resolve, reject) => {
    Users.findAll()
    .then((users) => {
        resolve(users);
    })
    .catch((error) => {
        reject(error);
    });
});

const add = (userObj) => new Promise((resolve, reject) => {
    Users.create(userObj)
    .then((users) => {
        resolve(users);
    })
    .catch((error) => {
        reject(error);
    });
});

module.exports = {
    getAll,
    add,
}
