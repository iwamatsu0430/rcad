const service = require('../services/rest')

class RESTController {

  exec(req, res) {
    // TODO body validation
    service
      .exec(req.body.data)
      .then(result => res.json({
        status: 'OK',
        data: result
      }))
      .catch(result => res.json({
        status: 'ERROR',
        data: result
      }))
  }
}

module.exports = new RESTController()
