import { combineReducers, configureStore } from '@reduxjs/toolkit';
import userSlice from './Slices/user/userSlice';
import activeProjectSlice from './Slices/projectSlice/activeProjectSlice';
import storageSession from 'redux-persist/lib/storage/session';
import {
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from 'redux-persist';

const reducers = combineReducers( {
  user: userSlice,
  activeProject: activeProjectSlice,
} );

const rootPersistConfig = {
  key: 'root',
  storage: storageSession,
};

const persistedReducer = persistReducer( rootPersistConfig, reducers );


const store = configureStore( {
  reducer: persistedReducer,
  middleware: ( getDefaultMiddleware ) =>
    getDefaultMiddleware( {
      serializableCheck: {
        ignoredActions: [ FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER ],
      },
    } ),
} );

export default store;
