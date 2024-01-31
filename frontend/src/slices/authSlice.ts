import { createSlice } from "@reduxjs/toolkit";

interface IAuthState {
  userInfo: { id: string, name: string, email: string } | null;
}

const initialState: IAuthState = {
  userInfo: localStorage.getItem("userInfo") ? JSON.parse(localStorage.getItem("userInfo")!) : null
}

const authSlice = createSlice({
  name: "auth",
  initialState: initialState,
  reducers: {
    // login
    setCredentials: (state, action) => {
      state.userInfo = action.payload;

      localStorage.setItem("userInfo", JSON.stringify(action.payload));
    },
    // logout
    removeCredentials: (state, action) => {
      state.userInfo = null;
      localStorage.removeItem("userInfo");
    }
  }
});

export const { setCredentials, removeCredentials } = authSlice.actions;
export default authSlice.reducer;