const
    electron = require('electron'),
    app = electron.app,
    BrowserWindow = electron.BrowserWindow,

    path = require('path'),
    url = require('url'),

    windowStateKeeper = require('electron-window-state');

// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
let mainWindow;

function createWindow () {
    const
        screenSize = electron.screen.getPrimaryDisplay().workAreaSize,

        mainWindowState = windowStateKeeper({
            defaultWidth: Math.min(1440, screenSize.width - 100),
            defaultHeight: Math.min(1080, screenSize.height - 100)
        });


  // Create the browser window.

    mainWindow = new BrowserWindow({
        x: mainWindowState.x,
        y: mainWindowState.y,
        width: mainWindowState.width,
        height: mainWindowState.height,
        title: "Betaflight Enhanced Blackbox Explorer"
    });

  // and load the index.html of the app.
    mainWindow.loadURL(url.format({
        pathname: path.join(__dirname, '/app/index.html'),
        protocol: 'file:',
        slashes: true
    }));

  // Open the DevTools.
  if (process.argv.indexOf("--debug") != -1) {
      mainWindow.webContents.openDevTools();
  }

  mainWindowState.manage(mainWindow);

  // Emitted when the window is closed.
  mainWindow.on('closed', function () {
    // Dereference the window object, usually you would store windows
    // in an array if your app supports multi windows, this is the time
    // when you should delete the corresponding element.
    mainWindow = null;
  })
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on('ready', createWindow);

// Quit when all windows are closed.
app.on('window-all-closed', function () {
  // On OS X it is common for applications and their menu bar
  // to stay active until the user quits explicitly with Cmd + Q
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', function () {
  // On OS X it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (mainWindow === null) {
    createWindow();
  }
});

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and require them here.
