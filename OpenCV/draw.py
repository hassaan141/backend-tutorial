import cv2 as cv
import numpy as np

# Creating a blank canvas, img datatupe is uint8
blank = np.zeros((500,500, 3), dtype='uint8')
cv.imshow("Blank", blank)

# img = cv.imread('Videos/cat.jpg')
# cv.imshow("Cat", img)

# 1. painting image green [:] looks at all the pixels
# blank[200:300] = 0,255,0
# cv.imshow("Green", blank)

# 2. Draw a rectangle
#To draw a rectangle outline
cv.rectangle(blank, (0,0), (250,250), (0,255,0), thickness=2)
#Drawing a filled rectanle
cv.rectangle(blank, (0,0), (250,250), (0,255,0), thickness=cv.FILLED)
cv.imshow("Border", blank)

# 3.Draw a circle
cv.circle(blank, (250, 250), 40, (0,0,255), thickness=3)
cv.imshow("Circle", blank)

# 4. Draw a line
cv.line(blank, (0,0), (250, 250), (255, 255, 255), thickness=5)
cv.imshow("Line", blank)

cv.waitKey(0)