const UsersRepo = require('../repository/UsersRepository')

const getAllUsers = async(req, res) => {
    UsersRepo.getAll()
    .then((result) => {
        res.send({
            message: 'All users fetched',
            data: result,
        });
    })
    .catch((error) => {
        res.send({
            message: 'Some error occoured',
            error
        });
    });
}

const addNewUser = async(req, res) => {
    UsersRepo.add(req.body)
    .then((result) => {
        res.send({
            message: 'New user has been created',
            data: result,
        });
    })
    .catch((error) => {
        console.error(error);
        res.send({
            message: 'Some error occoured',
            error
        });
    });
}

module.exports = {
    getAllUsers,
    addNewUser
}