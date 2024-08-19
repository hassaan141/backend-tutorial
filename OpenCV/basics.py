import cv2 as cv

img = cv.imread("Videos/cat.jpg")
cv.imshow('Cat', img)

#Converting from color to gray 
gray = cv.cvtColor(img, cv.COLOR_BGR2GRAY)
cv.imshow('Gray', gray)

#Blur an image
blur = cv.GaussianBlur(img, (13,13), cv.BORDER_DEFAULT)
cv.imshow('Blur', blur)

#Edge Cascade (To reduce the edges, blur first)
canny = cv.Canny(img, 125, 175)
cv.imshow('Canny', canny)

#dilation for an image (small diff and thicker)
dilated = cv.dilate(canny, (3,3), iterations=1)

#eroded
eroded = cv.erode(dilated, (3,3), iterations=1)
cv.imshow("eroded", eroded)

#resize without chaing the aspect ratio
#To resize to smaller image
resize = cv.resize(img, (200,500), interpolation=cv.INTER_AREA)
#To resize to larger image
resize = cv.resize(img, (200,500), interpolation=cv.INTER_CUBIC)
cv.imshow("resize", resize)

#CROPPING
crop = img[50:200, 200:400]
cv.imshow("crop", crop)

cv.waitKey(0)