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
  const replaceText = (selector:any, text:string) => {
    const element = document.getElementById(selector)
    if (element) {
      element.innerText = text;
    }
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

// Fix TypeScript error: Property 'api' does not exist on type 'Window & typeof globalThis'.
// https://stackoverflow.com/a/67246476/58456
declare global {
  interface Window {
    api?: any;
  }
}

// This allows the front end to access the API.
// The API functions are then sendt to the main process via ipcRenderer.invoke
// https://stackoverflow.com/a/73792762/58456
contextBridge.exposeInMainWorld("api", {
  invoke: (channel:any, data:any) => {
    // list of ipcMain.handle channels you want access in frontend to
    const validChannels = ["myfunc", "myfunc2"]; 
    if (validChannels.includes(channel)) {
      // ipcRenderer.invoke accesses ipcMain.handle channels like 'myfunc'
      // make sure to include this return statement or you won't get your Promise back
      return ipcRenderer.invoke(channel, data);
    }
  }
});
