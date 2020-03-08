import numpy as np
import cv2
import matplotlib.pyplot as plt
import os


inputDir = 'C:/Users/Lorenzo/Desktop/descent/descent_quest_builder/assets/tiles/lieutenants/'
outputDir = 'C:/Users/Lorenzo/Desktop/descent/descent_quest_builder/developerUtility/outputs/'
for filename in os.listdir(inputDir):
    if filename.endswith('.png'):       
        img = cv2.imread(inputDir + filename, cv2.IMREAD_UNCHANGED)
        old_size = img.shape
        resized = cv2.copyMakeBorder(img, 18, 18, 18, 18, cv2.BORDER_CONSTANT, value=[0,0,0,0])
        cv2.imwrite(outputDir + filename, resized, [cv2.IMWRITE_JPEG_QUALITY, 100])