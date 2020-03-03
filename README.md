# descent-quest-builder
web-page/desktop-application for creating custom missions for descent board game.

Due to the end of the official descent quest vault i decided to create this project hoping fantasy flight games will restore the official site one day.

download releases here: https://github.com/LorenzoBalducci96/descent-quest-builder/releases

![watch the demo image on the repository](/doc_images/demo.gif?raw=true "UI_DEMO")

The desktop application is made with electron.
The desktop application can save your project into his folder (backup of entire innerHTML of the document) and can then show all your saved projects and restore the session.
Running the web page in a browser won't let you save/load project (due to unavailable of node integration) however you can use the rest of the functions but consider that you have to deal with CORS issues caused by canvas created with local images so:

  1) You can use google-chrome with --allow-file-access-from-files options (.bat and .sh launchers provided in the repository)
  2) You can use microsoft edge (not the chromium based one).

implementation notes:
The javascript is a little tricky because all the movement/resizing/reshaping and "snapping to square" functions of the images are implemented from scratch, the canvas are produced just for ignore the click on trasparent position of the images.

The images are in supplied in 4 versions: original orientation, 90 degrees, 180, degrees, 270degreees with name scheme: "TILE_NAME.png", "TILE_NAME90.png", "TILE_NAME180", "TILE_NAME270.png".
This was decided because rotating the image or the canvas would have required to design a more complex "snapping algorithm".

html2canvas is used to produce the canvas from the output div.
jsPDF is used to produce the output PDF with the mission from the canvas.


