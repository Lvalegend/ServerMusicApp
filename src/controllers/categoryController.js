const CategoryModel = require('../models/category');

const infoCategory = async (req, res, next) => {
    try {
        const categories = await CategoryModel.find();

        console.log(categories);
    
        return res.status(200).json(categories);

    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
}

module.exports = infoCategory;
