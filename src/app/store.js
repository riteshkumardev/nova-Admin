import { configureStore } from "@reduxjs/toolkit";

import authReduser, { verifyAuth } from "../features/auth/authSlice";
import profileReducer, {
  getProfileData,
} from "../features/Profile/profileSlice";
import homeReducer from "../features/home/homeSlice";
import classesReducer from "../features/onlineClasses/classesSclice";
import codingTasksReducer from "../features/ide/codeTasksSlice";

export const store = configureStore({
  reducer: {
    auth: authReduser,
    profile: profileReducer,
    home: homeReducer,
    classes: classesReducer,
    codingTasks: codingTasksReducer,
  },
});

store.dispatch(verifyAuth());
store.dispatch(getProfileData());
