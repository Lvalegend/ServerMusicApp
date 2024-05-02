const express = require('express');
const jwt = require('jsonwebtoken');
const config = require('../../config'); // Import file cấu hình chứa các thông tin cho JWT
const AccountModel = require('../models/account');


// Middleware để check token có hợp lệ hay không và phải đăng nhập mới có token để gửi lên
const checkLogin = (req, res, next) => {
    try {
        const authHeader = req.headers['authorization'];
        const token = authHeader && authHeader.split(' ')[1];
        if (token == null)
            return res.sendStatus(401);
        jwt.verify(token, config.jwtSecret, (err, user) => {
            if (err)
                return res.sendStatus(403);
            req.user = user;
            const id = req.user.userId
            console.log(id);
            const checkIdAndgetData = AccountModel.findOne({ _id: id })
            if (checkId) {
                req.user = checkIdAndgetData
                next();
            }
            else {
                res.json("Not Permission")
            }
        });
    } catch (err) {
        res.status(500).json(err.message, " You are not logged in")
    }
};

module.exports = checkLogin;
