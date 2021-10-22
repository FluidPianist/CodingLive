import React from "react";
import { Card, CardImg, CardText, CardBody, CardTitle, Button,
       } from 'reactstrap';
import {Link} from 'react-router-dom';
import CopyRightFooter from "../Utility/CopyRightFooter";
function SignUp(){
  return(
    <React.Fragment>
      <div className="container-fluid page-center">
        <div className="row justify-content-around">
          <Card className="col-7 col-md-4  mb-4">
                  <CardImg/>
                  <CardBody className="text-center">
                      <CardTitle>Candidate</CardTitle>
                      <CardText >Further your placement by applying for jobs and taking coding interview rounds from anywhere in the world with ease</CardText>
                      <Link to={`/signup/candidate`}>
                        <Button>Get Hired</Button>
                      </Link>
                  </CardBody>                               
          </Card>
          <Card className="col-7 col-md-4  mb-4">
                  <CardImg/>
                  <CardBody className="text-center">
                      <CardTitle>Company</CardTitle>
                      <CardText >Ease your hiring Process by conducting Live online interview rounds with full survelliance for Interested Candidiates</CardText>
                      <Link to={`/signup/company`}>
                        <Button>Start Hiring</Button>
                      </Link>
                  </CardBody>                               
          </Card>
        </div>
        <CopyRightFooter/>
      </div>
    </React.Fragment>
  )
}
export default SignUp;