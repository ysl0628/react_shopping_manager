import { createSlice } from "@reduxjs/toolkit";

export const notiSlice = createSlice({
  name: "noti",
  initialState: { isAllRead: false, count: 8 }, // state 初始值,
  reducers: {
    setReadAll(state, action) {
      state.isAllRead = true;
    },
  },
});

export const { setReadAll } = notiSlice.actions;
