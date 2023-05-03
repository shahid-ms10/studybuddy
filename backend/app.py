from flask import Flask
from flask import request
from flask import jsonify
from flask_cors import CORS, cross_origin
from flask_restful import Api, Resource
from flask_bcrypt import Bcrypt
from flask_ngrok import run_with_ngrok
from flask_pymongo import PyMongo

from flask_mail import Mail
from flask_mail import Message

import os
import numpy as np
import io
import json
import logging

from utilities import *

app = Flask(__name__)
logging.basicConfig(level=logging.INFO)
app.logger.setLevel('INFO')
CORS(app)
bcrypt = Bcrypt(app)

app.config['MONGO_URI']= "mongodb+srv://admin1:admin123@cluster0.zmuptdr.mongodb.net/studypat?retryWrites=true&w=majority"
mongo = PyMongo(app)

app.config['MAIL_SERVER']='smtp.gmail.com'
app.config['MAIL_PORT'] = 465
app.config['MAIL_USERNAME'] = 'MAIL_USERNAME'
app.config['MAIL_PASSWORD'] = 'MAIL_PASSWORD'
app.config['MAIL_USE_TLS'] = False
app.config['MAIL_USE_SSL'] = True
mail = Mail(app)


# -----------DB Models start--------------------

Users = mongo.db.users
Transcriptions = mongo.db.transcriptions

# -----------DB Models end--------------------


# -----------APIs start--------------------

@app.route('/test',methods=['GET'])
def test():
    try:
        subject = "Greetings from StudyPat!"
        sender = "studypatt@gmail.com"
        recipients = ["shahid.shaikh@spit.ac.in"]

        msg = Message(subject = subject, sender = sender, recipients= recipients)
        msg.body = "Email Function is Working!"

        mail.send(msg)
        return {'message': 'Email sent'}, 200
    except Exception as e: 
        return {'message': 'Email sent'}, 200

@app.route('/register',methods=['POST'])
def registerUser():
    try:
        data = request.get_json()
        obj = Users.find_one({'email': data['email']})
        if obj is None:
            obj = {
                'email': data['email'],
                'password': data['password'],
                'name': data['name'],
                'mobile': data['mobile'],
            }
            Users.insert_one(obj)
            return {
                'email': data['email'],
                'message': 'User Created Successfully'
            }, 200
        return {'message': 'User Alredy Exist'}, 401
    except Exception as e:
        return {'message': 'Server Error' + str(e)}, 500



@app.route('/login',methods=['POST'])
def loginUser():
    try:
        data = request.get_json()
        obj = Users.find_one({'email': data['email']})
        print("User : ",str(obj['_id']))

        if obj is None:
            return {'message': 'User doesn\'t exist.'}
        if obj['password'] == data['password']:
            return {
                'email': obj['email'],
                'user_id': str(obj['_id']),
                'user_name': obj['name'],
                'mobile': obj['mobile']
            }, 200
        return {"message": 'Invalid credentials'}, 401
    except Exception as e:
        return {'message': 'Server Error' + str(e)}, 500

@app.route('/create', methods=['POST'])
def create_notes():
    # Catch the image file from a POST request
    try:
        data = request.get_json()
        print("data: ", data)
        video_url = data["video_url"]
        user_id = str(data["user_id"])
        chapter_name = str(data["chapter_name"])
        subject_name = str(data["subject_name"])

        print(video_url)

        transcription,title = get_transcription(video_url)
        chunks = get_chunks(transcription['text'])
        print(chunks)
        summarries = []

        for para in chunks:
            summary = get_summary(para)[0]
            summarries.append(summary)   
        print(summarries) 
        obj = {'title':str(title),'chunks':chunks,'summary': summarries, 'user_id': user_id, 'chapter_name': chapter_name, 'video_url': video_url,'subject_name':subject_name }
        Transcriptions.insert_one(obj)
        # Return on a JSON format
        # obj = {'title':str(title),'chunks':str(chunks),'summary': str(summarries), 'user_id': user_id, 'chapter_name': chapter_name, 'video_url': video_url }
        # print(obj)
        return {"message": "transcript generated successfully"}, 200
    except Exception as e:
        return {'message': 'Server Error' + str(e)}, 500

@app.route('/gettranscripts', methods=['GET'])
def get_transcripts():
    try:
        data = request.args
        user_id = data['user_id']
        print(user_id)
        obj = Transcriptions.find({'user_id': user_id})
        obj = list(obj)
        print(obj)
        for i in range(len(obj)):
            obj[i]['_id'] = str(obj[i]['_id'])

        return {"transcripts":obj}, 200
    
    except Exception as e:
        return {'message': 'Server Error' + str(e)}, 500


@app.route('/getMergedChunks', methods=['GET'])
def get_merged_chunks():
    try:
        data = request.args
        user_id = data['user_id']
        obj = Transcriptions.find({'user_id': user_id},{"chunks":1})
        obj = list(obj)
        # print(obj)
        for i in range(len(obj)):
            obj[i]['_id'] = str(obj[i]['_id'])
            merged = ""
            for chunk in obj[i]['chunks']:
                merged = merged + chunk

            del obj[i]['chunks']
            obj[i]['merged_chunks'] = merged


        return {"transcripts":obj}, 200
    
    except Exception as e:
        return {'message': 'Server Error' + str(e)}, 500


@app.route('/recommend_videos', methods=['GET'])
def get_recommended_videos():
    try:
        data = request.args
        user_id = data['user_id']
        obj = Transcriptions.find({'user_id': user_id},{"chunks":1})
        obj = list(obj)
        # print(obj)
        merged = []
        print(obj)
        for i in range(len(obj)):
            obj[i]['_id'] = str(obj[i]['_id'])
            temp = ""
            for chunk in obj[i]['chunks']:
                temp = temp + chunk
            merged.append(temp)

        recom = get_recommendations(merged)
        print(recom)
        return {"recommendations":recom}, 200
    
    except Exception as e:
        return {'message': 'Server Error' + str(e)}, 500

@app.route('/savenotes', methods=['POST'])
def save_notes():
    try:
        data = request.get_json()
        print("data: ", data)
        user_id = str(data["user_id"])
        transcript_id = str(data["transcript_id"])
        notes = data["notes"]
        obj = {'user_id': user_id, 'transcript_id': transcript_id, 'notes': notes }

        Transcriptions.insert_one(obj)
        return {"message": "notes saved successfully"}, 200
    except Exception as e:
        return {'message': 'Server Error' + str(e)}, 500
    
@app.route('/users', methods=['GET'])
def get_users():
    obj = Users.find_one({'email': 'user@gmail.com'})

    return obj

import cv2
import time
from playsound import playsound

@app.route('/dnd', methods=['GET'])
def dnd():
    face_cascade = cv2.CascadeClassifier('haarcascade_frontalface_default.xml')
    cap = cv2.VideoCapture(0) # Use 0 for the default camera

    no_face_counter = 0 # Counter to keep track of the number of frames without a face
    alarm_time = int(input("Enter the time in seconds to wait before setting the alarm: "))

    while True:
        ret, frame = cap.read()
        gray = cv2.cvtColor(frame, cv2.COLOR_BGR2GRAY)

        # Detect faces in the current frame
        faces = face_cascade.detectMultiScale(gray, scaleFactor=1.1, minNeighbors=5)

        # Check if any faces were detected
        if len(faces) == 0:
            no_face_counter += 1
            if no_face_counter >= alarm_time * 30: # If no face detected for specified time
                # Set the alarm
                print('No face detected for', alarm_time, 'seconds!')
                playsound('alarm.mp3') # Replace with the path to your alarm sound file
                break
        else:
            no_face_counter = 0 # Reset the counter if a face is detected

        # Draw bounding boxes around the detected faces
        for (x, y, w, h) in faces:
            cv2.rectangle(frame, (x, y), (x+w, y+h), (0, 255, 0), 2)

        # Display the resulting frame
        cv2.imshow('Face detection', frame)

        if cv2.waitKey(1) == ord('q'):
            break

    # Release the capture and close all windows
    cap.release()
    cv2.destroyAllWindows()



# -----------APIs end--------------------


if __name__ == '__main__':
  app.run(debug=True)