import { configureStore } from '@reduxjs/toolkit';
import { combineReducers } from 'redux';
import { persistReducer, persistStore } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import formReducer from './reducers/formReducer';
import locationReducer from './reducers/locationReducer';
import userReducer from './reducers/userReducer';

const formPersistConfig = {
  key: 'form',
  storage,
};

const rootReducer = combineReducers({
  form: formReducer,
  location: locationReducer,
  user: userReducer,
});
// @ts-expect-error redux-persist reducer type incompatible with combineReducers
const persistedReducer = persistReducer(formPersistConfig, rootReducer);
const store = configureStore({
  reducer: persistedReducer,
});
const persistor = persistStore(store);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export { store, persistor };
