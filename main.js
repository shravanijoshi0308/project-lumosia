// main.js — opens the app window and loads your page into it.
const { app, BrowserWindow } = require('electron');

function createWindow() {
  const win = new BrowserWindow({
    width: 420,
    height: 520,
    title: 'DrustiChuka',
  });
  win.loadFile('index.html');   // show index.html inside the window
}

app.whenReady().then(createWindow);

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') app.quit();
});