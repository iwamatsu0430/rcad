const server                  = require('../../server/app')
const { app, BrowserWindow }  = require('electron')
const path                    = require('path')
const url                     = require('url')

let win

const createWindow = () => {
  win = new BrowserWindow({width: 1280, height: 800})
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
