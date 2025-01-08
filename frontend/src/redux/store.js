import { configureStore } from '@reduxjs/toolkit';
import { combineReducers } from 'redux';
import { persistReducer, persistStore } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import formReducer from './reducers/formReducer';
import locationReducer from './reducers/locationReducer';


  const formPersistConfig = {
    key: 'form',
    storage,
  };

  // const persistedReducer = persistReducer(formPersistConfig, formReducer);

  // const rootReducer = combineReducers({
  //   form: persistedReducer,
  //   location: locationReducer,
  // });

  // const store = configureStore({
  //   reducer: rootReducer,
  // });

  const rootReducer=combineReducers({
    form: formReducer,
    location: locationReducer,

  })
  const persistedReducer=persistReducer(formPersistConfig, rootReducer)
  const store = configureStore({
    reducer: persistedReducer,
  });
const persistor = persistStore(store);

export { store, persistor };
