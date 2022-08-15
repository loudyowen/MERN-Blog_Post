import React from 'react';
import ReactDOM from 'react-dom';
// Provider will make all the state to be access from global
import { Provider} from 'react-redux';
import { createStore, configureStore, applyMiddleware, compose} from 'redux';
import thunk from 'redux-thunk';
import reducers from './reducers'

import App from './App';

//to set redux, we need store
const store = createStore(reducers, compose(applyMiddleware(thunk)));
// const store = configureStore(reducers, compose(applyMiddleware(thunk)))

ReactDOM.render(
    <Provider store={store}>
        <App />
    </Provider>,
    document.getElementById('root')
);