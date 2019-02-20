import * as actionTypes from './actions';
import axios from '../axios-users';

const initialState = {
    users: [
        {
            firstName: 'Andrey',
            lastName: 'Yanisevich',
            login: 'login',
            email: 'email',
            pass: 'pass',
            dateOfCreation: '18.01.2019',
            products: [
                {
                    id: '1',
                    name: 'Product',
                    price: 1000
                },
                {
                    id: '2',
                    name: 'Product 2',
                    price: 2000
                }
            ]
        }
    ],
    currentUser: {
        firstName: 'Andrey',
        lastName: 'Yanisevich',
        login: 'login',
        email: 'email',
        pass: 'pass',
        dateOfCreation: '18.01.2019',
        products: [
            {
                id: '1',
                name: 'Product',
                price: 1000
            },
            {
                id: '2',
                name: 'Product 2',
                price: 2000
            }
        ]
    }
};

const reducer = (state = initialState, action) => {
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
            // axios.delete('/currentUser.json', currentUser)
            //     .then(res => console.log(res))
            //     .catch(err => console.log(err));
            return {
                ...state,
                currentUser: null
            }
        case actionTypes.ADD_PRODUCT:

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
        case actionTypes.DELETE_PRODUCT:
            return {
                ...state,
                currentUser: action.payload
            }
        case actionTypes.EDIT_PRODUCT:
            return {
                ...state,
                currentUser: action.payload
            }
        default: return state
    }
}

export default reducer;