// This is just a sample app. You can structure your Neutralinojs app code as you wish.
// This example app is written with vanilla JavaScript and HTML.
// Feel free to use any frontend framework you like :)
// See more details: https://neutralino.js.org/docs/how-to/use-a-frontend-library



function openDocs() {
    Neutralino.os.open("https://neutralino.js.org/docs");
}

function openTutorial() {
    Neutralino.os.open("https://www.youtube.com/watch?v=txDlNNsgSh8&list=PLvTbqpiPhQRb2xNQlwMs0uVV0IN8N-pKj");
}

function setTray() {
    if(NL_MODE != "window") {
        console.log("INFO: Tray menu is only available in the window mode.");
        return;
    }
    let tray = {
        icon: "/resources/icons/trayIcon.png",
        menuItems: [
            {id: "VERSION", text: "Get version"},
            {id: "SEP", text: "-"},
            {id: "QUIT", text: "Quit"}
        ]
    };
    Neutralino.os.setTray(tray);
}

async function openWindow(url){
    try {
        alert('loadin screen');
        let tvWindow =   await Neutralino.window.create(url,{
           icon: "icons/logo.gif",
           enableInspector: true,
           width: 500,
           height: 300,
           maximizable: false,
           exitProcessOnClose: false,
           processArgs: "--window-id=W_ABOUT",
       });
       console.log(tvWindow, 'tv window');
          } catch (error) {
           console.log("the score board not error", error);
          }
}

function onTrayMenuItemClicked(event) {
    switch(event.detail.id) {
        case "VERSION":
            Neutralino.os.showMessageBox("Version information",
                `Neutralinojs server: v${NL_VERSION} | Neutralinojs client: v${NL_CVERSION}`);
            break;
        case "QUIT":
            Neutralino.app.exit();
            break;
    }
}

function onWindowClose() {
    sessionStorage.clear();
    Neutralino.app.exit();
}

async function showMessageBox(title, content, choice = 'OK', icon = 'INFO'){
   await Neutralino.os.showMessageBox(title, content, choice, icon);
}

Neutralino.init();

Neutralino.events.on("trayMenuItemClicked", onTrayMenuItemClicked);
Neutralino.events.on("windowClose", onWindowClose);

if(NL_OS != "Darwin") { // TODO: Fix https://github.com/neutralinojs/neutralinojs/issues/615
    setTray();
}
async function openTv(){
   try {
    const resp = await Neutralino.window.getTitle();
   console.log('title is here', resp);
   } catch (error) {
    console.log('title is here', error);
   }

}
console.log('count reload');
//openTv();


