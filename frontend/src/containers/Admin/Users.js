/* eslint-disable react-hooks/exhaustive-deps */
import React,{useEffect} from 'react';
import { useSelector,useDispatch} from 'react-redux';
import dp from '../../shared/profile.jpg';
import {getuserlist} from '../../redux/Actions/Admin';
import { Card, CardText, CardTitle, CardSubtitle, CardImgOverlay, CardImg} from 'reactstrap';



function UserView(user){
    return(
            <React.Fragment>     
                <CardImgOverlay className="col-8">
                        <CardTitle className="h5">{user.username}</CardTitle>
                        <CardSubtitle>{user.usertype}</CardSubtitle>
                        <CardText>Other Details</CardText>
                </CardImgOverlay>
                <CardImg className="rounded-circle offset-8 col-4 " src={dp}/>
            </React.Fragment>  
    );
}

function Users(){
    const dispatch =useDispatch();
    const user_list = useSelector(state=>state.user_list);

    useEffect(()=>{
         dispatch(getuserlist());        
    },[])

    if(user_list.length!==0){
        const listview = user_list.map((user)=>{
            return(
                    <Card key={user._id} className="col-11 p-3 col-sm-10 col-md-9 col-lg-7 col-xl-5 my-3 " >  
                     {UserView(user)}
                    </Card>       
            );
        })

        return(
            <div className="container-fluid">
                <h3 className="my-5 border-bottom">
                  ALL USERS
                </h3>
                <div className="row justify-content-around">
                  {listview}
                </div>    
            </div>      
        )
    }
    else
     return(
         <div></div>
     )
}

export default Users;