import * as actionTypes from '../store/actions';
import axios from '../axios-users';

const initialState = {
    users: [
        {
            firstName: 'Andrey',
            lastName: 'Yanisevich',
            login: 'login',
            email: 'email',
            pass: 'pass',
            dateOfCreation: '18.01.2019'
        },
        {
            firstName: 'Andrey1',
            lastName: 'Yanisevich1',
            login: 'login1',
            email: 'email1',
            pass: 'pass1',
            dateOfCreation: '20.02.2019'
        }
    ],
    currentUser: {
        firstName: 'Andrey',
        lastName: 'Yanisevich',
        login: 'login',
        email: 'email',
        pass: 'pass',
        dateOfCreation: '18.01.2019'
    }
};

export function userReducer (state = initialState, action) {
    switch (action.type) {
        case actionTypes.ADD_USER:
            return {
                ...state,
                users: action.payload
            }
        case actionTypes.LOGIN:
            return {
                ...state,
                currentUser: action.payload
            }
        case actionTypes.LOGOUT:
            return {
                ...state,
                currentUser: action.payload
            }
        case actionTypes.GET_USERS:
            return {
                ...state,
                currentUser: action.payload
            }
        case actionTypes.SET_CURRENT_USER:
            return {
                ...state,
                currentUser: action.payload
            }
        default: return state
    }
}