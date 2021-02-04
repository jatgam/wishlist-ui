import {createStore, applyMiddleware} from 'redux';
import thunk from 'redux-thunk';
import rootReducer from '../reducers';
import {createBrowserHistory} from 'history';
import { routerMiddleware } from 'connected-react-router'
import {composeWithDevTools} from 'redux-devtools-extension/logOnlyInProduction';

export const history = createBrowserHistory();

const composeEnhancer = composeWithDevTools({trace: true, traceLimit: 25});

export default function configureStore() {
    return createStore(rootReducer(history), 
        composeEnhancer(
            applyMiddleware(
                thunk,
                routerMiddleware(history)
            )
        )
    );
}
