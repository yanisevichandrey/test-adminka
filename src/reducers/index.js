import { combineReducers } from 'redux'
import { productReducer } from './products'
import { userReducer } from './users'

export const rootReducer = combineReducers({
  product: productReducer,
  user: userReducer
})