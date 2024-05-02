
const mongoose = require('mongoose');
const config = require('../../config');
// mongoose.connect(config.uri_connection.uri , {dbName: 'ServerMusicApp'});
mongoose.connect(`mongodb://${config.database.host}/${config.database.dbName}`);
const Schema = mongoose.Schema;

const ManagerSchema = new Schema({
    _id: {
        type: String,
        required: true,
        auto: false  
    },
    nameManager: {
        type: String
    },
    nameAccount: {
        type: String
    },
    email:{ 
        type: String
    },
    password:{
        type: String
    },
    




}, {
    collection: 'Manager',
});
const ManagerModel = mongoose.model('Manager', ManagerSchema);
module.exports = ManagerModel
