const electron = require("electron");
var app = electron.app;
const BrowserWindow = electron.BrowserWindow;
//const {app, BrowserWindow} = require('electron')
const path = require('path')
const url = require('url')
const Menu = electron.Menu

const fs = require('fs');
const { promisify } = require('util');
const readFile = promisify(fs.readFile);

let win;

function createWindow () {

  win = new BrowserWindow({
	  width: 900, 
    height: 600, icon : "icon.ico",
	  webPreferences:{
    zoomFactor: 0.5,
    nodeIntegration: true
  }
  
  })

  win.loadURL(url.format({
    pathname: path.join(__dirname, 'index.html'),
    protocol: 'file:',
    slashes: true
  }));


  win.on('closed', () => {
    win = null
  });
}

app.on('ready', function(){
  createWindow();

  const template = [
	{ role: 'zoomin' },
    { role: 'zoomout' },
	{ role: 'togglefullscreen' }
  ]
  const menu = Menu.buildFromTemplate(template)
  Menu.setApplicationMenu(menu);
});


app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', () => {
  if (win === null) {
    createWindow();
  }
});


async function loadHTML(html){
  const render = await readFile(path.join(__dirname, html), 'utf-8');
  const parser = new DOMParser();
  const childernArray = parser.parseFromString(render,'text/html').querySelector('body').childNodes;
  const frag = document.createDocumentFragment();
  childrenArray.forEach(item => {
      frag.appendChild(item);
  });
  document.body.appendChild(frag);
};