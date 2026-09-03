const { app, BrowserWindow } = require('electron');

function createWindow() {
  const win = new BrowserWindow({   // ← lives INSIDE this function
    width: 300,
    height: 360,
    transparent: true,
    frame: false,
    hasShadow: false,
    alwaysOnTop: true,
    resizable: false,
  });
  win.loadFile('index.html');
}

app.whenReady().then(createWindow);   // ← waits until ready, THEN builds the window

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') app.quit();
});