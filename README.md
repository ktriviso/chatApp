![](https://ga-dash.s3.amazonaws.com/production/assets/logo-9f88ae6c9c3871690e33280fcf557f33.png)
# Project #4: Custom Chat App using web sockets

#### Table of Contents

- [Overview](#Overview)
- [Technologies](#Technologies)
- [Submission](#Submission)
- [Components](#Components)
- [Issues and Resolutions](#Issues-and-Resolutions)

## Overview

Chat.io is a custom chatroom for the use of General Assembly. This application meets the requirements for the graduation of General Assembly's Full-stack Web Immersive program 2018. Using web sockets with a Node/Express backend and a React front-end, users will experience real-time updates. Users will have access to both public and private chatrooms, backed by a secure login for confidentiality.


## Technologies

This project depends on the following technologies:

- Socket.io
- React
- Node
- Express
- SQL

## Submission

https://github.com/ktriviso/chatApp

Post Chatrooms working:
https://github.com/ktriviso/chat.io


## Components

| Components    | Description                                            |
| ------------- | ------------------------------------------------------ |
| Header        | Displayed on every page with links to other components |
| Log-in Page   | Form for registered user                               |
| Register Page | Form for new users                                     |
| Public Chat   | Single shared chatroom for all users                   |
| Private Chat  | Private chat room for one-on-one connection            |
| Active Users  | Displays active users in the current chatroom          |
| Profile       | Users profile modal display users's chatroom(s)        |

## Issues and Resolutions

ERROR: chatrooms don't seem to be clearing or sending to the appropriate room but they're being stored in the database correctly. The rooms are working (sockets) but showing up still on both channels, I think this has to do with the state not being conditionally rendered properly. See line 23 in activeChat.js
RESOLUTION:

ERROR: Main chatroom doesn't initially load when you sign-in, user must click on the room for the previous contents to show.
RESOLUTION:

ERROR: Main chatroom doesn't initially load when you sign-in, user must click on the room for the previous contents to show.
RESOLUTION:

ERROR: Active users are only present after someone signs up so the users don't get an accurate read on how many active users are in the room. See line 67 in Chat component. It duplicates users so its commented out.
RESOLUTION:
