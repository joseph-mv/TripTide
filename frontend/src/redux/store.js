import { configureStore } from '@reduxjs/toolkit';
import { combineReducers } from 'redux';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import formReducer from './reducers/formReducer';
import locationReducer from './reducers/locationReducer';



  const formPersistConfig = {
    key: 'form',
    storage,
  };

  const persistedFormReducer = persistReducer(formPersistConfig, formReducer);

  const rootReducer = combineReducers({
    form: persistedFormReducer,
    location: locationReducer,
  });

  const store = configureStore({
    reducer: rootReducer,
  });

const persistor = persistStore(store);

export { store, persistor };
