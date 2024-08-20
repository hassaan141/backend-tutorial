import cv2 as cv
import numpy as np
import mediapipe as mp

cap = cv.VideoCapture(0)

#Using media pipe to create a mp_hands object
mp_hands = mp.solutions.hands
#Creating an instint from the mediapipe 
hand = mp_hands.Hands()

while True:
    isTrue, frame = cap.read()

    if isTrue:
        #Converting from BGR to RGB before we process the frame
        RGB_frame = cv.cvtColor(frame, cv.COLOR_BGR2RGB)
        #Storing our proccesed image of hand in results
        result = hand.process(RGB_frame)
        if result.multi_hand_landmarks:
            for hand_landmarks in result.multi_hand_landmarks:
                print(hand_landmarks)
        #If 

        flipped_frame = cv.flip(frame, 1)  # Flip horizontally
        cv.imshow("Cam", flipped_frame)
        if cv.waitKey(1) == ord('d'):
            break

cap.release()  # Release the camera
cv.destroyAllWindows()
