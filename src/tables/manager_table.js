const mongoose = require('mongoose');
const config = require('../../config');
// mongoose.connect(config.uri_connection.uri , {dbName: 'ServerMusicApp'});
mongoose.connect(`mongodb://${config.database.host}/${config.database.dbName}`);
// Wait for the connection to be established
mongoose.connection.once('open', async () => {
    console.log('Connected to MongoDB');

    const ManagerModel = require('../models/manager'); 

    // Create an array of new documents
    const managers = [
        {
            _id: "Manager_1",
            nameManager: "Lê Văn An",
            nameAccount: "QL_1",
            email: "andeptrai@gmail.com",
            password: "123456",
        },
        {
            _id: "Manager_2", // Changed `_id` to a unique value
            nameManager: "Phạm Đăng Khoa",
            nameAccount: "QL_2",
            email: "khoadeptrai@gmail.com",
            password: "123456",
        },
    ];

    try {
        // Insert the array of documents into the Manager collection
        const result = await ManagerModel.insertMany(managers);
        console.log('Inserted documents:', result);
    } catch (err) {
        console.error('Error inserting documents:', err);
    } finally {
        // Ensure to close the connection after operations
        mongoose.connection.close();
        console.log('Connection to MongoDB closed');
    }
});
