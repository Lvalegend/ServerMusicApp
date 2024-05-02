const express = require('express');
const jwt = require('jsonwebtoken');
const config = require('../../config'); // Import file cấu hình chứa các thông tin cho JWT


// Middleware để xác thực token dùng cho xác định người dùng
const authenticateToken = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];
    if (token == null)
        return res.sendStatus(401);
    jwt.verify(token, config.jwtSecret, (err, user) => {
        if (err)
            return res.sendStatus(403);
        req.user = user; // req.user là tên tự tạo
        next(); 
    });
};

module.exports = authenticateToken;
