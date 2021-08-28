const { contextBridge, ipcRenderer } = require('electron')

const { fs }  = require('fs');
const { http } = require('http');



contextBridge.exposeInMainWorld('api', {
    send: (channel, data) => ipcRenderer.send(channel, data),
    on: (channel, callback) => ipcRenderer.on(channel, (event, argv)=>callback(event, argv))
  }
)

