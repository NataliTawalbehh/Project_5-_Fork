import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addMessage } from '../../redux/reducers/MessagesChat/MessagesChat';
import socket from '../Socket/Socket';

const SocketProvider = ({ children }) => {
  const dispatch = useDispatch();
  const userInfo = useSelector((state) => state.user.userInfo);

  useEffect(() => {
    socket.on('message', (message) => {
      dispatch(addMessage(message));
    });

    return () => {
      socket.off('message');
    };
  }, [dispatch]);

  useEffect(() => {
    if (userInfo) {
      socket.emit('joinRoom', userInfo.username);
    }
  }, [userInfo]);

  return <>{children}</>;
};

export default SocketProvider;