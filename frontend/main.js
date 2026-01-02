const { app, BrowserWindow, ipcMain, desktopCapturer } = require('electron');
const path = require('path');
const fs = require("fs");

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

ipcMain.handle("capture-screen", async () => {
  const sources = await desktopCapturer.getSources({
    types: ["screen"],
    thumbnailSize: { width: 1280, height: 720 }
  });

  const thumbnail = sources[0].thumbnail;
  const image = thumbnail.toPNG();

  // ---- Date & Time ----
  const now = new Date();

  // Folder name: YYYY-MM-DD
  const dateFolder = now.toISOString().split("T")[0];

  // File name: HH-MM-SS.png
  const timeString = now
    .toTimeString()
    .split(" ")[0]
    .replace(/:/g, "-");

  // screenshots/YYYY-MM-DD/
  const imgDir = path.join(__dirname, "screenshots", dateFolder);
  fs.mkdirSync(imgDir, { recursive: true });

  // screenshots/YYYY-MM-DD/HH-MM-SS.png
  const filePath = path.join(imgDir, `${timeString}.png`);
  fs.writeFileSync(filePath, image);

  // Return preview for renderer
  return thumbnail.toDataURL();
});


// allow home page to read data
ipcMain.handle('get-user-data', () => loggedInUser);
