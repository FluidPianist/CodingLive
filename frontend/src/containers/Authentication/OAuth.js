import React from 'react';
import { Button} from 'reactstrap';

function OAuth(){
  

    return(
        
        <div className="container text-center border-top">
            <h4 className="mt-3">Or Join Us With</h4>
            <div className="row justify-content-center m-3">
                <Button href="https://localhost:5443/user/auth/google" className="col-4 col-md-3 mr-3 btn-google">
                   Google 
                </Button>
                <Button href="https://localhost:5443/user/auth/facebook" className="col-4 col-md-3 btn-facebook">
                   Facebook
                </Button>
            </div>
        </div>
    )        
}

export default OAuth;