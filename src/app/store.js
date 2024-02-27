import { configureStore } from '@reduxjs/toolkit';
import staminaReducer from '../features/counter/counterSlice';

export const store = configureStore({
  reducer: {
    stamina: staminaReducer,
  },
});
