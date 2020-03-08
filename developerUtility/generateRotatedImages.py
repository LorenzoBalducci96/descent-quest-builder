import numpy as np
import cv2
import matplotlib.pyplot as plt
import os

input_path = 'C:/Users/Lorenzo/Desktop/descent/descent_quest_builder/developerUtility/outputs/toRotate/'
output_path = 'C:/Users/Lorenzo/Desktop/descent/descent_quest_builder/developerUtility/outputs/'
for filename in os.listdir(input_path):
    if filename.endswith('.png'):
        img = cv2.imread(input_path + filename, cv2.IMREAD_UNCHANGED)
        baseName = filename.split('.')[0]
        cv2.imwrite(output_path + baseName + '_000.png', img, [cv2.IMWRITE_JPEG_QUALITY, 100])
        rotated = cv2.rotate(img, cv2.ROTATE_90_CLOCKWISE)
        cv2.imwrite(output_path + baseName + '_090.png', rotated, [cv2.IMWRITE_JPEG_QUALITY, 100])
        rotated = cv2.rotate(img, cv2.ROTATE_180)
        cv2.imwrite(output_path + baseName + '_180.png', rotated, [cv2.IMWRITE_JPEG_QUALITY, 100])
        rotated = cv2.rotate(img, cv2.ROTATE_90_COUNTERCLOCKWISE)
        cv2.imwrite(output_path + baseName + '_270.png', rotated, [cv2.IMWRITE_JPEG_QUALITY, 100])