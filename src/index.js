import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import Header from './Header/Header';
import Home from './Home/Home';
import NotFoundPage from './NotFoundPage/NotFoundPage';
import Products from './Products/Products';
import SignIn from './SignIn/SignIn';
import SignUp from './SignUp/SignUp';
import UserInfo from './UserInfo/UserInfo';
import * as serviceWorker from './serviceWorker';
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import { rootReducer } from './reducers/index';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';
import { Router, Route, IndexRoute, browserHistory } from 'react-router'


const store = createStore(rootReducer, composeWithDevTools(
    applyMiddleware(thunk)
));

ReactDOM.render(
    <Provider store={store}>
        {/* { <Router >
            <Route path='/' component={App}>
                <Route component={Home} />
                <Route path='sign-in' component={SignIn} />
                <Route path='sign-up' component={SignUp} />
                <Route path='user-info' component={UserInfo} />
                <Route path='products' component={Products} />
            </Route>
            <Route path='*' component={NotFoundPage} />
        </Router>} */}
        <App />
    </Provider>, document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
