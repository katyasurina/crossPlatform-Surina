const { contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld('drivoAPI', {
    loadData: () => ipcRenderer.invoke('drivo:load'),
    saveData: (data) => ipcRenderer.invoke('drivo:save', data),
});