# descent-quest-builder
web-page/desktop-application for creating custom missions for descent board game.

Due to the end of the official descent quest vault i decided to create this project hoping fantasy flight games will restore the official site one day.

download releases here: https://github.com/LorenzoBalducci96/descent-quest-builder/releases

if you want to have a quick look you can test the github web page:
https://lorenzobalducci96.github.io/descent-quest-builder/index_web.html
Take into account that using the loading of the page from the internet will require a LOOOOOOOOOONG TIME :) so consider to pick one of the distributions

![watch the demo image on the repository](/doc_images/demo.gif?raw=true "UI_DEMO")

run:
  * The desktop application is made with electron (run with npm start, or download a release for your operating system).
  * The web page is runnable in a web browser launching index_web.html

Assets:
  * The desktop application use png images in supplied in 4 versions: original orientation, 90 degrees, 180 degrees, 270 degreees with name scheme: "TILENAME_000.png", "TILENAME_090.png", "TILENAME_180", "TILENAME_270.png".
  * the web page use base64 images generated with javascript (this is done to avoid cors issues and let the user run the page in any      browser) that maintains just the original orientation memorized in the file and dynamically generates the other orientations.
  
This different logic was taken to reduce data traffic in the web app and to prioritize responsiveness in desktop application 

Project save:
  * The desktop application can save your project into his folder (backup of entire innerHTML of the document) and can then show all your saved projects and restore the session.
  * The web page (runnable from index_web.html) let you download a backup html file for restoring the project.



implementation notes:
The javascript is a little tricky because all the movement/resizing/reshaping and "snapping to square" functions of the images are implemented from scratch, the canvas are produced just for ignore the click on trasparent position of the images.

html2canvas is used to produce the canvas from the output div.
jsPDF is used to produce the output PDF with the mission from the canvas.
