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

  // const persistedFormReducer = persistReducer(formPersistConfig, formReducer);

  // const rootReducer = combineReducers({
  //   form: persistedFormReducer,
  //   location: locationReducer,
  // });

  // const store = configureStore({
  //   reducer: rootReducer,
  // });

  const rootReducer=combineReducers({
    form: formReducer,
    location: locationReducer,

  })
  const persistedFormReducer=persistReducer(formPersistConfig, rootReducer)
  const store = configureStore({
    reducer: persistedFormReducer,
  });
const persistor = persistStore(store);

export { store, persistor };
