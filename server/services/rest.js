const axios = require('axios')

class RESTService {

  exec(param) {
    return new Promise((resolve, reject) => {
      const uri = `${param.protocol.toLowerCase()}://${param.uri}`

      // TODO add cookie
      let headers = {}
      param.headers.forEach(header => {
        headers[header.key] = header.value
      })

      const createResponse = res => {
        return {
          statusCode: res.status,
          statusText: res.statusText,
          header: res.headers,
          body: res.data
        }
      }

      switch (param.method.toLowerCase()) {
        case 'get':
          axios
            .get(uri, {
              headers: headers
            })
            .then(res => resolve(createResponse(res)))
            .catch(res => reject(createResponse(res.response)))
          break
        case 'post':
          axios
            .post(uri, {
              headers: headers
            })
            .then(res => resolve(createResponse(res)))
            .catch(res => reject(createResponse(res.response)))
          break
        case 'put':
          axios
            .put(uri, {
              headers: headers
            })
            .then(res => resolve(createResponse(res)))
            .catch(res => reject(createResponse(res.response)))
          break
        case 'delete':
          axios
            .delete(uri, {
              headers: headers
            })
            .then(res => resolve(createResponse(res)))
            .catch(res => reject(createResponse(res.response)))
          break
        default:
          reject({msg: `HTTP Method ${param.method} is not supported`})
          break
      }
    })
  }
}

module.exports = new RESTService()
