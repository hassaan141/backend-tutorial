import cv2 as cv
import numpy as np

cap = cv.VideoCapture(0)

while True:
    isTrue, frame = cap.read()
    if isTrue:
        flipped_frame = cv.flip(frame, 1)  # Flip horizontally
        cv.imshow("Cam", flipped_frame)
        if cv.waitKey(1) == ord('d'):
            break

cap.release()  # Release the camera
cv.destroyAllWindows()
