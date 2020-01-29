# descent-quest-builder
web page for creating custom missions for descent board game.

Due to the end of the official descent quest vault i decided to create this project hoping fantasy flight games will restore the official site one day.

The javascript is a little tricky because all the movement/resizing/reshaping and "snapping to square" functions of the images are implemented from scratch, the canvas are produced just for ignore the click on trasparent position of the images.

The images are in supplied in 4 versions: original orientation, 90 degrees, 180, degrees, 270degreees with name scheme: "TILE_NAME.png", "TILE_NAME90.png", "TILE_NAME180", "TILE_NAME270.png".
This was decided because rotating the image or the canvas would have required to design a more complex "snapping algorithm".

jsPDF is used to produce the output PDF with the mission.

Running the web page in a normal chrome instance will cause the canvas to deal with "the canvas has been tainted by cross-origin data".
No problem running with edge.
Because of this, a wrapping on electron framework will be taken into account.
