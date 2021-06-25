import React, { Component } from 'react';
import '../App.css';
import AppNavBar from './AppNavBar';
import { Button, Container } from 'reactstrap';

import { Link } from 'react-router-dom';

class Home extends Component{
render(){
    return(
        <div>
            <AppNavBar />
            <Container fluid>
                <Button color="link" ><Link to="/box"> BOXES!</Link></Button>
            </Container>
        </div>
    )
}
}
export default Home;