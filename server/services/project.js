const fs = require('fs')
const yaml = require('node-yaml')

const configFileName = 'rcad.yaml'

class ProjectService {

  getCWD() {
    const cwd = process.cwd()
    const configFile =`${cwd}/${configFileName}`
    const isProject = this.existsPath(configFile)
    if (isProject) {
      return yaml.readPromise(configFile)
        .then(config => Promise.resolve({
          path: cwd,
          isProject: isProject,
          requests: config.requests
        }))
        .catch(e => Promise.reject(`Failed read config. error=${e}`))
    } else {
      return Promise.resolve({
        path: cwd,
        isProject: isProject,
        requests: []
      })
    }
  }

  initProject(workingDir) {
    const configFile = `${workingDir}/${configFileName}`
    if (!this.existsPath(configFile)) {
      const config = {
        requests: []
      }
      return yaml.writePromise(configFile, data)
        .then(() => Promise.resolve(`Created config file: ${configFile}`))
        .catch(e => Promise.reject(`Failed create config file. error=${e}`))
    } else {
      return Promise.reject('Already exists config file')
    }
  }

  createRequest(workingDir, newRequests, parentDir, requestName, restParam) {
    const configFile = `${workingDir}/${configFileName}`
    return new Promise(resolve => {
      fs.mkDir(`${workingDir}${parentDir}`, () => resolve())
    })
    .then(() => yaml.writePromise(`${workingDir}${parentDir}/${requestName}`), restParam)
    .then(() => yaml.readPromise(configFile))
    .then(config => {
      const newConfig = config.requests = newRequests
      return yaml.writePromise(configFile, newConfig)
    })
    .catch(e => Promise.reject(`Failed create request. error=${e}`))
  }

  existsPath(path) {
    try {
      fs.statSync(path)
      return true
    } catch(err) {
      return false
    }
  }
}

module.exports = new ProjectService()
