const { contextBridge } = require('electron');

contextBridge.exposeInMainWorld('api', {
  electron: process.versions.electron,
});
