import {combineReducers} from 'redux';

import {createSlice} from '@reduxjs/toolkit';

// subject to removal pending when a real reducer is available
const defaultReducer = createSlice({
  name: 'default',
  initialState: {default: ''},
  reducers: {
    getAll: _ => {},
  },
});

const combinedReducers = combineReducers({
  fake: defaultReducer.reducer,
});

export default combinedReducers;
