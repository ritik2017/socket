import { io } from 'socket.io-client';

const messageInput = document.getElementById('message-input');
const roomInput = document.getElementById('room-input');
const roomButton = document.getElementById('room-button');
const messageButton = document.getElementById('message-button');
const form = document.getElementById('form');

const socket = io('http://localhost:3000'); // Async Function

socket.on('connect', () => {
    displayMessage(`You are connected to ${socket.id}`);
})

socket.on('receive-message', (message) => {
    displayMessage(message);
})

form.addEventListener('submit', (e) => {
    e.preventDefault();

    const message = messageInput.value;
    const room = roomInput.value;

    if(message === "") return;
    
    displayMessage(message);
    // socket.emit('send-message', message);

    socket.emit('send-message', message, room);

    messageInput.value = "";
})

function displayMessage(message) {

    // Show message in UI

    const messageDiv = document.getElementById('message-container');

    const msDiv = document.createElement('div');
    msDiv.textContent = message;

    messageDiv.append(msDiv);
}

roomButton.addEventListener('click', () => {
    const room = roomInput.value;

    socket.emit('join-room', room);

    roomInput.value = "";

    // Join Room Id using socket
});

