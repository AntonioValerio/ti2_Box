import React, { Component } from 'react';
import { Button, ButtonGroup, Container, Table } from 'reactstrap';
import AppNavBar from './AppNavBar.js';
import { Link } from 'react-router-dom';

class BoxList extends Component{
    constructor(props){
        super(props);
        this.state={boxes: []};
        this.remove=this.remove.bind(this);

    }

    async componentDidMount() {
        const response = await fetch('http://localhost:6080/box');
        const body = await response.json();
        this.setState({boxes: body});
        console.log(this.state)
      }
    

    async remove(id){
        await fetch(`http://localhost:6080/box/${id}`,{
            method:'DELETE'            
        }).then(()=>{
            let updatedBoxes = [...this.state.boxes].filter(i=>i.id !== id);
            this.setState({boxes: updatedBoxes});
        });

        window.location.reload();
    }

    render(){
        const {boxes} = this.state;


        const boxList = boxes.map( box =>{
            console.log(box.ID)
            return (
                <tr key={box.ID}>
                <td > {box.ID} </td>
                <td style={{whiteSpace:'nowrap'}}> {box.status} </td>
                <td> {box.description}</td>
                <td> lat: {box.latitude} long: {box.longitude}</td>
                <td> {box.theme}</td>
                <td> 
                    <ButtonGroup>
                    <Button size="sm" color="primary" tag ={(props)=><Link {...props} /> } to= {"/box/"+box.ID}>Edit</Button>
                  <Button size="sm" color="danger" onClick={()=>this.remove(box.ID)} >Delete</Button>
                    </ButtonGroup>
                </td>
            </tr>
            )
        })

        return(
            <div>
                <AppNavBar />
                <Container fluid>
                    <div className="float-right">
                        <Button color ="success" tag={Link} to ="/box/new" >Add Box</Button>
                    </div>
                    <h3>Boxes</h3>
                    <Table className="mt-4">
                        <thead>
                            <tr>
                                <th width="5%">ID</th>
                                <th width="10%">Status</th>
                                <th width="25%">Description</th>
                                <th width="25%">Coordinates</th>
                                <th width="15%">Theme</th>
                                <th width="20%">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {boxList}
                        </tbody>
                    </Table>
                </Container>
            </div>
        );
    }
}

export default BoxList;