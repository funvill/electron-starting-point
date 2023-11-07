//
// Preload scripts contain code that executes in a renderer process before its web content 
// begins loading. These scripts run within the renderer context, but are granted more 
// privileges by having access to Node.js APIs.
// https://www.electronjs.org/docs/latest/tutorial/process-model#preload-scripts

// 
// See the Electron documentation for details on how to use preload scripts:
// https://www.electronjs.org/docs/latest/tutorial/process-model#preload-scripts

import {contextBridge, ipcRenderer} from 'electron';

console.log('👋 This message is being logged by "preload.ts"');

// All of the Node.js APIs are available in the preload process.
// It has the same sandbox as a Chrome extension.
window.addEventListener('DOMContentLoaded', () => {
  const replaceText = (selector, text) => {
      const element = document.getElementById(selector)
      if (element) element.innerText = text
  }

  for (const type of ['chrome', 'node', 'electron']) {
      replaceText(`${type}-version`, process.versions[type])
  }
})

/**
 * HERE YOU WILL EXPOSE YOUR 'myfunc' FROM main.js
 * TO THE FRONTEND.
 * (remember in main.js, you're putting preload.js
 * in the electron window? your frontend js will be able
 * to access this stuff as a result.
 */


contextBridge.exposeInMainWorld(
  "api", {
      invoke: (channel, data) => {
          let validChannels = ["myfunc"]; // list of ipcMain.handle channels you want access in frontend to
          if (validChannels.includes(channel)) {
              // ipcRenderer.invoke accesses ipcMain.handle channels like 'myfunc'
              // make sure to include this return statement or you won't get your Promise back
              return ipcRenderer.invoke(channel, data); 
          }
      },
  }
);