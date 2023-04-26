import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import {emitter} from '../../utils/emitter'
class ModalUser extends Component {

    constructor(props){
        super(props);
        this.state = {
            id: '',
            email: '',
            password: '',
            firstName: '',
            lastName: '',
            address: ''
        }
        this.listenToEmitter();
    }
    listenToEmitter(){
        emitter.on('EVENT_CLEAR_MODAL_DATA', () => {
            this.setState({
                email: '',
                password: '',
                firstName: '',
                lastName: '',
                address: ''
            })
        })
    }
    componentDidMount() {
    }
    toggle = () => {
        this.props.toogleFromParent();
    }

    handleOnChangeInput = (Event, id)  => {
        //bad code
        // this.state[id] = Event.target.value;
        // this.setState({
        //     ...this.state
        // }, ()=> {
        // })

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
    handleAddNewUser = () => {
        let isValid = this.checkValideInput();
        if (isValid){
            //call API create modal
            this.props.createNewUser(this.state);
        }
        
    }

    render() {
        return (
            <Modal 
            isOpen = {this.props.isOpen} toggle={()=>{this.toggle()}} className={'model-user-container'}
            size = 'lg'
            centered >
                <ModalHeader toggle={()=>{this.toggle()}}> Create a new user</ModalHeader>
                <ModalBody>
                    <div className='modal-user-body'>
                    <div className='input-container'>
                                <label>Email</label>
                                <input type='text' 
                                onChange={(Event)=>{
                                    this.handleOnChangeInput(Event,"email")
                                }}
                                value={this.state.email}></input>
                            </div>
                            <div className='input-container'>
                                <label>Password</label>
                                <input type='text' onChange={(Event)=>{
                                    this.handleOnChangeInput(Event,"password")
                                }}
                                value={this.state.password}></input>
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
                    <Button color= "primary" className='px-3' onClick={()=>{this.handleAddNewUser()}}>
                        Add new
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

export default connect(mapStateToProps, mapDispatchToProps)(ModalUser);
