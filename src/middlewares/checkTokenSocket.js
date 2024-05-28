const jwt = require('jsonwebtoken');
const config = require('../../config');
const CommentModel = require('../models/comment');
const AccountModel = require('../models/account');

const checkTokenSocket = async (socket, next) => {
    const token = socket.handshake.auth.token;
    if (!token) {
        socket.emit('unauthorized', { message: 'You are not logged in or registered' });
        return socket.disconnect();
    }
    console.log('token', token);

    try {
        const decoded = jwt.verify(token, config.jwtSecret);
        const comments = await CommentModel.find({ userId: decoded.userId }).populate('userId', 'name avatar');
        
        if (comments.length > 0) {
            const comment = comments[0];
            socket.data.user = {
                _id: comment.userId._id,
                name: comment.userId.name,
                date: comment.date 
            };
        } else {
            socket.data.user = { 
                _id: decoded.userId, 
                name: 'Unknown User', 
                avatar: '', 
                date: new Date().toLocaleString()
            };
        }
        next();
    } catch (err) {
        console.log("Error: " + err);
        socket.emit('unauthorized', { message: 'Token verification failed' });
        return socket.disconnect();
    }
}

module.exports = checkTokenSocket;
