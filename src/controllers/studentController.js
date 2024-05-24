const StudentModel = require("../models/student");

const CreateStudent = async (req, res, next) => {
    const { name, mssv, lop, email, address } = req.body;
    try {
        const existingUser = await StudentModel.findOne({ name: name });
        if (existingUser) {
            return res.status(400).json({ message: 'Username already exists' });
        } else {
            const data = await StudentModel.create({
                name: name,
                mssv: mssv,
                lop: lop,
                email: email,
                address: address
            });
            console.log(data);
            res.status(200).json('Create Success');
        }
    } catch (error) {
        res.status(error.statusCode).json('Failure');
    }
};

const DeleteStudent = async (req, res, next) => {
    const { mssv } = req.body;
    try {
        await StudentModel.deleteOne({ mssv: mssv });
        res.status(200).json('Delete Success');
    } catch (error) {
        res.status(error.statusCode).json('Delete failure');
    }
};

const GetAllStudent = async (req, res, next) => {
    try {
        const students = await StudentModel.find({});
        res.status(200).json(students);
    } catch (error) {
       res.status(error.statusCode).json('Get failure');
    }
};

module.exports = { CreateStudent, DeleteStudent, GetAllStudent };
