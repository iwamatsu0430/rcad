const server                  = require('../../server/routes')
const { app, BrowserWindow }  = require('electron')
const path                    = require('path')
const url                     = require('url')

let win

const createWindow = () => {
  win = new BrowserWindow({width: 800, height: 600})
  win.loadURL(url.format({
    pathname: path.join(`${__dirname}/../app`, 'index.html'),
    protocol: 'file:',
    slashes: true
  }))
  win.on('closed', () => win = null)
}

app.on('ready', createWindow)

app.on('window-all-closed', () => {
  app.quit()
})

app.on('activate', () => {
  if (win === null) {
    createWindow()
  }
})

server(() => {})
