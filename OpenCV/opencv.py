import cv2 as cv

# reading images
# img = cv.imread('Videos/cat.jpg')
# cv.imshow('Cat', img)

# Reading a video
cap = cv.VideoCapture('Videos/kitten.mp4')

while True:
  isTrue, frame = cap.read()
  cv.imshow('Video', frame)

  if cv.waitKey(20) & 0xFF==ord('d'):
    break

cap.release()
cv.destroyAllWindows()



cv.waitKey(0)