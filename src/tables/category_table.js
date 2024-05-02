const mongoose = require('mongoose');
const config = require('../../config');
// mongoose.connect(config.uri_connection.uri , {dbName: 'ServerMusicApp'});
mongoose.connect(`mongodb://${config.database.host}/${config.database.dbName}`);
// Wait for the connection to be established
mongoose.connection.once('open', async () => {
    console.log('Connected to MongoDB');

    const CategoryModel = require('../models/category');

    // Create an array of new documents
    const categories = [
        {
            _id: "Category_Pop",
            nameCategory: "Pop",
            description: "Nhạc dành cho thế hệ 7x 8x mang đậm phong thái thời xưa"
        },
        {
            _id: "Category_Rock",
            nameCategory: "Rock",
            description: "Nhạc dành cho thế hệ 2kx mang đậm phong thái mạnh bạo và trẻ trung năng động"
        }, {
            _id: "Category_Đồng Quê",
            nameCategory: "Đồng Quê",
            description: "Nhạc dành cho thế hệ 2kx mang đậm phong thái mạnh bạo và trẻ trung năng động"
        }, {
            _id: "Category_EDM",
            nameCategory: "EDM",
            description: "Nhạc dành cho thế hệ 2kx mang đậm phong thái mạnh bạo và trẻ trung năng động"
        }, {
            _id: "Category_Jazz",
            nameCategory: "Jazz",
            description: "Nhạc dành cho thế hệ 2kx mang đậm phong thái mạnh bạo và trẻ trung năng động"
        }, {
            _id: "Category_Blues",
            nameCategory: "Blues",
            description: "Nhạc dành cho thế hệ 2kx mang đậm phong thái mạnh bạo và trẻ trung năng động"
        }, {
            _id: "Category_Dance",
            nameCategory: "Dance",
            description: "Nhạc dành cho thế hệ 2kx mang đậm phong thái mạnh bạo và trẻ trung năng động"
        }, {
            _id: "Category_Acoustic",
            nameCategory: "Acoustic",
            description: "Nhạc dành cho thế hệ 2kx mang đậm phong thái mạnh bạo và trẻ trung năng động"
        }, {
            _id: "Category_Ballad",
            nameCategory: "Ballad",
            description: "Nhạc dành cho thế hệ 2kx mang đậm phong thái mạnh bạo và trẻ trung năng động"
        },
    ]

    try {
        // Insert the array of documents into the Category collection
        const result = await CategoryModel.insertMany(categories);
        console.log('Inserted documents:', result);
    } catch (err) {
        console.error('Error inserting documents:', err);
    } finally {
        // Ensure to close the connection after operations
        mongoose.connection.close();
        console.log('Connection to MongoDB closed');
    }
});
