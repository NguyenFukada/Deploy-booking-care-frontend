import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import {emitter} from '../../utils/emitter'
import _ from 'lodash';

class ModalEditUser extends Component {

    constructor(props){
        super(props);
        this.state = {
            email: '',
            password: '',
            firstName: '',
            lastName: '',
            address: ''
        }
    }
    componentDidMount() {
        let user = this.props.currentUser;
        if (user && !_.isEmpty(user))
        {
            this.setState({
                id: user.id,
                email: user.email,
                password: "adnasndad",
                firstName: user.firstName,
                lastName: user.lastName,
                address: user.address,
            })
        }
    }
    toggle = () => {
        this.props.toogleFromParent();
    }

    handleOnChangeInput = (Event, id)  => {
        //good code
        let copyState = {...this.state};
        copyState[id] = Event.target.value;
        this.setState({
            ...copyState
        })
    }
    checkValideInput = () => {
        let arrInput = ['email','password','firstName','lastName','address'];
        let isValid = true;
        for (let i = 0; i < arrInput.length; i++)
        {
            if(!this.state[arrInput[i]]){
                isValid =false;
                alert('Missing parameter: '+arrInput[i]);
                break;
            }
        }
        return isValid;
    }
    handleSaveUser = () => {
        let isValid = this.checkValideInput();
        if (isValid){
            //call API edit user modal
            this.props.editUser(this.state);
        }
        
    }

    render() {
        return (
            <Modal 
            isOpen = {this.props.isOpen} toggle={()=>{this.toggle()}} className={'model-user-container'}
            size = 'lg'
            centered >
                <ModalHeader toggle={()=>{this.toggle()}}> Edit a user</ModalHeader>
                <ModalBody>
                    <div className='modal-user-body'>
                    <div className='input-container'>
                                <label>Email</label>
                                <input type='text' 
                                onChange={(Event)=>{
                                    this.handleOnChangeInput(Event,"email")
                                }}
                                value={this.state.email}
                                disabled
                                ></input>
                            </div>
                            <div className='input-container'>
                                <label>Password</label>
                                <input type='text' onChange={(Event)=>{
                                    this.handleOnChangeInput(Event,"password")
                                }}
                                value={this.state.password}
                                disabled
                                ></input>
                            </div>
                            <div className='input-container'>
                                <label>firstName</label>
                                <input type='text' onChange={(Event)=>{
                                    this.handleOnChangeInput(Event,"firstName")
                                }}
                                value={this.state.firstName}></input>
                            </div>
                            <div className='input-container'>
                                <label>lastName</label>
                                <input type='text'onChange={(Event)=>{
                                    this.handleOnChangeInput(Event,"lastName")
                                }}
                                value={this.state.lastName}></input>
                            </div>
                            <div className='input-container max-width-input'>
                                <label>Address</label>
                                <input type='text' onChange={(Event)=>{
                                    this.handleOnChangeInput(Event,"address")
                                }}
                                value={this.state.address}></input>
                            </div>
                    </div>
                            
                </ModalBody>
                <ModalFooter>
                    <Button color= "primary" className='px-3' onClick={()=>{this.handleSaveUser()}}>
                        Save Change
                    </Button>
                    <Button color='secondary' className='px-3' onClick={()=>{this.toggle()}}>
                        Cancle
                    </Button>
                </ModalFooter>
            </Modal>
            )
    }

}

const mapStateToProps = state => {
    return {
    };
};

const mapDispatchToProps = dispatch => {
    return {
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ModalEditUser);
