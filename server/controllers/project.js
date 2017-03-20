const service = require('../services/project')

class ProjectController {

  getCWD(req, res) {
    service
      .getCWD()
      .then(result => res.json(result))
      .catch(result => res.json({
        status: 'ERROR',
        data: result
      }))
  }

  initProject(req, res) {
    service
      .initProject(req.body.data.path)
      .then(result => res.json(result))
      .catch(result => res.json({
        status: 'ERROR',
        data: result
      }))
  }

  createRequest(req, res) {
    const data = req.body.data
    service
      .createRequest(
        data.workingDir,
        data.newRequests,
        data.parentDir,
        data.requestName,
        data.restParam
      )
      .then(result => res.json(result))
      .catch(result => res.json({
        status: 'ERROR',
        data: result
      }))
  }
}

module.exports = new ProjectController()
