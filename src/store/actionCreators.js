import * as actionTypes from './actions';
import axios from '../axios-users';

export function addUser(newUser) {
  return {
    type: actionTypes.ADD_USER,
    payload: newUser
  }
}

export function login(currentUser) {
  return {
    type: actionTypes.LOGIN,
    payload: currentUser
  }
}

export function addProduct(cUser) {
  return {
    type: actionTypes.ADD_PRODUCT,
    payload: cUser
  }
}

export function deleteProduct(cUser) {
  return {
    type: actionTypes.DELETE_PRODUCT,
    payload: cUser
  }
}

export function editProduct(cUser) {
  return {
    type: actionTypes.EDIT_PRODUCT,
    payload: cUser
  }
}

export function getCurrentUser(cUser) {
  return dispatch => {

    dispatch({
      type: actionTypes.GET_CURRENT_USER,
      payload: cUser,
    })

    axios.get('/currentUser.json')
      .then(res => res.data)
      .then((res) => {
        dispatch({
          type: actionTypes.SET_CURRENT_USER,
          payload: res,
        })
      })
  }
}

export function getUsers(users) {
  return dispatch => {

    dispatch({
      type: actionTypes.GET_USERS,
      payload: users,
    })

    axios.get('/users.json')
      .then(res => res.data)
      .then((res) => {
        dispatch({
          type: actionTypes.SET_USERS,
          payload: res,
        })
      })
  }
}

