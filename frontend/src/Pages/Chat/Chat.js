import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { sendMessage } from '../Socket/Socket';
import axios from 'axios';

const Chat = () => {
  const messages = useSelector((state) => state.messages.messages);
  const [input, setInput] = useState('');
  const userId = useSelector((state) => state.auth.userId);
  const [selectedReceiver, setSelectedReceiver] = useState(null);
  const [drivers, setDrivers] = useState([]);

  useEffect(() => {
    const fetchDrivers = async () => {
      try {
        const response = await axios.get('http://localhost:5000/users/user_driver/drivers');
        setDrivers(response.data.drivers);
        console.log(response);
        console.log(response.data.drivers);
      } catch (error) {
        console.error('Error fetching drivers:', error);
      }
    };

    fetchDrivers();
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (input.trim() && selectedReceiver) {
      sendMessage({
        sender: userId,
        receiver: {
          id: selectedReceiver.user_id,
          roleId: selectedReceiver.role_id,
        },
        message: input
      });
      setInput('');
    }
  };

  const handleReceiverChange = (e) => {
    const selectedId = e.target.value;
    const driver = drivers.find(d => d.user_id === parseInt(selectedId));
    setSelectedReceiver(driver);
  };

  
  return (
    <div>
      <div className="messages">
        {messages.map((msg, index) => (
          <div key={index} className={`message ${msg.sender === userId ? 'sent' : 'received'}`}>
            <p>{msg.message}</p>
          </div>
        ))}
      </div>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
        />
        <select onChange={handleReceiverChange} value={selectedReceiver ? selectedReceiver.user_id : ''}>
          <option value="" disabled>Select a driver</option>
          {drivers.map(driver => (
            <option key={driver.user_id} value={driver.user_id}>
              {driver.first_name} {driver.last_name} - {driver.email}
            </option>
          ))}
        </select>
        <button type="submit">Send</button>
      </form>
    </div>
  );
};

export default Chat;