
const mongoose = require('mongoose');
const config = require('../../config');
const Schema = mongoose.Schema;
// mongoose.connect(config.uri_connection.uri , {dbName: 'ServerMusicApp'});
mongoose.connect(`mongodb://${config.database.host}/${config.database.dbName}`);

const AccountSchema = new Schema({
    
    name: {
        type: String,
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    avatar: {
        type: Buffer
    },
    introduction:{
        type: String
    },
    role: {
        type: String,
        default: "normal"
    }
    
}, {
    collection: 'Account',
});
const AccountModel = mongoose.model('Account', AccountSchema);
module.exports = AccountModel
