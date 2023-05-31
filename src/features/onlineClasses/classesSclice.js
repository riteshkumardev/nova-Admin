import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  current: [],
};

const classSlice = createSlice({
  initialState,
  name: "classes",
  reducers: {
    myClassesLoaded: (classes, action) => {
      classes.current = action.payload;
    },
  },
});

export const { myClassesLoaded } = classSlice.actions;

export default classSlice.reducer;
export const selectCurrentClasses = (store) => store.classes.current;
