
##  Microsoft Engage 2021

#### Submission by: Shrimanti Pal

### A video calling web application that lets the users connect to different rooms and allows them to communicate in real time via video calling and chat messaging.

##Technologies Used
### **JavaScript frameworks used:** Node.js, Express.js
### **Libraries used:** socket.io, PeerJS
### **Template engine:** EJS

### Brief Overview:

Users can attach a random room name to the end of the link of the web app (for example, msteamsrooms.herokuapp.com/chatroom, wherein "chatroom" is the room name). This dynamic room link generation is handled by uuid. The number of users that can join a room is unlimited. Every time a new user joins the room, the other existing users are alerted with a notification.

After granting webcam and microphone permissions, the new user is connected to the room and their video stream is added to the existing video grid. They can also send chat messages in the Live Chat section.

Options to mute yourself and pause your video stream are added in the controls block. A ‘Leave Meeting’ button is also provided for when the user wishes to disconnect from the call. After leaving the call, the user can also choose to go back and rejoin the call.



