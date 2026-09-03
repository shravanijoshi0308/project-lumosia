const { app, BrowserWindow, Tray, Menu, nativeImage, screen, ipcMain } = require('electron');  // ← added: screen
const path = require('path');

let win;

// Your charms: the label shown in the menu, and its image file.
// (Add a charm = add a line here — matches your filenames exactly.)
const charms = [
  { label: 'Evil Eye',     file: 'evileye-classic.png' },
  { label: 'Nimbu Mirchi', file: 'nimbu-mirchi.png' },
  { label: 'Hamsa',        file: 'hamsa.png' },
  { label: 'Sunburst',     file: 'evileye-sunburst.png' },
  { label: 'Heart',        file: 'heart.png' },
  { label: 'Seven',        file: 'number-7.png' },
  { label: '11:11',        file: 'eleven-eleven.png' },
];

function createWindow() {
  const screenWidth = screen.getPrimaryDisplay().workAreaSize.width;   // ← added

  win = new BrowserWindow({
    width: 300,
    height: 360,
    x: screenWidth - 300,   // ← added: push to the right edge
    y: 0,                   // ← added: top of the screen
    transparent: true,
    frame: false,
    hasShadow: false,
    alwaysOnTop: true,
    resizable: false,
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false,
    },
  });
  win.loadFile('index.html');
  win.setIgnoreMouseEvents(true, { forward: true });
  ipcMain.on('set-ignore', (e, ignore) => win.setIgnoreMouseEvents(ignore, { forward: true }));
}

function createTray() {
  const icon = nativeImage
    .createFromPath(path.join(__dirname, 'tray.png'))
    .resize({ width: 20, height: 20 });
  const tray = new Tray(icon);

  const menu = Menu.buildFromTemplate([
    ...charms.map(c => ({
      label: c.label,
      click: () => win.webContents.send('set-charm', c.file),
    })),
    { type: 'separator' },
    { label: 'Quit DrustiChuka', click: () => app.quit() },
  ]);

  tray.setToolTip('DrustiChuka');
  tray.setContextMenu(menu);
}

app.whenReady().then(() => {
  createWindow();
  createTray();
});

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') app.quit();
});