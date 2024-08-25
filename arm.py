# import cv2 as cv
# import numpy as np
# import mediapipe as mp
# import pyfirmata2 

# mp_drawing = mp.solutions.drawing_utils
# board = pyfirmata2.Arduino("COM4")
# servo = board.get_pin("d:3:p")

# cap = cv.VideoCapture(0)
# #Using media pipe to create a mp_hands object
# mp_hands = mp.solutions.hands
# #Creating an instance from the mediapipe 
# hand = mp_hands.Hands(max_num_hands=1)

# while True:
#     servo.write(0.5)
#     isTrue, frame = cap.read()

#     if isTrue:
#         #Converting from BGR to RGB before we process the frame
#         RGB_frame = cv.cvtColor(frame, cv.COLOR_BGR2RGB)
#         #Storing our proccesed image of hand in results
#         result = hand.process(RGB_frame)
#         if result.multi_hand_landmarks:
#             for hand_landmarks in result.multi_hand_landmarks:
#                 print(hand_landmarks)
#                 mp_drawing.draw_landmarks(frame, hand_landmarks, mp_hands.HAND_CONNECTIONS)
#         #If 

#         flipped_frame = cv.flip(frame, 1)  # Flip horizontally
#         cv.imshow("Cam", flipped_frame)
#         if cv.waitKey(1) == ord('d'):
#             break

# cap.release()  # Release the camera
# cv.destroyAllWindows()

import cv2 as cv
import numpy as np
import mediapipe as mp
import pyfirmata2 


board = pyfirmata2.Arduino("COM4")
servo = board.get_pin("d:11:p")

cap = cv.VideoCapture(0)
# Using MediaPipe to create an mp_hands object
mp_hands = mp.solutions.hands
# Creating an instance from the MediaPipe 
hand = mp_hands.Hands(max_num_hands=1)
mp_drawing = mp.solutions.drawing_utils

while True:
    isTrue, frame = cap.read()

    if isTrue:
        # Converting from BGR to RGB before we process the frame
        RGB_frame = cv.cvtColor(frame, cv.COLOR_BGR2RGB)
        # Storing our processed image of hand in results
        result = hand.process(RGB_frame)
        
        if result.multi_hand_landmarks:
            for hand_landmarks in result.multi_hand_landmarks:
                # Extracting landmarks for the index finger
                index_tip = hand_landmarks.landmark[mp_hands.HandLandmark.INDEX_FINGER_TIP]
                index_mcp = hand_landmarks.landmark[mp_hands.HandLandmark.INDEX_FINGER_MCP]

                # Comparing the y-coordinates of the index finger tip and the MCP joint
                if index_tip.y < index_mcp.y:  # Finger is open (Tip is above MCP)
                    servo.write(1.0)  # Turn servo to the right
                else:  # Finger is closed (Tip is below or at the same level as MCP)
                    servo.write(0.0)  # Turn servo to the left

                mp_drawing.draw_landmarks(frame, hand_landmarks, mp_hands.HAND_CONNECTIONS)

        flipped_frame = cv.flip(frame, 1)  # Flip horizontally for a mirror effect
        cv.imshow("Cam", flipped_frame)
        if cv.waitKey(1) == ord('d'):
            break

cap.release()  # Release the camera
cv.destroyAllWindows()



