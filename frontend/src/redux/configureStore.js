import {combineReducers} from 'redux';
import { createForms } from 'react-redux-form';
import { Auth } from './Reducers/auth';
import { Status} from './Reducers/status';
import { User_list } from './Reducers/user_list';
import { Application_list } from './Reducers/application_list';
import { InitialSignUp } from './Forms/InitialSignUp';
import {InitialApply} from './Forms/InitialApply';
import { DESTROY_SESSION } from './ActionTypes';


const appReducer = combineReducers({
    auth: Auth,
    status: Status,            
    ...createForms({
        SignUpInfo: InitialSignUp,
        ApplyInfo: InitialApply,
    }),
    user_list: User_list,
    application_list: Application_list
});

const rootReducer = (state, action) => {
    if (action.type === DESTROY_SESSION) {
      state = undefined;
    }  
    return appReducer(state, action);
};

export default rootReducer;