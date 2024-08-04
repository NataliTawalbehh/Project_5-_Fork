import io from 'socket.io-client';
import { addMessage } from '../../redux/reducers/MessagesChat/MessagesChat';
import store from "../../redux/store";

// Initialize the Socket.IO client
const socket = io('http://localhost:8080/socket.io/?EIO=4&transport=websocket', {
  transports: ['websocket'], 
});

console.log(socket);

// Connect the socket
socket.connect();

// Listen for initial messages from the server
socket.on('all messages', (allMessages) => {
  console.log(allMessages);
  allMessages.forEach(message => {
    store.dispatch(addMessage(message));
  });
});

// Listen for new messages from the server
socket.on('chat message', (message) => {
  store.dispatch(addMessage(message));
});

// Function to send messages to the server
export const sendMessage = (message) => {
  socket.emit('chat message', message);
  console.log(message);
};

export default socket;