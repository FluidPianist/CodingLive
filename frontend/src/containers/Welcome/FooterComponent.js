import React from 'react';
import {Link} from 'react-router-dom';

function Footer(props) {
    return(
        <div className="footer mt-5 bgc-alt ">
            <div className="container-fluid">
                <div className="row justify-content-around">             
                    <div className="col-4 offset-1 col-sm-2">
                        <h5>Links</h5>
                        <ul className="list-unstyled ">
                            <li><Link className="text-decoration-none " to="/home">Home</Link></li>
                        </ul>
                    </div>
                    <div className="col-7 col-sm-5">
                        <h5>Our Address</h5>
                        <address className="bgc-alt p-2">
                        Sulaiman Hall,<br />
                        Aligarh Muslim University,<br />
                        Aligarh , Uttar Pradesh<br />
                        India,<br/>
                        <i className="fa fa-phone fa-lg"></i> : +91123456789<br />
                        <i className="fa fa-envelope fa-lg "></i> : <a className="text-decoration-none " href="mailto:codingLiveAMU@gmail.com">
                            codingLiveAMU@gmail.com</a>
                        </address>
                    </div>
                    <div className="col-12 col-md-4 align-self-center mt-5">
                        <div className="text-center">
                            <a className="btn btn-social-icon  rounded-circle" href="http://google.com/"><i className="fa fa-google"></i></a>&nbsp;
                            <a className="btn btn-social-icon  rounded-circle" href="http://www.facebook.com/profile.php?id="><i className="fa fa-facebook"></i></a>&nbsp;
                            <a className="btn btn-social-icon  rounded-circle" href="http://www.linkedin.com/in/"><i className="fa fa-linkedin"></i></a>&nbsp;
                            <a className="btn btn-social-icon  rounded-circle" href="http://twitter.com/"><i className="fa fa-twitter"></i></a>&nbsp;
                            <a className="btn btn-social-icon  rounded-circle" href="mailto:"><i className="fa fa-envelope"></i></a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Footer;