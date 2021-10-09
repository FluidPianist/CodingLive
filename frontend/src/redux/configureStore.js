import { createStore, combineReducers, applyMiddleware } from 'redux';
import { createForms } from 'react-redux-form';
import { Auth } from './Reducers/auth';
import { SigningUp } from './Reducers/signingup';
import thunk from 'redux-thunk';
import logger from 'redux-logger';
import { InitialSignUp } from './Forms/InitialSignUp';

export const ConfigureStore = () => {
    const store = createStore(
        combineReducers({
            auth: Auth,
            signingup: SigningUp,            
            ...createForms({
                SignUpInfo: InitialSignUp
            })
        }),
        applyMiddleware(thunk, logger)
    );
    return store;
}