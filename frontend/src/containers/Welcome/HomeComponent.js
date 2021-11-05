import React from 'react';
import { Card, CardImg, CardText, CardBody, CardTitle, CardSubtitle,
         Jumbotron , Button} from 'reactstrap';
import { Link } from 'react-router-dom';
import Footer from './FooterComponent';
function Home(){
    return(
        <div>
            <Jumbotron>
                    <div className="container-fluid">
                        <div className="row">
                            <div className="col-12 col-sm-6 text-center">
                                <span className="h2">Lets Code And Get Hired</span><br/>
                                <Link to ={`/signup`}>
                                    <Button className="mt-3 btn-primary font-weight-bold">Get Started</Button>
                                </Link>
                            </div>
                            <div className="col-12 col-sm-6 text-center">
                                <p>some image</p>
                            </div>
                        </div>
                    </div>
            </Jumbotron>
            <div className="container-fluid mb-4 mt-4">
                <div className="row">
                    <Card className="col-12 mb-4">
                        <CardImg/> SomeImage
                        <CardBody>
                            <CardTitle>About Card 1</CardTitle>
                            <CardSubtitle>Some Subtitle</CardSubtitle>
                            <CardText>Some description</CardText>
                        </CardBody>
                    </Card>
                    <Card className="col-12 mb-4">
                        <CardImg/> SomeImage
                        <CardBody>
                            <CardTitle>About Card 2</CardTitle>
                            <CardSubtitle>Some Subtitle</CardSubtitle>
                            <CardText>Some description</CardText>
                        </CardBody>
                    </Card>
                    <Card className="col-12 mb-4">
                        <CardImg/> SomeImage
                        <CardBody>
                            <CardTitle>About Card 3</CardTitle>
                            <CardSubtitle>Some Subtitle</CardSubtitle>
                            <CardText>Some description</CardText>
                        </CardBody>
                    </Card>
                </div>
            </div>
            <Footer/>
        </div>
    );
}

export default Home;