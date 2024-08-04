import io from 'socket.io-client';

const socket = io('http://localhost:8080', {
  transports: ['websocket'],
  auth: {
    token: localStorage.getItem('token'), // افترض أنك تخزن التوكن في localStorage
    user_id: localStorage.getItem('user_id'), // افترض أنك تخزن user_id في localStorage
  }
});

export const sendMessage = (message) => {
  socket.emit('messages', message);
};

export const subscribeToMessages = (callback) => {
  socket.on('message', callback);
};

export const unsubscribeFromMessages = () => {
  socket.off('message');
};

export default socket;