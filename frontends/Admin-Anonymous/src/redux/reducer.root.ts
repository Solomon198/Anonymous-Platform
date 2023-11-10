import { combineReducers } from '@reduxjs/toolkit'
import { loginReducer } from '../pages/login'

const combinedReducer = combineReducers({
    login: loginReducer,
})

export default combinedReducer
