import * as ActionTypes from '../ActionTypes';

export const SigningUp = (state = {
        isLoading: false,
        Success: false,
        available: true,
    }, action) => {
    switch(action.type) {
        case ActionTypes.SIGNUP_REQUEST:
            return {...state, isLoading: true, Success: false};

        case ActionTypes.SIGNUP_SUCCESS:
            return {...state, isLoading: false, Success: true};

        case ActionTypes.SIGNUP_FAILURE:
            return {...state, isLoading: false, Success:false};
        case ActionTypes.EMAIL_STATUS_UPDATE:
                return {...state, available: action.available};
        default:
            return state;
    }
}