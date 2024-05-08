const express = require('express')
const app = express()
// const cors = require('cors')
const config = require('./config')
const bodyParser = require('body-parser')
const router = require('./src/routes/routes')
// Đối với EJS
app.set('view engine', 'ejs');

// import bodyParser (phải khai báo lên đầu vì nó giống một middleware)
let jsonParser = bodyParser.json()
let urlencodedParser = bodyParser.urlencoded({ extended: false })
app.use(urlencodedParser)
app.use(jsonParser)


app.use('/',router)

app.setMaxListeners(50)
app.listen(config.server.port, () => {
  console.log(`Example app listening at http://localhost:${config.server.port}`)
})
