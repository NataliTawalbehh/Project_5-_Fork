import { createSlice } from '@reduxjs/toolkit';

const messagesSlice = createSlice({
  name: 'messages',
  initialState: {
    messages: [],
  },
  reducers: {
    addMessage(state, action) {
      state.messages.push(action.payload);
    },
    updateMessage(state, action) {
      const { id, content } = action.payload;
      const message = state.messages.find(msg => msg.id === id);
      if (message) {
        message.content = content;
      }
    },
    clearMessages(state) {
      state.messages = [];
    }
  },
});

export const { addMessage, updateMessage, clearMessages } = messagesSlice.actions;
export default messagesSlice.reducer;