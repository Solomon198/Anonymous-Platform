import {combineReducers} from 'redux';
import ThemeReducer from '../theme/reducer';

const combinedReducers = combineReducers({
  theme: ThemeReducer,
});

export default combinedReducers;
