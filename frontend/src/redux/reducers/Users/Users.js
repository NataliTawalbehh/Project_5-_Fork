import { createSlice } from "@reduxjs/toolkit";

export const userSlice = createSlice({
  name: "users",
  initialState: {
    users: [],
    drivers:[],
  },

  reducers: {
    setUsers: (state, action) => {
      state.users = action.payload;
    },
    setDrivers: (state, action) => {
      state.drivers = action.payload;
    },
    addUsers: (state, action) => {
      state.users.push(action.payload);
    },
    updateUserById: (state, action) => {
      state.users = state.users.map((user) => {
        if (user.user_id === action.payload.user_id) {
          return action.payload;
        }
        return user;
      });
    },
    deleteUserById: (state, action) => {
      const { user_id } = action.payload;
      state.users = state.users.filter((user) => {
        return user.user_id !== user_id;
      });
    },
  },
});
export const { setDrivers ,setUsers, addUsers, updateUserById, deleteUserById } =
  userSlice.actions;
export default userSlice.reducer;
