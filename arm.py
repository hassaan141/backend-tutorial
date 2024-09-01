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


#################################################################################################################
# One servo garunteed moving

import cv2 as cv
import numpy as np
import mediapipe as mp
import pyfirmata2
import time

# Set up the Arduino board and servo
board = pyfirmata2.Arduino("COM6")
servo0 = board.get_pin("d:11:p")
servo1 = board.get_pin("d:10:p")
servo2 = board.get_pin("d:3:p")
servo3 = board.get_pin("d:5:p")
servo4 = board.get_pin("d:9:p")

# Set up the camera and MediaPipe Hands
cap = cv.VideoCapture(0)
mp_hands = mp.solutions.hands
hand = mp_hands.Hands(max_num_hands=1)
mp_drawing = mp.solutions.drawing_utils

# Low-pass filter initialization
servo_position0 = 0.0
servo_position1 = 0.0
servo_position2 = 0.0
servo_position3 = 0.0
servo_position4 = 0.0
alpha = 0.1  # Smoothing factor (adjust as needed)

while True:
    start_time = time.time()  # Time at the start of the loop
    isTrue, frame = cap.read()

    if isTrue:
        # Convert the image from BGR to RGB
        RGB_frame = cv.cvtColor(frame, cv.COLOR_BGR2RGB)
        result = hand.process(RGB_frame)

        if result.multi_hand_landmarks:
            for hand_landmarks in result.multi_hand_landmarks:
                # Extract landmarks for the index finger
                thumb_tip = hand_landmarks.landmark[mp_hands.HandLandmark.THUMB_TIP]
                thumb_mcp = hand_landmarks.landmark[mp_hands.HandLandmark.THUMB_MCP]
                index_tip = hand_landmarks.landmark[mp_hands.HandLandmark.INDEX_FINGER_TIP]
                index_mcp = hand_landmarks.landmark[mp_hands.HandLandmark.INDEX_FINGER_MCP]
                middle_tip = hand_landmarks.landmark[mp_hands.HandLandmark.MIDDLE_FINGER_TIP]
                middle_mcp = hand_landmarks.landmark[mp_hands.HandLandmark.MIDDLE_FINGER_MCP]
                ring_tip = hand_landmarks.landmark[mp_hands.HandLandmark.RING_FINGER_TIP]
                ring_mcp = hand_landmarks.landmark[mp_hands.HandLandmark.RING_FINGER_MCP]
                pinky_tip = hand_landmarks.landmark[mp_hands.HandLandmark.PINKY_TIP]
                pinky_mcp = hand_landmarks.landmark[mp_hands.HandLandmark.PINKY_MCP]
                print(f'Thumb tip is {thumb_tip} and thumb mcp is {thumb_mcp}')


                # Control servo0 with the index finger
                if thumb_tip.y < thumb_mcp.y:
                    target_position0 = 0.0  # Move servo to its original position
                    print(True)
                else:
                    target_position0 = 1.0  # Move servo to a different position

                # Apply low-pass filter to smooth the transition
                servo_position0 = alpha * target_position0 + (1 - alpha) * servo_position0
                servo0.write(servo_position0)

                # Control servo1 with the index finger
                if index_tip.y < index_mcp.y:
                    target_position1 = 0.0  # Move servo to its original position
                else:
                    target_position1 = 1.0  # Move servo to a different position

                # Apply low-pass filter to smooth the transition
                servo_position1 = alpha * target_position1 + (1 - alpha) * servo_position1
                servo1.write(servo_position1)

                # Control servo2 with the middle finger
                if middle_tip.y < middle_mcp.y:
                    target_position2 = 0.0  # Move servo to its original position
                else:
                    target_position2 = 1.0  # Move servo to a different position

                # Apply low-pass filter to smooth the transition
                servo_position2 = alpha * target_position2 + (1 - alpha) * servo_position2
                servo2.write(servo_position2)

                # Control servo3 with the middle finger
                if ring_tip.y < ring_mcp.y:
                    target_position3 = 0.0  # Move servo to its original position
                else:
                    target_position3 = 1.0  # Move servo to a different position

                # Apply low-pass filter to smooth the transition
                servo_position3 = alpha * target_position3 + (1 - alpha) * servo_position3
                servo3.write(servo_position3)

                # Control servo3 with the middle finger
                if pinky_tip.y < pinky_mcp.y:
                    target_position4 = 0.0  # Move servo to its original position
                else:
                    target_position4 = 1.0  # Move servo to a different position

                # Apply low-pass filter to smooth the transition
                servo_position4 = alpha * target_position4 + (1 - alpha) * servo_position4
                servo4.write(servo_position4)

                # Draw hand landmarks
                mp_drawing.draw_landmarks(frame, hand_landmarks, mp_hands.HAND_CONNECTIONS)

        # Flip the frame for a mirror effect and show it
        flipped_frame = cv.flip(frame, 1)
        cv.imshow("Cam", flipped_frame)

        # Calculate and print the loop execution time
        loop_time = time.time() - start_time
        # print(f"Loop execution time: {loop_time:.4f} seconds")

        if cv.waitKey(1) == ord('d'):
            break

# Release the camera and close OpenCV windows
cap.release()
cv.destroyAllWindows()





