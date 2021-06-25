import React, { Component } from 'react';
import {withRouter } from 'react-router-dom';
import { Button, Form, FormGroup, Input, Label,Container } from 'reactstrap';
import AppNavBar from './AppNavBar.js';

class BoxEdit extends Component{
    emptyItem={
        status:"",
        description:"",
        latitude:"",
        longitude:"",
        theme:""
    };

    constructor(props){
        super(props);
        this.state={
            item : this.emptyItem
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    
    }

    async componentDidMount(){
        let yes= this.props.match.params.id;
        if( yes!=='new'){
            console.log(yes);
            const box = await(await fetch(`http://localhost:6080/box/${yes}`)).json();
            this.setState({item:box});
            console.log(box)
        }
    }

    handleChange(evt){
        const target = evt.target;
        const value = target.value;
        const name = target.name;
        let item= {...this.state.item};
        item[name]=value;
        this.setState({item});
    }

    
    async handleSubmit(evt){
        evt.preventDefault();
        const{item}=this.state;
        console.log(item);       
         await fetch('http://localhost:6080/box'+ (item.id ? '/' + item.id :'' ) , {
            method:(item.id) ? 'PUT' : 'POST',
            body :JSON.stringify(item),
        });
        
        this.props.history.push('/box');
        
    }

    render(){
        const{item}=this.state;
        const{title} = <h1>{item.id ? 'Edit Box' : 'Add Box'}</h1>
        return(
            <div>
                <AppNavBar />
                <Container>
                    {title}
                <Form onSubmit={this.handleSubmit}>
                    <FormGroup>
                        <Label for="status"> Status</Label>
                        <Input  type="text" name="status" id="status" value={item.status || ''} 
                                onChange={this.handleChange} autoComplete="status"/>
                    </FormGroup>
                    <FormGroup>
                        <Label for="description"> Description</Label>
                        <Input  type="text" name="description" id="description" value={item.description || ''} 
                                onChange={this.handleChange} autoComplete="description"/>
                    </FormGroup>
                    <FormGroup>
                        <Label for="latitude"> latitude</Label>
                        <Input  type="text" name="latitude" id="latitude" value={item.latitude || ''} 
                                onChange={this.handleChange} autoComplete="latitude"/>
                    </FormGroup>
                    <FormGroup>
                        <Label for="longitude"> longitude</Label>
                        <Input  type="text" name="longitude" id="longitude" value={item.longitude || ''} 
                                onChange={this.handleChange} autoComplete="longitude"/>
                    </FormGroup>
                    <FormGroup>
                        <Label for="theme"> theme</Label>
                        <Input  type="text" name="theme" id="theme" value={item.theme || ''} 
                                onChange={this.handleChange} autoComplete="theme"/>
                    </FormGroup>
                    <FormGroup>
                        <Button color="primary" type="submit">Save</Button>{''}
                        <Button color="secondary" href="/box">Cancel</Button>
                    </FormGroup>
                </Form>
                </Container>
            </div>
        )
    }

}
export default withRouter(BoxEdit);