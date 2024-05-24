const mongoose = require('mongoose');
const config = require('../../config');
mongoose.connect(`mongodb://${config.database.host}/${config.database.dbName}`);
const Schema = mongoose.Schema;

const StudentSchema = new Schema({
    name: {
        type: String,
    },
    mssv: {
        type: String,
    },
    lop: {
       type: String,
    },
    email: {
       type: String
    },
    address: {
      type: String
    }
}, {
    collection: 'Student',
});



const StudentModel = mongoose.model('Student', StudentSchema);
module.exports = StudentModel;
