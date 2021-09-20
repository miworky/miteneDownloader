const { contextBridge, ipcRenderer } = require('electron')

contextBridge.exposeInMainWorld('api', {
    send: (channel, data) => ipcRenderer.send(channel, data),                                   // Renderer process to Main process
    on: (channel, callback) => ipcRenderer.on(channel, (event, argv)=>callback(event, argv))    // Main process to Renderer process
  }
)

