import { createStore, combineReducers, applyMiddleware } from 'redux';
import { createForms } from 'react-redux-form';
import { Auth } from './Reducers/auth';
import { Status} from './Reducers/status';
import thunk from 'redux-thunk';
import logger from 'redux-logger';
import { InitialSignUp } from './Forms/InitialSignUp';

export const ConfigureStore = () => {
    const store = createStore(
        combineReducers({
            auth: Auth,
            status: Status,            
            ...createForms({
                SignUpInfo: InitialSignUp
            })
        }),
        applyMiddleware(thunk, logger)
    );
    return store;
}