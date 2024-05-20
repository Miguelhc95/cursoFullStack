import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  message: '' 
};

const notificationSlice = createSlice({
  name: 'notification',
  initialState,
  reducers: {
    setNotification: (state, action) => {
      state.message = action.payload;
    },
    clearNotification: (state) => {
        state.message = null;
      }
  }
});

export const { setNotification, clearNotification } = notificationSlice.actions;

export const displayNotification = (message, timeInSeconds) => {
  return dispatch => {
    dispatch(setNotification(message));
    setTimeout(() => {
      dispatch(clearNotification());
    }, timeInSeconds * 1000);
  };
};
export default notificationSlice.reducer;