import * as actionTypes from '../store/actions';

const initialState = {
  products: []
}

export function productReducer(state = initialState, action) {
  switch (action.type) {
    case actionTypes.ADD_PRODUCT:
      return {
        ...state,
        products: action.payload
      }
    case actionTypes.DELETE_PRODUCT:
      return {
        ...state,
        products: action.payload
      }
    case actionTypes.EDIT_PRODUCT:
      return {
          ...state,
          products: action.payload
      }
    case actionTypes.GET_PRODUCTS:
      return {
          ...state,
          products: action.payload
      }
  }
  return state
}