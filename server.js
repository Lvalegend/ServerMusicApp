const express = require('express')
const app = express()
const config = require('./config')
const bodyParser = require('body-parser')
const router = require('./src/routes/routes')
const http = require('http');
const cors = require('cors');
const checkTokenSocket = require('./src/middlewares/checkTokenSocket')
const server = http.createServer(app);

// Đối với EJS
app.set('view engine', 'ejs');

// import bodyParser (phải khai báo lên đầu vì nó giống một middleware)
let jsonParser = bodyParser.json()
let urlencodedParser = bodyParser.urlencoded({ extended: false })
app.use(urlencodedParser)
app.use(jsonParser)


app.use(cors({
  origin: `http://localhost:${config.server.port}`,
  methods: ['GET', 'POST'],
  allowedHeaders: ['Content-Type']
}));

const io = require('socket.io')(server, {
  path: '/socket-io',
  cors: {
      origin: `http://localhost:${config.server.port}`,
      methods: ['GET', 'POST'],
      allowedHeaders: ['Content-Type']
  }
});
app.use('/', router)


server.listen(config.server.port, () => {
  console.log(`Server is running on port ${config.server.port}`);
});

io.use(checkTokenSocket)

io.on("connection", function (socket) {
  const userId = socket.userId
  console.log("user connected:", socket.id);

  socket.emit('user-connected', socket.id);

  socket.on('send-message', async (data) => {
    const info = {
      userId: userId,
      socketId: socket.id,
      message: data.message
    }
    console.log("received message", info);
    io.emit('received-message', info);
  });

  socket.on('disconnect', () => {
    console.log('user: ', socket.id, ' disconnected');
  });

});




