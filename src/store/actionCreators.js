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

export function getProducts(products) {
  return {
    type: actionTypes.GET_PRODUCTS,
    payload: products
  }
}

export function setCurrentUser(currentUser) {
  return {
    type: actionTypes.SET_CURRENT_USER,
    payload: currentUser
  }
}

export function onLogout() {
  return {
    type: actionTypes.LOGOUT,
    payload: null
  }
}



