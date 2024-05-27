const express = require('express')
const app = express()
const config = require('./config')
const bodyParser = require('body-parser')
const router = require('./src/routes/routes')
const http = require('http');
const cors = require('cors');
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

io.on("connection", function (socket) {
  // if(socket.handshake.auth.token != token){
  //     return socket.disconnect();
  // }
  // console.log(socket.handshake.auth.token);
  // jwt.verify(socket.handshake.token, 'Monstercity123@', (err, user) => {
  //       Object.assign(socket, user)
  //       console.log(err);
  //       console.log(socket.userId);
  // })


  console.log("user connected:", socket.id);

  socket.emit('user-connected', socket.id);

  socket.on('send-message', async (data) => {
    const info = {
      userId: socket.id,
      message: data
    }
    // thao tác với database ( lưu dữ liệu )
    try {
      let songId = 'Song_1'
      const newComment = await ContentCommentModel.insertMany({ userId: socket.id, content: data });
      if (CommentModel.findById(songId) === null || CommentModel.findById(songId) === undefined) {
        const commentInfo = await CommentModel.create({ songId: songId, commentInfo: newComment })
        console.log("Message saved to database:", commentInfo);
      }
      else {
        const updatedComment = await CommentModel.findOneAndUpdate(
          { songId: songId },
          { $push: { commentInfo: newComment } },
          { new: true, upsert: true }
        );
        console.log("Message saved to database:", updatedComment);
      }
    } catch (error) {
      console.error("Error saving message to database:", error);
    }

    console.log("received message", info);
    io.emit('received-message', info);
  });

  socket.on('disconnect', () => {
    console.log('user: ', socket.id, ' disconnected');
  });

});




