const express = require('express')
const app = express()
const config = require('./config')
const bodyParser = require('body-parser')
const router = require('./src/routes/routes')
const http = require('http');
const server = http.createServer(app);
const socketIO = require('socket.io');
const io = socketIO(server)

// Đối với EJS
app.set('view engine', 'ejs');

// import bodyParser (phải khai báo lên đầu vì nó giống một middleware)
let jsonParser = bodyParser.json()
let urlencodedParser = bodyParser.urlencoded({ extended: false })
app.use(urlencodedParser)
app.use(jsonParser)


app.use('/', router)


app.listen(config.server.port, () => {
  console.log(`Server is running on port ${config.server.port}`);
});




