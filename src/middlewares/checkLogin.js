const jwt = require('jsonwebtoken');
const config = require('../../config'); // Import file cấu hình chứa các thông tin cho JWT
const AccountModel = require('../models/account');

// Middleware để check token có hợp lệ hay không và phải đăng nhập mới có token để gửi lên
const checkLogin = async (req, res, next) => {
    try {
        const authHeader = req.headers['authorization'];
        const token = authHeader && authHeader.split(' ')[1];
        if (token == null) {
            return res.sendStatus(401);
        }

        jwt.verify(token, config.jwtSecret, async (err, user) => {
            if (err) {
                return res.sendStatus(403);
            }
            req.user = user;
            const id = req.user.userId;
            console.log(id);

            try {
                const userData = await AccountModel.findOne({ _id: id });
                if (userData) {
                    req.user = userData; // Gán toàn bộ dữ liệu người dùng từ cơ sở dữ liệu vào req.user
                    console.log(userData.role);
                    next();
                } else {
                    res.status(403).json({ message: "Not Permission" });
                }
            } catch (err) {
                res.status(500).json({ message: err.message });
            }
        });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

module.exports = checkLogin;
