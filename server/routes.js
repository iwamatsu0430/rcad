const rest = require('./controllers/rest')
const project = require('./controllers/project')

class Routes {
  constructor(app) {
    app.post( '/rest',            rest.exec)
    app.post( '/project',         project.initProject)
    app.get(  '/project/cwd',     project.getCWD)
    app.post( '/project/request', project.createRequest)
  }
}

module.exports = Routes
