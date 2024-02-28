const { app, BrowserWindow, ipcMain } = require('electron') // 导入模块
const path = require('node:path')
/**
app，它着您应用程序的事件生命周期。
BrowserWindow，它负责创建和管理应用窗口。
*/
// 函数将您的页面加载到新的 BrowserWindow 实例中
const createWindow = () => {
  const win = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
    },
  })

  win.loadFile('index.html')
}

app.whenReady().then(() => {
  ipcMain.handle('ping', () => 'pong')
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
