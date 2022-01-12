
#  Microsoft Engage 2021


A video calling web application that lets the users connect to different rooms and allows them to communicate in real time via video calling and chat messaging.

## Technologies Used
#### **JavaScript frameworks used:** Node.js, Express.js
#### **Libraries used:** socket.io, PeerJS
#### **Frontend user interface:** EJS template engine, CSS


## Overview

Users can attach a random room name to the end of the link of the web app. This dynamic room link generation is handled by uuid. The number of users that can join a room is unlimited. Every time a new user joins the room, the other existing users are alerted with a notification.

After granting webcam and microphone permissions, the new user is connected to the room and their video stream is added to the existing video grid.

Options to mute yourself and pause your video stream are added in the controls block. A ‘Leave Meeting’ button is also provided for when the user wishes to disconnect from the call. 

## Setup

Clone the repository:
```bash

git clone https://github.com/geoarchon/msteams.git
cd msteams
```

Install the node modules:

```bash

npm i uuid ejs peerjs express socket.io peer

```
Start running PeerJS on port 443:

```bash

peerjs --port 443

```
Run the code: 
```bash

npm run start

```

The project will start running on port 3030. Open up https://localhost:3030 on your browser.
<br/>


## References

[Clever Programmer](https://www.youtube.com/watch?v=ZVznzY7EjuY&t=5718s)\
[Web Dev Simplified](https://www.youtube.com/watch?v=DvlyzDZDEq4)

