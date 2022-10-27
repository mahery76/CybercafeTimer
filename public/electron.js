const { app, BrowserWindow } = require('electron')

const path = require('path')
const url = require('url');
let mainWindow;

const isDev = require("electron-is-dev")

function createWindow () {
  const win = new BrowserWindow({
    width: 700,
    height: 600,
    webPreferences: {
      nodeIntegration: true,
      backgroundThrottling: false

    },
  })

  win.loadURL(
    isDev ?'http://localhost:3000':`file://${__dirname}/../build/index.html`
   );

}

app.whenReady().then(() => {
  createWindow()

  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow()
    }
  })
})

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})
