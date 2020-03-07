import numpy as np
import cv2
import matplotlib.pyplot as plt
# import matplotlib.lines as mlines
from scipy.spatial.distance import euclidean
# from scipy.signal import argrelextrema, convolve, argrelmin

import os

inputDir = "C:/Users/Lorenzo/Desktop/descent/descent_desktop_app/descent_quest_builder-win32-x64/resources/app/assets/tiles/shadows_of_nerekhall_backup/"
outputDir = "C:/Users/Lorenzo/Desktop/descent/descent_desktop_app/descent_quest_builder-win32-x64/resources/app/assets/tiles/shadows_of_nerekhall/"
for filename in os.listdir(inputDir):
    if filename.endswith('.png'):       
        img = cv2.imread(inputDir + filename, cv2.IMREAD_UNCHANGED)
        old_size = img.shape
        toCut0 = int(img.shape[0]/72)
        toCut1 = int(img.shape[1]/72)
        newImage = np.zeros( (old_size[0] - toCut0,old_size[1] - toCut1,4), dtype=np.uint8 )

        #cutting 0
        count = 0
        countNew = 0
        countForCut = 0
        while(count < old_size[0]):
            if(countForCut == 73):#every 73 lines i don't take a line
                countForCut = 0
            else:
                count1 = 0
                countNew1 = 0
                countForCut1 = 0
                while(count1 < old_size[1]):
                    if(countForCut1 == 73):
                        countForCut1 = 0
                    else:
                        newImage[countNew][countNew1] = img[count][count1]
                        countNew1 = countNew1 + 1

                    countForCut1 = countForCut1 + 1
                    count1 = count1 + 1

                countNew = countNew + 1

            countForCut = countForCut + 1
            count = count + 1
        cv2.imwrite(outputDir + filename, newImage, [cv2.IMWRITE_JPEG_QUALITY, 100])

#scale_percent = 99
#for filename in os.listdir(inputDir):
#    if filename.endswith('.png'):       
#        img = cv2.imread(inputDir + filename, cv2.IMREAD_UNCHANGED)        
#        width = int(img.shape[1] * scale_percent / 100)
#        height = int(img.shape[0] * scale_percent / 100)
#        dsize = (width, height)
#        output = cv2.resize(img, dsize)
#        cv2.imwrite(outputDir + filename, output, [cv2.IMWRITE_JPEG_QUALITY, 100])

#for filename in os.listdir(inputDir):
#    if filename.endswith('.png'):       
#        img = cv2.imread(inputDir + filename, cv2.IMREAD_UNCHANGED)
#        old_size = img.shape
#        cropped = img[3:old_size[0]-3, 3:old_size[1]-3]
#        cv2.imshow("normal", img)
#        cv2.imshow("cropped", cropped)
#        cv2.imwrite(outputDir + filename, cropped, [cv2.IMWRITE_JPEG_QUALITY, 100])


#for filename in os.listdir(inputDir):
#    if filename.endswith('.png'):       
#        img = cv2.imread(inputDir + filename, cv2.IMREAD_UNCHANGED)
#        old_size = img.shape
#        resized = cv2.copyMakeBorder(img, 3, 3, 3, 3, cv2.BORDER_CONSTANT, value=[0,0,0,0])
#        cv2.imwrite(outputDir + filename, resized, [cv2.IMWRITE_JPEG_QUALITY, 100])
        
#input_path = 'C:/Users/Lorenzo/Desktop/descent/script_generazione_cose/toRotate/'
#output_path = 'C:/Users/Lorenzo/Desktop/descent/script_generazione_cose/rotated/'
#for filename in os.listdir(input_path):
#    if filename.endswith('.png'):
#        img = cv2.imread(input_path + filename, cv2.IMREAD_UNCHANGED)
#        baseName = filename.split('.')[0]
#        cv2.imwrite(output_path + baseName + '_000.png', img, [cv2.IMWRITE_JPEG_QUALITY, 100])
#        rotated = cv2.rotate(img, cv2.ROTATE_90_CLOCKWISE)
#        cv2.imwrite(output_path + baseName + '_090.png', rotated, [cv2.IMWRITE_JPEG_QUALITY, 100])
#        rotated = cv2.rotate(img, cv2.ROTATE_180)
#        cv2.imwrite(output_path + baseName + '_180.png', rotated, [cv2.IMWRITE_JPEG_QUALITY, 100])
#        rotated = cv2.rotate(img, cv2.ROTATE_90_COUNTERCLOCKWISE)
#        cv2.imwrite(output_path + baseName + '_270.png', rotated, [cv2.IMWRITE_JPEG_QUALITY, 100])

#baseFolder = "assets/tiles/rotated/"
#setName = "trollfens"
#pieceType = "tile"
#single = "yes"
#input_path = 'C:/Users/Lorenzo/Desktop/descent/script_generazione_cose/rotated/'
#output_path = 'C:/Users/Lorenzo/Desktop/descent/script_generazione_cose/output.txt'
#file = open(output_path,"w") 
#for filename in os.listdir(input_path):
#    if filename.endswith('_000.png'):
#        idName = filename.split('_')[0]
#        idName = idName + "_1"
#        file.write("<image src=\"" + baseFolder + filename + "\" set=\"" + setName + "\" orientation=\"0\" single=\"" + single + "\"\
#                pieceType=\"" + pieceType + "\" oncontextmenu=\"return false;\" id=\"" + idName + "\"\
#                style=\"position: absolute; cursor: move; width: 100%; z-index: -1\" onMap=\"no\"></image>\n")