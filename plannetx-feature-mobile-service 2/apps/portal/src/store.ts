import { combineReducers } from 'redux'
// import { createWrapper } from 'next-redux-wrapper'

import themeReducer from './reducers/themeReducer'
import userReducer from './reducers/userReducer'

// const store = createStore(reducers)
// const makeStore = context => store

// export default store
// export const wrapper = createWrapper(makeStore)

import { configureStore } from '@reduxjs/toolkit'

const reducers = combineReducers({
  theme: themeReducer,
  user: userReducer
})

export default configureStore({
  reducer: reducers
})
