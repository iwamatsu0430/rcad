const express = require("express")
const app = express()

const routes = () => {
  const sample = require('./controllers/sample')
  app.get("/api/foo", sample.foo)
  app.get("/api/bar", sample.bar)
}

const run = callback => {
  const serverPort = process.env.RCD_SERVER_PORT || 7001
  app.listen(serverPort, () => {
    console.log(`RCD API Server start: http://localhost:${serverPort}/`)
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
