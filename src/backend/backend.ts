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
      resolve("myfunc1 - this worked! data:" + data[0]);
    } else {
      reject("myfunc1 - this didn't work!");
    }
  });
}


// import ffi from "ffi-napi";
import path from 'node:path';

// Note: Data is an array of arguments passed from the frontend.
export async function loadCASBACnetStack(_event : any, data : any[]) {
  return new Promise(function (resolve, reject) {
    // do stuff

    const CASBACNETSTACK_LIBARY_FILENAME = path.join(__dirname, '../../static/bin', 'CASBACnetStack_x64_Release.dll');
    console.log("libary path: " + CASBACNETSTACK_LIBARY_FILENAME);

    // const stack = ffi.Library(CASBACNETSTACK_LIBARY_FILENAME, {
    //   // Version Functions
    //   // ==============================================================================================
    //   BACnetStack_GetAPIMajorVersion: ["uint32", []],
    //   BACnetStack_GetAPIMinorVersion: ["uint32", []],
    //   BACnetStack_GetAPIPatchVersion: ["uint32", []],
    //   BACnetStack_GetAPIBuildVersion: ["uint32", []],
    // })
    // 
    // const version: string = stack.BACnetStack_GetAPIMajorVersion() + "." + stack.BACnetStack_GetAPIMinorVersion() + "." + stack.BACnetStack_GetAPIPatchVersion();
    // console.log("CAS BACnet Stack version:" + version);
    // resolve("CAS BACnet Stack version:" + version);

  });
}


let processID: any;

import {spawn} from 'node:child_process';
import {join} from 'node:path';

export async function launchProgram(_event : any, data : any[]) {
  return new Promise(function (resolve, reject) {
    // do stuff

    // Nodejs
    // Get the current running directory.
    console.log("__dirname: " + __dirname);
    const appPath = join(__dirname, '../../static/bin', 'BACnetServerExample_x64_Release.exe');
    console.log("appPath: " + appPath);


    try {
      processID = spawn(appPath);
      console.log("Process started subprocess.pid: " + processID.pid);

      processID.on('close', (code) => {
        console.log(`child process exited with code ${code} - processID.pid: ${
          processID.pid
        }`);
        processID = null;
      });
      resolve("processID started subprocess.pid: " + processID.pid);
    } catch (error) {
      reject("Could not start processID " + error);
    }
  });
}


export async function CheckProgram(_event : any, data : any[]) {
  return new Promise(function (resolve, reject) { // Check to see if the process is already running.

    if (processID) {
      console.log("processID already running subprocess.pid: " + processID.pid);
      resolve("processID already running subprocess.pid: " + processID.pid);
      return;
    } else {
      reject("processID not running");
      return;
    }
  });
}


export async function KillProgram(_event : any, data : any[]) {
  return new Promise(function (resolve, reject) { // Check to see if the process is already running.

    if (processID) {
      console.log("processID is running subprocess.pid: " + processID.pid);
      processID.kill();
      resolve("processID is killed. subprocess.pid: " + processID.pid);
      return;
    } else {
      reject("processID not running");
      return;
    }

  });
}