import cv2 as cv

# img = cv.imread("Videos/cat.jpg")
# cv.imshow('Cat', img)

def rescaleFrame(frame, scale = 0.75):
  width = int(frame.shape[1]*scale)
  height = int(frame.shape[0]*scale)
  dimensions = (width,height)

  return cv.resize(frame, dimensions, interpolation=cv.INTER_AREA)

cap = cv.VideoCapture('Videos/kitten.mp4')

while True:
    isTrue, frame = cap.read()

    frame_resize = rescaleFrame(frame)

    cv.imshow('Video', frame)
    cv.imshow('Video New', frame_resize)


    if cv.waitKey(20) & 0xFF==ord('d'):
      break

cap.release()
cv.destroyAllWindows()
 