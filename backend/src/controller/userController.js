const userModel = require('../model/userModel').userModel;

module.exports = {
    findAndCreateUser: findAndCreateUser,
    saveAndUpdateUser: saveAndUpdateUser,
    deleteUser: deleteUser
}

//1 for adding user and fetching all user List
async function findAndCreateUser(req, res) {
    if (req.body.query == 'insert') {
        delete req.body.query;
        let checkEmail = await userModel.find({ email: req.body.email }).lean();
        if (checkEmail.length > 0) {
            console.log("Email Already exists")
            res.status(200).send({ msg: "Email Already exists" });
        } else {
            await userModel.create(req.body);
            res.status(200).send({ msg: 'user created successfully' });
        }
    }
    else if (req.body.query == 'find') {
        await userModel.find({}).lean().then((result) => {
            return res.status(200).send(result);
        });
    }
}

//2 save and update user data
async function saveAndUpdateUser(req, res) {
    try {
        if (req.body.update) {
            var userId = req.body.userId;
            delete req.body.update;
            delete req.body.userId;
            let result = await userModel.findOneAndUpdate(
                { _id: userId },
                { $set: req.body }
            ).lean();
            if (result) {
                res.status(200).send({ msg: "data edit successfully" })
            } else {
                res.status(400).send({ msg: 'user not found' })
            }
        }
    } catch (err) {
        console.log(err);
        res.status(400).send(err)
    }
}

//3 delete specific user detail
async function deleteUser(req, res) {
    if (req.body.query == 'delete') {
        delete req.body.query;
        let result = await userModel.remove({ _id: req.body.userData._id }).lean();
        if (result.deletedCount == 1) {
            res.status(200).send({ msg: "data deleted successfully" })
        } else {
            res.status(400).send({ msg: 'user not found' })
        }
    }
}
