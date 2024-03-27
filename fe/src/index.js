const { app, BrowserWindow } = require("electron");
const path = require("path");

const { ipcMain } = require("electron");

let mainWindow;
let user;

ipcMain.on("user:login", (event, data) => {
  if (data.password === "haslo") {
    if (data.email === "dm122998@stud.ur.edu.pl") {
      user = {
        name: "Domink",
        role: "QA",
      };
      goDashboard();
    } else if (data.email === "pm@gmail.com") {
      user = {
        name: "Project manager Marek",
        role: "PM",
      };
      goDashboard();
    } else if (data.email === "programista@gmail.com") {
      user = {
        name: "Programista Marek",
        // like Software Designer
        role: "SD",
      };
      goDashboard();
    } else {
      event.reply("login-failed", "Błędne dane logowania");
    }
  } else {
    event.reply("login-failed", "Błędne dane logowania");
  }
});

ipcMain.on("user:logout", () => {
  user = null;
  goIndex();
});

ipcMain.handle("user:get", () => {
  return user;
});

function createWindow() {
  mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      preload: path.join(__dirname, "preload.js"),
    },
  });
}

function goIndex() {
  mainWindow.loadFile("src/index.html");

  // Open the DevTools.
  // mainWindow.webContents.openDevTools();
}

function goDashboard() {
  mainWindow.loadFile("src/dashboard.html");
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.whenReady().then(() => {
  createWindow();
  goIndex();

  app.on("activate", function () {
    // On macOS it's common to re-create a window in the app when the
    // dock icon is clicked and there are no other windows open.
    if (BrowserWindow.getAllWindows().length === 0) createWindow();
  });
});

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on("window-all-closed", function () {
  if (process.platform !== "darwin") app.quit();
});
