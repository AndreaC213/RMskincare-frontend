import { combineReducers } from '@reduxjs/toolkit';
import { reducer as appointmentReducer } from 'src/slices/appointment';
import { reducer as shiftReducer } from 'src/slices/shift';
import { reducer as formReducer } from 'redux-form';
import { reducer as notificationReducer } from 'src/slices/notification';

const rootReducer = combineReducers({
  appointment: appointmentReducer,
  shift: shiftReducer,
  form: formReducer,
  notifications: notificationReducer
});

export default rootReducer;
