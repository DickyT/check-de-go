import { app, BrowserWindow, ipcMain, dialog } from 'electron';
import installExtension, { REACT_DEVELOPER_TOOLS } from 'electron-devtools-installer';
import { enableLiveReload } from 'electron-compile';
import * as os from 'os';
import * as path from 'path';
import * as fs from 'fs';

// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
let mainWindow: Electron.BrowserWindow | null = null;

const isDevMode = process.execPath.match(/[\\/]electron/);

if (isDevMode) {
  enableLiveReload({ strategy: 'react-hmr' });
}

const createWindow = async () => {
  // Create the browser window.
  mainWindow = new BrowserWindow({
    width: 1024,
    height: 768,
  });

  // and load the index.html of the app.
  mainWindow.loadURL(`file://${__dirname}/index.html`);

  // Open the DevTools.
  if (isDevMode) {
    await installExtension(REACT_DEVELOPER_TOOLS);
    mainWindow.webContents.openDevTools();
  }

  // Emitted when the window is closed.
  mainWindow.on('closed', () => {
    // Dereference the window object, usually you would store windows
    // in an array if your app supports multi windows, this is the time
    // when you should delete the corresponding element.
    mainWindow = null;
  });
};

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on('ready', createWindow);

// Quit when all windows are closed.
app.on('window-all-closed', () => {
  // On OS X it is common for applications and their menu bar
  // to stay active until the user quits explicitly with Cmd + Q
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', () => {
  // On OS X it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (mainWindow === null) {
    createWindow();
  }
});

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and import them here.

ipcMain.on('ON_SELECT_SAVE_DIR', (event: any, defaultPath: string) => {
  dialog.showSaveDialog({
    defaultPath,
  }, (dir) => {
    event.sender.send('ON_SELECT_SAVE_DIR_DONE', dir);
  });
});

interface ScreeshotIPCArgs {
  preview: boolean;
  urls: string[];
  dir: string;
}

ipcMain.on('ON_GENERATE_SCREENSHOT', (event: any, { preview, urls, dir }: ScreeshotIPCArgs) => {
  const generateWindow = new BrowserWindow({
    show: preview,
    webPreferences: {
      webSecurity: false,
      backgroundThrottling: false,
      webgl: false,
    },
    frame: preview,
    enableLargerThanScreen: true,
    // width: 7700,
    // height: 3550,
  });

  // generateWindow.webContents.openDevTools();

  generateWindow.webContents.on('did-stop-loading', () => {
    setTimeout(() => {
      const targetClassName = preview ? 'check' : 'print-paper';
      generateWindow.webContents.executeJavaScript(`JSON.stringify(document.querySelector('.${targetClassName}').getBoundingClientRect())`, true)
        .then((result) => {
          const size = JSON.parse(result);
          // const ratio = window.devicePixelRatio;
          // const captureSize = {
          //   width: ratio * size.width,
          //   height: ratio * size.height,
          // };

          generateWindow.setSize(size.width, size.height);
          if (!preview) {
            generateWindow.capturePage((image) => {
              fs.writeFile(dir, image.toPNG(), (err: any) => {
                let error = false;
                if (err) {
                  error = err;
                }
                generateWindow.close();
                event.sender.send('ON_GENERATE_SCREENSHOT_DONE', error);
              });
            });
          }
        });
    }, 100);
  });

  generateWindow.loadURL(urls[0]);
});

ipcMain.on('ON_SAVE_CONFIG', (_: any, config: object) => {
  dialog.showSaveDialog({
    defaultPath: path.join(os.homedir(), 'Desktop', 'check-de-go.conf.json'),
  }, (dir) => {
    fs.writeFile(dir, JSON.stringify(config, null, 4), () => { });
  });
});

ipcMain.on('ON_LOAD_CONFIG', (event: any) => {
  dialog.showOpenDialog({
    defaultPath: path.join(os.homedir(), 'Desktop', 'check-de-go.conf.json'),
    properties: [
      'openFile',
      'createDirectory',
      'promptToCreate',
    ],
  }, (dirs) => {
    fs.readFile(dirs[0], 'utf8', (err, config) => {
      if (!err) {
        event.sender.send('ON_LOAD_CONFIG_DONE', config);
      }
    });
  });
});
