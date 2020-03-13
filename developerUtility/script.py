import numpy as np
import cv2
import matplotlib.pyplot as plt
from scipy.spatial.distance import euclidean
import base64
import os

"""
function setBase64Image(id, orientation){
    image = id + "_" + orientation;
    switch(image){
"""




inputDir = "C:/Users/Lorenzo/Desktop/descent/descent_quest_builder/assets/tiles/"
#outputDir = "C:/Users/Lorenzo/Desktop/descent/descent_desktop_app/descent_quest_builder-win32-x64/resources/app/assets/tiles/shadows_of_nerekhall/"
output_path = "C:/Users/Lorenzo/Desktop/descent/descent_quest_builder/developerUtility/outputs/baseOutsideAndMiscellaneous"

for directory in os.listdir(inputDir):
    if(directory == "base"):
        file = open(output_path + directory + ".js","w+")
        file.write("function " + directory + "(id, orientation){\n\
        image = id + '_' + orientation;\n\
        switch(image){\n")
        actualDirectoryPath = inputDir + directory + "/"
        for filename in os.listdir(actualDirectoryPath):
            if ( filename.endswith('_000.png') and (not filename.endswith('B_000.png'))):
                image = open(actualDirectoryPath + filename, "rb")
                base64encoded = base64.b64encode(image.read())
                trimmed = str(base64encoded).split("b'")[1]
                trimmed = trimmed.split("'")[0]
                #file.write("[id='" + filename.split("_")[0] + "'] [orientation='0'] {content:url(\"data:image/png;base64," + str(base64encoded) + "\"}\n")
                file.write("case \"" + filename.split("_")[0] + "_0\": return \"data:image/png;base64," + trimmed + "\";\n")
        file.write("\n}\n}")


"""
        if filename.endswith('_090.png'):
            image = open(actualDirectoryPath + filename, "rb")
            base64encoded = base64.b64encode(image.read())
            trimmed = str(base64encoded).split("b'")[1]
            trimmed = trimmed.split("'")[0]
            #file.write("[id='" + filename.split("_")[0] + "'] [orientation='0'] {content:url(\"data:image/png;base64," + str(base64encoded) + "\"}\n")
            file.write("case \"" + filename.split("_")[0] + "_90\": return \"data:image/png;base64," + trimmed + "\";\n")
        if filename.endswith('_180.png'):
            image = open(actualDirectoryPath + filename, "rb")
            base64encoded = base64.b64encode(image.read())
            trimmed = str(base64encoded).split("b'")[1]
            trimmed = trimmed.split("'")[0]
            #file.write("[id='" + filename.split("_")[0] + "'] [orientation='0'] {content:url(\"data:image/png;base64," + str(base64encoded) + "\"}\n")
            file.write("case \"" + filename.split("_")[0] + "_180\": return \"data:image/png;base64," + trimmed + "\";\n")
        if filename.endswith('_270.png'):
            image = open(actualDirectoryPath + filename, "rb")
            base64encoded = base64.b64encode(image.read())
            trimmed = str(base64encoded).split("b'")[1]
            trimmed = trimmed.split("'")[0]
            #file.write("[id='" + filename.split("_")[0] + "'] [orientation='0'] {content:url(\"data:image/png;base64," + str(base64encoded) + "\"}\n")
            file.write("case \"" + filename.split("_")[0] + "_270\": return \"data:image/png;base64," + trimmed + "\";\n")
"""


#for filename in os.listdir(inputDir):
#    if filename.endswith('.png'):       
#        img = cv2.imread(inputDir + filename, cv2.IMREAD_UNCHANGED)
#        old_size = img.shape
#        toCut0 = int(img.shape[0]/72)
#        toCut1 = int(img.shape[1]/72)
#        newImage = np.zeros( (old_size[0] - toCut0,old_size[1] - toCut1,4), dtype=np.uint8 )
#        cutting 0
#        count = 0
#        countNew = 0
#        countForCut = 0
#        while(count < old_size[0]):
#            if(countForCut == 73):#every 73 lines i don't take a line
#                countForCut = 0
#            else:
#                count1 = 0
#                countNew1 = 0
#                countForCut1 = 0
#                while(count1 < old_size[1]):
#                    if(countForCut1 == 73):
#                        countForCut1 = 0
#                    else:
#                        newImage[countNew][countNew1] = img[count][count1]
#                        countNew1 = countNew1 + 1
#                    countForCut1 = countForCut1 + 1
#                    count1 = count1 + 1
#                countNew = countNew + 1
#            countForCut = countForCut + 1
#            count = count + 1
#        cv2.imwrite(outputDir + filename, newImage, [cv2.IMWRITE_JPEG_QUALITY, 100])

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