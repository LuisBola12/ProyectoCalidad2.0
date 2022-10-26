import { onPostLoginFullfilled, onPostLoginRejected, postLogin } from './requests/postLogin';
import { createSlice } from '@reduxjs/toolkit';
import { userReducers } from './reducers/reducers';

const userSlice = createSlice({
  name: 'user',
  initialState: {
    user: null,
    userIsLoggedIn: false,
    errorMessage: '',
  },

  reducers: userReducers,

  extraReducers(builder) {
    builder
      .addCase(postLogin.fulfilled, onPostLoginFullfilled)
      .addCase(postLogin.rejected, onPostLoginRejected);
  }
});

export const { logout, resetErrorMsg } = userSlice.actions;

export default userSlice.reducer;