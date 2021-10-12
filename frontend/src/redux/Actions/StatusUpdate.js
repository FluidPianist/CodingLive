import * as ActionTypes from '../ActionTypes';
export const statusUpdate= (isLoading,success,msg)=>{
    return{
        type: ActionTypes.STATUS_UPDATE,
        isLoading,
        success,
        msg,
    }
}