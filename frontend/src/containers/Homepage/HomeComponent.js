import React from 'react';
import { Card, CardImg, CardText, CardBody, CardTitle, CardSubtitle } from 'reactstrap';

function Home(props){
    return(
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
    );
}

export default Home;