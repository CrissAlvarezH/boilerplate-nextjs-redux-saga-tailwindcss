import { createStore, applyMiddleware, compose } from 'redux'
import rootReducer from './root.reducer'
import createSagaMiddleware from 'redux-saga'

// Import sagas
import profileSaga from './profile/profile.effects'

const sagaMiddleware = createSagaMiddleware()

const composeEnhancers = typeof window != 'undefined' && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(
    rootReducer,
    composeEnhancers(
        applyMiddleware(
            sagaMiddleware
        )
    )
);

sagaMiddleware.run(profileSaga)

export default store;
