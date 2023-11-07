/**
 * renderer process (i.e. your frontend js file - I'll call it frontend.js):
 * 
 * This file by default does not have access to NODEJS
 * Think of it as the browser javascript file.
 * -----------------------------------------------------
 * 
 * This file will automatically be loaded by webpack and run in the "renderer" context.
 * To learn more about the differences between the "main" and the "renderer" context in
 * Electron, visit:
 *
 * https://electronjs.org/docs/latest/tutorial/process-model
 *
 * By default, Node.js integration in this file is disabled. When enabling Node.js integration
 * in a renderer process, please be aware of potential security implications. You can read
 * more about security risks here:
 *
 * https://electronjs.org/docs/tutorial/security
 *
 */

import './index.css';
console.log('👋 This message is being logged by "renderer.js", included via webpack');

// Add the current date to the output div.
document.querySelector('#output').innerHTML += 'Starting up ' + new Date() + '<br>';

// --------------------------------------------------

// Add a click event handler to the button
// This event will be handled by the main process / BrowserWindow
document.querySelector('#browserButton').addEventListener('click', () => {
  document.querySelector('#output').innerHTML += 'browserButton - Input was: ' + document.querySelector('#input').value + '</br>';
});

// Add a click event handler to the button
// This event will be passed to ipcMain in the main process to be handled by the node process.
// const {ipcRenderer} = require('electron');
document.querySelector('#nodeButton').addEventListener('click', () => {

  const inputValue = document.querySelector('#input').value;
  
  window.api.invoke('myfunc', [inputValue])
    .then(function(results) {
      document.querySelector('#output').innerHTML += "NodeButton Results: " + results + "<br>";
    })
    .catch(function(err) {
      document.querySelector('#output').innerHTML += "NodeButton Results: Error: " + err + "<br>";
    });
});
