const { contextBridge, ipcRenderer } = require('electron')

const { fs }  = require('fs');
const { http } = require('http');



contextBridge.exposeInMainWorld('api', {
    send: (channel, data) => ipcRenderer.send(channel, data)
  }
)

