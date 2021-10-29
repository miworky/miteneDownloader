// Modules to control application life and create native browser window
const { app, BrowserWindow, ipcMain, dialog } = require('electron')
const path = require('path')
const fs = require('fs')
const https = require('https')

function createWindow () {
  // Create the browser window.
  const mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js') 
    }
  })

  mainWindow.setMenuBarVisibility(false);

  const package_name = "Mitene Downloader";
  const package_version = "1.1.0";
  const title = package_name + " " + package_version;
  mainWindow.setTitle(title);

  // and load the index.html of the app.
  mainWindow.loadFile('index.html')

  // Open the DevTools.
//  mainWindow.webContents.openDevTools()
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.whenReady().then(() => {
  createWindow()

  app.on('activate', function () {
    // On macOS it's common to re-create a window in the app when the
    // dock icon is clicked and there are no other windows open.
    if (BrowserWindow.getAllWindows().length === 0) createWindow()
  })
})

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on('window-all-closed', function () {
  if (process.platform !== 'darwin') app.quit()
})

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and require them here.



// uriのファイルを filename としてダウンロードする
const download = (event, uri, filename, downloadProgress, fileNum) => {
  return new Promise((resolve, reject) =>
    https
      .request(uri, (res) => {
        res
          .pipe(fs.createWriteStream(filename))
          .on("close", () => {
             // 1つダウンロード完了した

             // ダウンロード完了したファイルの個数をカウントアップ
             downloadProgress.finished = downloadProgress.finished + 1;

             // レンダラープロセスにその旨通知
             event.reply('downloadProgress', "downloading " + downloadProgress.finished.toString() + "/" + fileNum.toString());

             resolve();
           })
          .on("error", reject);
      })
      .end()
  );
};



ipcMain.on('downloadAll', function( event, data){

    // ダウンロード先のフォルダを選択するダイアログを表示する 
    const downloadPath = dialog.showOpenDialogSync(null, {
            properties: ['openDirectory'],
            title: 'download to',
            defaultPath: '.'
    });

    if (downloadPath === undefined) {
       // キャンセルされた
       return;
    }

    let downloadProgress = { finished: 0 };
    let downloads = [];  // ダウンロードするファイルの個数分の Promise を格納する配列

    // ファイル数分ダウンロードする Promise を生成する（まだダウンロードはしない）
    const fileNum = data.length;
    for (let fileNo = 0;fileNo < fileNum;fileNo++) {
       const url = data[fileNo]["url"];
       const filename = data[fileNo]["filename"];

//       console.log( filename );
//       console.log( url );

       const downloadTo = downloadPath + "/" + filename;
       const thisDownload = download(
           event, url, downloadTo, downloadProgress, fileNum
       );

       downloads.push(thisDownload);
    }

    // ダウンロード開始をレンダラープロセスに通知
    event.reply('startDownloading', fileNum.toString() + " files will be downloaded.");

    // まとめてダウンロード開始
    Promise.all(downloads).then(() => { 
        // すべてのダウンロードが完了したら、その旨をレンダラープロセスに通知
        event.reply('finishDownloading', fileNum.toString() + " files were downloaded.");
    });

})








