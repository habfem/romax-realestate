import { configureStore, combineReducers } from "@reduxjs/toolkit";
import userReducer from "./userRedux";
import productRedux from "./productRedux";
import timelineRedux from "./timelineRedux";
import estateRedux from "./estateRedux"
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist";
import storage from "redux-persist/lib/storage";
import usersRedux from "./usersRedux";

const persistConfig = {
  key: "root",
  version: 1,
  storage,
  blacklist: ['product']
};

const rootReducer = combineReducers({
  user: userReducer,
  users: usersRedux,
  product: productRedux,
  timeline: timelineRedux,
  estate: estateRedux,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

export let persistor = persistStore(store);