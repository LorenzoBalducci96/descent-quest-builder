import numpy as np
import cv2
import matplotlib.pyplot as plt
import os

baseFolder = "assets/tiles/heroes/"
setName = "heroes"
pieceType = "tile"
single = "no"
input_path = 'C:/xampp/htdocs/descent_quest_builder/assets/tiles/heroes'
output_path = 'C:/xampp/htdocs/descent_quest_builder/developerUtility/outputs/output.txt'
file = open(output_path,"w+") 
for filename in os.listdir(input_path):
    if filename.endswith('_000.png'):
        idName = filename.split('_')[0]
        idName = idName + "_1"
        file.write("<image src=\"" + baseFolder + filename + "\" set=\"" + setName + "\" image=\"" + filename.split('_')[0] + "\" orientation=\"0\" single=\"" + single + "\"\
                pieceType=\"" + pieceType + "\" oncontextmenu=\"return false;\" id=\"" + idName + "\"\
                style=\"position: absolute; cursor: move; width: 100%; z-index: -1\" onMap=\"no\"></image>\n")