import * as ActionTypes from '../ActionTypes';
import {statusUpdate} from './StatusUpdate';
import axios from "axios";
const baseUrl =process.env.REACT_APP_BASE_URL;

export const user_list_update= (user_list) => {
    return {
        type: ActionTypes.USER_LIST_UPDATE,
        user_list
    }
}
export const application_list_update= (application_list) => {
    return {
        type: ActionTypes.APPLICATION_LIST_UPDATE,
        application_list
    }
}

export const getuserlist = () => (dispatch) => {
    
    const token = localStorage.getItem('token');
    const config = {
        headers: { Authorization: `Bearer ${token}` }
    }
    dispatch(statusUpdate(true,null,''));
    axios.get(baseUrl+"user/list",config )
    .then(response => {
            dispatch(user_list_update(response.data.users));
            dispatch(statusUpdate(false,null,''));
    })
    .catch(error => {
        dispatch(statusUpdate(false,false,"Error "+error.response.status+" : "+error.response.statusText))
    });
};

export const getapplicationlist = () => (dispatch) => {
    
    const token = localStorage.getItem('token');
    const config = {
        headers: { Authorization: `Bearer ${token}` }
    }
    dispatch(statusUpdate(true,null,''));
    axios.get(baseUrl+"admin/application",config )
    .then(response => {
            dispatch(application_list_update(response.data.applications));
            dispatch(statusUpdate(false,null,''));
    })
    .catch(error => {
        dispatch(statusUpdate(false,false,"Error "+error.response.status+" : "+error.response.statusText))
    });
};


function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

export const send_appl_status=(_id,approve)=>(dispatch)=>{
    dispatch(statusUpdate(true,null,''));
    const token = localStorage.getItem('token');
    const config = {
        headers: { Authorization: `Bearer ${token}` }
    }
    axios.post(baseUrl+"admin/application/approval",{_id:_id,approve:approve},config )
    .then(async (response) => {
            dispatch(statusUpdate(true,true,response.data.msg));
            await sleep(2000); //to inform the user
            dispatch(getapplicationlist());                             
    })
    .catch(error => {
        dispatch(statusUpdate(false,false,"Error "+error.response.status+" : "+error.response.statusText))
    });
}