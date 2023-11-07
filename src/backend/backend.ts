/**
 * This file contains all the backend functions that you want to expose to the frontend.
 * This file has access to Node.js APIs.
 * 
 * When adding a new function to this file you need to do the following:
 * - In main.ts, add a new ipcMain.handle function.
 * - In preload.ts, Updated the validChannels with the new function name
 */
import {shell} from 'electron';

// Note: Data is an array of arguments passed from the frontend.
export async function myfunc(_event:any, data:any[]) {
  return new Promise(function (resolve, reject) { // do stuff
    if (true) {
      shell.openExternal('https://github.com')
      resolve("this worked! data:" + data[0]);
    } else {
      reject("this didn't work!");
    }
  });
}
