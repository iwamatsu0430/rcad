const express = require("express")
const app = express()
const bodyParser = require('body-parser')

const routes = () => {
  const rest = require('./controllers/rest')
  app.post('/rest', rest.exec)
}

const run = callback => {
  const serverPort = process.env.RCD_SERVER_PORT || 7001
  app.listen(serverPort, () => {
    // Allow CORS
    app.use((req, res, next) => {
      res.header("Access-Control-Allow-Origin", "*")
      res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept")
      next()
    })
    
    // for parsing application/json
    app.use(bodyParser.json())

    routes()
    callback()
  })
}

module.exports = run

// Run directly
if (require.main === module) {
    run(() => {
      console.log('Run Directly')
    })
}
