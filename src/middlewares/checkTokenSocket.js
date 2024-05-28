const jwt = require('jsonwebtoken');
const config = require('../../config');
const checkTokenSocket = (socket, next) => {
    if (socket.handshake.auth.token == null) {
        socket.emit('unauthorized', { message: 'You are not login or register' });
        return socket.disconnect();
    }
    console.log(socket.handshake.auth.token);
    const receiver_token = socket.handshake.auth.token
    jwt.verify(receiver_token, config.jwtSecret, (err, user) => {
        if (err) {
            console.log("Error: " + err)
            return socket.disconnect()
        }
        socket.userId = user.userId;
        next();
    });
}
module.exports = checkTokenSocket