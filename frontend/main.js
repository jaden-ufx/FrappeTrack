const { app, BrowserWindow, ipcMain } = require('electron');
const path = require('path');

let mainWindow;
let loggedInUser = null;

function createWindow() {
  mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
      nodeIntegration: false,
      contextIsolation: true
    }
  });

  mainWindow.loadFile('./pages/login.html');
}

app.whenReady().then(createWindow);

// store profile + redirect
ipcMain.on('login-success', (event, data) => {
  loggedInUser = data;
  mainWindow.loadFile('./pages/profile.html');
});

// allow home page to read data
ipcMain.handle('get-user-data', () => loggedInUser);
