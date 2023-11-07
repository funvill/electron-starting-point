/**
 * renderer process (i.e. your frontend js file - I'll call it frontend.js):
 * 
 * This file by default does not have access to NODEJS
 * Think of it as the browser javascript file.
 * -----------------------------------------------------
 * 
 * This file will automatically be loaded by vite and run in the "renderer" context.
 * To learn more about the differences between the "main" and the "renderer" context in
 * Electron, visit:
 *
 * https://electronjs.org/docs/tutorial/application-architecture#main-and-renderer-processes
 *
 * By default, Node.js integration in this file is disabled. When enabling Node.js integration
 * in a renderer process, please be aware of potential security implications. You can read
 * more about security risks here:
 *
 * https://electronjs.org/docs/tutorial/security
 *
 */

import './index.css';
console.log('👋 This message is being logged by "frontend.ts", included via webpack');

// Add the current date to the output div.
document.querySelector('#output').innerHTML += 'Starting up ' + new Date() + '<br>';

// --------------------------------------------------

// Add a click event handler to the button
// This event will be handled by the main process / BrowserWindow
document.querySelector('#browserButton').addEventListener('click', () => {
  const inputValue = (<HTMLInputElement>document.querySelector('#input')).value;
  document.querySelector('#output').innerHTML += 'browserButton - Input was: ' + inputValue + '</br>';
});

// --------------------------------------------------

// Add a click event handler to the Node Button
document.querySelector('#nodeButton').addEventListener('click', () => {
  const inputValue = (<HTMLInputElement>document.querySelector('#input')).value;

  // https://stackoverflow.com/a/73792762/58456
  // Note: The arguments passed to the function must come in as a array.
  // The array can contain any number of arguments. Think of it as command line arguments.
  //
  // The window.api object was injected into the window/browser by preload.js
  window.api.invoke('myfunc', [inputValue]).then(function (results:string) {
    document.querySelector('#output').innerHTML += "NodeButton Results: " + results + "<br>";
  }).catch(function (error:any) {
    document.querySelector('#output').innerHTML += "NodeButton Results: Error: " + error + "<br>";
  });
});
