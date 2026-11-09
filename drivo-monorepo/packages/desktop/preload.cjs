const { contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld('drivoAPI', {
    loadData: () => ipcRenderer.invoke('drivo:load'),
    addCar: (brand, price, year) => ipcRenderer.invoke('drivo:addCar', brand, price, year),
    deleteCar: (id) => ipcRenderer.invoke('drivo:deleteCar', id),
    buyCar: (carId, clientName) => ipcRenderer.invoke('drivo:buyCar', carId, clientName),
    toggleStatus: (orderId) => ipcRenderer.invoke('drivo:toggleStatus', orderId)
});