import React, { Component } from 'react';
import { connect } from 'react-redux';
import { push } from "connected-react-router";
//import * as actions from "../store/actions";
import * as actions from "../../store/actions";
import './Login.scss'
//import { FormattedMessage } from 'react-intl';
//import {userService} from '../../services'
import { handleLoginApi } from '../../services/userService';


class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            username: '',
            password: '',
            isShowPassword: false,
            errMessage: ''
        }
    }

    handleOnChangeUserName = (Event) => {
        this.setState({
            username: Event.target.value
        })
    }

    handleOnChangeUserPassword = (Event) => {
        this.setState({
            password: Event.target.value
        })
    }

    handleLogin = async () => {
       this.setState({
         errMessage: ''
       })

       try{
            let data = await handleLoginApi(this.state.username, this.state.password);
            if (data && data.errCode !== 0)
               this.setState({
                    errMessage: data.message,
               })
            if (data && data.errCode === 0){
                this.props.userLoginSuccess(data.user);
                console.log('Login sucess!')
            }
       }catch(e)
       { 
          if (e.response)
          {
            if(e.response.data)
            {
                this.setState({
                    errMessage: e.response.data.message
                  })
            }
          }
        console.log('hoidanit', e.response)
       }
       
    }

    handleShowHiddenPassword = () => {
        this.setState({
            isShowPassword: !this.state.isShowPassword
        })
    }

    handleKeyDown = (Event) => {
        if (Event.key === 'Enter' || Event.key === 13)
        {
            this.handleLogin();
        }
    }

    render() {
        return (
            <div className='login-background'>
                <div className='="login-container'>
                    <div className='login-content row'>
                        <div className='col-12 text-login'>Login</div>
                        <div className='col-12 form-group login-input'>
                            <label>Username:</label>
                            <input type = 'text' className='form-control' 
                            value={this.state.username}
                            onChange = {(Event) => this.handleOnChangeUserName(Event)}
                            placeholder='Enter your username'/>
                        </div>
                        <div className='col-12 form-group login-input'>
                            <label>Password:</label>
                            <div className='custom-input-password'>
                            <input type = {this.state.isShowPassword ? 'text':'password'} 
                            className='form-control'
                            value={this.state.password}
                            onChange={(Event) => {this.handleOnChangeUserPassword(Event)}}
                            onKeyDown={(Event)=>this.handleKeyDown(Event)}
                            placeholder='Enter your password' />
                            <span
                                onClick= {() => {this.handleShowHiddenPassword() }}
                                ><i className={this.state.isShowPassword ? "far fa-eye":"far fa-eye-slash"}></i>
                            </span>
                            </div>
                        </div>
                        <div className='col-12' style={{color: 'red'}}>
                            {this.state.errMessage}
                        </div>
                        <div className='col-12'>
                        <button className='btn-login' onClick={() => {this.handleLogin()}}>
                            Login
                        </button>
                        </div>
                        
                        <div className='col-12'>
                            <span className='forgot-password'>Forgot your password</span>
                        </div>
                        <div className='col-12 text-center mt-3'>
                            <span className='text-other-login'> Or Login with</span>
                        </div>
                        <div className='col-12 social-login'>
                           <i className='fab fa-google-plus-g google'></i>
                           <i className="fab fa-facebook facebook"></i>

                        </div>
                    </div>

                </div>

            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        language: state.app.language
    };
};

const mapDispatchToProps = dispatch => {
    return {
        navigate: (path) => dispatch(push(path)),
       // userLoginFail: () => dispatch(actions.adminLoginFail()),
        userLoginSuccess: (userInfor) => dispatch(actions.userLoginSuccess(userInfor))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);
