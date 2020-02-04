# descent-quest-builder
web-page/desktop-application for creating custom missions for descent board game.

Due to the end of the official descent quest vault i decided to create this project hoping fantasy flight games will restore the official site one day.

![watch the demo image on the repository](/demo.gif?raw=true "UI_DEMO")

The desktop application is made with electron.
The desktop application can save your project into his folder (backup of entire innerHTML of the document) and can then show all your saved projects and restore the session.
Running the web page in a browser won't let you save/load project (due to unavailable of node integration) however you can use the rest of the functions but consider:
  1) Firefox won't let you export the PDF due to html2canvas known problems.
  2) If you are experiencing tiles disappearing in google-chrome here are the possible solutions:
      * run google-chrome with the bat or sh script (startWithChrom.bat/sh) or
      * use microsoft edge or
      * consider to use the desktop application (available in desktop_applications folder)
  This is caused by "the canvas has been tainted by cross-origin data" known error.


implementation notes:
The javascript is a little tricky because all the movement/resizing/reshaping and "snapping to square" functions of the images are implemented from scratch, the canvas are produced just for ignore the click on trasparent position of the images.

The images are in supplied in 4 versions: original orientation, 90 degrees, 180, degrees, 270degreees with name scheme: "TILE_NAME.png", "TILE_NAME90.png", "TILE_NAME180", "TILE_NAME270.png".
This was decided because rotating the image or the canvas would have required to design a more complex "snapping algorithm".

html2canvas is used to produce the canvas from the output div.
jsPDF is used to produce the output PDF with the mission from the canvas.


