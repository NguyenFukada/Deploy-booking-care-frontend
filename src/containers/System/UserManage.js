import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import './UserManage.scss';
import {getAllUsers,createNewUserService,deleteUserService,editUserService} from '../../services/userService';
import ModalUser from './ModalUser';
import ModalEditUser from './ModalEditUser';
import {emitter} from '../../utils/emitter'
class UserManage extends Component {

    constructor(props) {
        super(props);
        this.state = {
            arrUsers: [],
            isOpenModal: false,
            isOpenEditUser: false,
            userEdit: {}
        }
    }
    async componentDidMount() {
        await this.getAllUserFromReact();

    }

    handleAddNewUser = () => {
        this.setState({
            isOpenModal: true
        })
    }

    toggleUserModal = () => {
        this.setState({
            isOpenModal: !this.state.isOpenModal,

        })
    }
    toggleUserEditModal = () => {
        this.setState({
            isOpenEditUser: !this.state.isOpenEditUser,

        })
    }
    getAllUserFromReact = async() => {
        let response = await getAllUsers('ALL');
        if(response && response.errCode === 0)
        {
            this.setState({
                arrUsers: response.users
        })
        } 
        //console.log('get user from nodejs: ',response);
    }
    createNewUser = async (data) =>{
        try{
            let response = await createNewUserService(data);
            if(response && response.errCode !== 0)
            {
                alert(response.message);
            }else{
                await this.getAllUserFromReact();
                this.setState({
                    isOpenModal :false
                })
                emitter.emit('EVENT_CLEAR_MODAL_DATA')
            }
        }catch(e)
        {
            console.log(e);
        }
    }

    handleDeleteUser = async (user) => {
        console.log('click delete',user);
        try{
            let res = await deleteUserService(user.id);
            if(res && res.errCode === 0)
            {
                await this.getAllUserFromReact();
            }else{
                alert(res.message)
            }

        }catch(e)
        {
            console.log(e);
        }
    }

    handEditUser = (user) => {
        console.log('edit:',user);
        this.setState({
            isOpenEditUser: true,
            userEdit: user
        })
    }

    doEditUser = async (user) => {
        
        try{
            let res = await editUserService(user);
            if(res && res.errCode === 0)
            {
                this.setState({
                    isOpenEditUser: false
                })
                await this.getAllUserFromReact()
            }
            else{
                alert(res.errCode)
            }
        }catch(e)
        {
            console.log(e);
        }
    }

    render() {
        let arrUsers = this.state.arrUsers;
        return (
            <div className="users-container">
                <ModalUser
                  isOpen ={this.state.isOpenModal}
                  toogleFromParent={this.toggleUserModal}
                  createNewUser = {this.createNewUser}
                
                />
                {
                    this .state.isOpenEditUser && 
                    <ModalEditUser
                    isOpen = {this.state.isOpenEditUser}
                    toogleFromParent={this.toggleUserEditModal}
                    currentUser = {this.state.userEdit}
                    editUser = {this.doEditUser}
                    />
                }
                

                <div className='title text-center'>Manage users with Eric</div>
                <div className='mx-1'>
                    <button className='btn btn-primary px-3'
                    onClick={() => this.handleAddNewUser()}
                    >
                    <i className="fas fa-plus "></i>
                        Add a new user</button>
                </div>
                <div className='user-table mt-3 mx-1'>
           
             <table id="customers">
             <tbody>
  <tr>
    <th>Email</th>
    <th>Firstname</th>
    <th>Lastname</th>
    <th>Address</th>
    <th>Actions</th>
  </tr>
 
            { arrUsers && arrUsers.map((item, index) => {
                return (
                    <tr>
                        <td>{item.email}</td>
                        <td>{item.firstName}</td>
                        <td>{item.lastName}</td>
                        <td>{item.address}</td>
                        <td>
                            <button className='btn-edit' onClick={()=>this.handEditUser(item)}><i className="fas fa-pencil-alt"></i></button>
                            <button className='btn-delete' onClick={()=> this.handleDeleteUser(item)}><i className="fas fa-trash"></i></button>
                        </td>
                    </tr>
                )
            })

            }
 </tbody>
</table>

                </div>
            </div>
        );
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

export default connect(mapStateToProps, mapDispatchToProps)(UserManage);
