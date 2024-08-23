import cv2 as cv
import numpy as np

img = cv.imread("Videos/cat.jpg")
cv.imshow('Boston', img)

gray = cv.cvtColor(img, cv.COLOR_BGR2GRAY)
cv.imshow('Boston2', gray)

canny = cv.Canny(img, 125, 175)
cv.imshow("Cat", canny)

#countours are the same as edges
# len(countors) gives you the amount of countours

cv.waitKey(0)
 