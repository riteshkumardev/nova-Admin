import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  ui: {
    showSpinner: false,
  },
  requestedUrl: "",
};

const homeSlice = createSlice({
  initialState,
  name: "home",
  reducers: {
    showSpinner: (home) => {
      home.ui.showSpinner = true;
    },
    hideSpinner: (home) => {
      home.ui.showSpinner = false;
    },
    setRequestedUrl: (home, action) => {
      home.requestedUrl = action.payload;
    },
  },
});

export const { showSpinner, hideSpinner, setRequestedUrl } = homeSlice.actions;
export default homeSlice.reducer;
export const selectIsLoading = (store) => store.home.ui.showSpinner;
export const selectRequestedUrl = (store) => store.home.requestedUrl;
