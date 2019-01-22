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
    },
    isAdd: false,
    isDelete: false
};

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.ADD_USER:
            const options = {
                hour: 'numeric',
                minute: 'numeric',
                second: 'numeric'
            };
            const dateOfCreation = new Date().toLocaleDateString('ru', options);

            const newUser = {
                id: Date.now(),
                dateOfCreation: dateOfCreation,
                firstName: action.userData.firstName,
                lastName: action.userData.lastName,
                login: action.userData.login,
                email: action.userData.email,
                pass: action.userData.pass,
                products: []
            }

            axios.post('/users.json', newUser)
                .then(res => console.log(res))
                .catch(err => console.log(err));

            return {
                ...state,
                users: state.users.concat(newUser)
            }
        case actionTypes.LOGIN:
            let currentUser = null;
            state.users.map(user => {
                if (user.login === action.userData.login && user.pass === action.userData.pass) {
                    currentUser = user;
                }
            })

            axios.post('/currentUser.json', currentUser)
                .then(res => console.log(res))
                .catch(err => console.log(err));

            return {
                ...state,
                currentUser: currentUser
            }
        case actionTypes.LOGOUT:
        axios.delete('/currentUser.json', currentUser)
                .then(res => console.log(res))
                .catch(err => console.log(err));
            return {
                ...state,
                currentUser: null
            }
        case actionTypes.ADD_PRODUCT:
            const newProduct = {
                id: Date.now(),
                name: action.productData.name,
                price: action.productData.price
            }
            const products = state.currentUser.products;
            const addedProducts = [...products, newProduct];
            const currUser = state.currentUser;
            currUser.products = addedProducts;
            axios.put('/currentUser.json', currUser)
                .then(res => console.log(res))
                .catch(err => console.log(err));
            return {
                ...state,
                currentUser: currUser,
                isAdd: false
            }
        case actionTypes.SHOW_ADDMODAL:
            return {
                ...state,
                isAdd: true
            }
        case actionTypes.HIDE_ADDMODAL:
            return {
                ...state,
                isAdd: false
            }
        case actionTypes.DELETE_PRODUCT:
            let oldProducts = state.currentUser.products;
            let newProducts = [...oldProducts.filter(p => p.id !== action.id)];
            let currUser_d = state.currentUser;
            currUser_d.products = newProducts;
            return {
                ...state,
                currentUser: currUser_d,
                isDelete: false
            }
        case actionTypes.EDIT_PRODUCT:
            const currentProduct = action.index;
            let product = {
                ...state.currentUser.products[currentProduct]
            }
            product.name = action.nameProduct;
            product.price = action.priceProduct;
            const products_e = [...state.currentUser.products];
            products_e[currentProduct] = product;
            let currUser_e = state.currentUser;
            currUser_e.products = products_e;
            return {
                ...state,
                currentUser: currUser_e
            }
        // case actionTypes.SHOW_DELETEMODAL:
        //     return {
        //         ...state,
        //         isDelete: true
        //     }
        // case actionTypes.HIDE_DELETEMODAL:
        //     return {
        //         ...state,
        //         isDelete: false
        //     }
        default: return state
    }
}

export default reducer;