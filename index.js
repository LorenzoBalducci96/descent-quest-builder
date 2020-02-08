const electron = require("electron");
var app = electron.app;
const BrowserWindow = electron.BrowserWindow;
//const {app, BrowserWindow} = require('electron')
const path = require('path')
const url = require('url')
const Menu = electron.Menu

let win;

function createWindow () {

  win = new BrowserWindow({
	  width: 900, 
    height: 600, icon : "assets/icon.ico",
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
    const isMac = process.platform === 'darwin'

    const template = [
                      
    ...(isMac ? [
    {
        label: app.name,
        submenu: [
          { role: 'about' },
          { type: 'separator' },
          { role: 'services' },
          { type: 'separator' },
          { role: 'hide' },
          { role: 'hideothers' },
          { role: 'unhide' },
          { type: 'separator' },
          { role: 'quit' }
        ]
    },
    {
       label: "view",
       submenu: [
           {role: 'zoomin'},
           {role: 'zoomout'},
           {role: 'togglefullscreen'}
       ]
    }
    ] : [
        {role: 'zoomin'},
        {role: 'zoomout'},
        {role: 'togglefullscreen'}
     ])
    ];
    
    const menu = Menu.buildFromTemplate(template);
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



