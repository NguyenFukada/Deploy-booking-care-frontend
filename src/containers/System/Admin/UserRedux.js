import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import { getAllCodeService } from "../../../services/userService";
import { LANGUAGES, CRUD_ACTIONS, CommonUtils} from "../../../utils"
import * as actions from "../../../store/actions"
import './UserRedux.scss'
import LightBox from 'react-image-lightbox';
import 'react-image-lightbox/style.css';
import TableManagerUser from './TableManagerUser';
class UserRedux extends Component {

    constructor(props) {
        super(props);
        this.state = {
            genderArr: [],
            positionArr: [],
            roleArr: [],
            previewImgURL: '',
            isOpen: false,

            email: '',
            password: '',
            firstName: '',
            lastName: '',
            phoneNumber: '',
            address: '',
            gender: '',
            position: '',
            role: '',
            avatar: '',

            action: '',
            userEditId: ''
        }
    }
    state = {
    }

    async componentDidMount() {
        this.props.getGenderStart();
        this.props.getPositionStart();
        this.props.getRoleStart();
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevProps.genderRedux !== this.props.genderRedux) {
            let arrGenders = this.props.genderRedux;
            this.setState({
                genderArr: arrGenders,
                gender: arrGenders && arrGenders.length > 0 ? arrGenders[0].keyMap : ''
            })
        }
        if (prevProps.roleRedux !== this.props.roleRedux) {
            let arrRoles = this.props.roleRedux;
            this.setState({
                roleArr: arrRoles,
                role: arrRoles && arrRoles.length > 0 ? arrRoles[0].keyMap : ''
            })

        }
        if (prevProps.positionRedux !== this.props.positionRedux) {
            let arrPosition = this.props.positionRedux;
            this.setState({
                positionArr: arrPosition,
                position: arrPosition && arrPosition.length > 0 ? arrPosition[0].keyMap : ''
            })
        }
        if (prevProps.listUsers !== this.props.listUsers) {
            let arrRoles = this.props.roleRedux;
            let arrGenders = this.props.genderRedux;
            let arrPosition = this.props.positionRedux;
            this.setState({
                email: '',
                password: '',
                firstName: '',
                lastName: '',
                phoneNumber: '',
                address: '',
                gender: arrGenders && arrGenders.length > 0 ? arrGenders[0].keyMap : '',
                role: arrRoles && arrRoles.length > 0 ? arrRoles[0].keyMap : '',
                position: arrPosition && arrPosition.length > 0 ? arrPosition[0].keyMap : '',
                avatar: '',
                action: CRUD_ACTIONS.CREATE,
                previewImgURL: ''
            })
        }
    }

    handleOnChangeImage = async (Event) => {
        let data = Event.target.files;
        let file = data[0];
        if (file) {
            let base64 = await CommonUtils.getBase64(file);
            let objectURL = URL.createObjectURL(file);
            this.setState({
                previewImgURL: objectURL,
                avatar: base64
            })
        }

    }

    openPreviewImg = () => {
        if (!this.state.previewImgURL) return;
        this.setState({
            isOpen: true
        })
    }

    handleSaveUser = () => {
        let isValid = this.checkValidateInput();
        if (isValid === false) return;

        let {action} = this.state; // let action = this.state.action
        if (action === CRUD_ACTIONS.CREATE)
        {
            // fire redux createUser
            this.props.createNewUser({
                email: this.state.email,
                password: this.state.password,
                firstName: this.state.firstName,
                lastName: this.state.lastName,
                address: this.state.address,
                gender: this.state.gender,
                roleId: this.state.role,
                phoneNumber: this.state.phoneNumber,
                positionId: this.state.position,
                avatar: this.state.avatar
            })
        }
        if (action === CRUD_ACTIONS.EDIT)
        {
            //fire redux edit user
            this.props.editAUserRedux({
                id : this.state.userEditId,
                email: this.state.email,
                password: this.state.password,
                firstName: this.state.firstName,
                lastName: this.state.lastName,
                address: this.state.address,
                gender: this.state.gender,
                roleId: this.state.role,
                phoneNumber: this.state.phoneNumber,
                positionId: this.state.position,
                avatar: this.state.avatar
            })
        }
    }
    checkValidateInput = () => {
        let isValid = true;
        let arrCheck = ['email', 'password', 'firstName', 'lastName', 'phoneNumber',
            'address']
        for (let i = 0; i < arrCheck.length; i++) {
            if (!this.state[arrCheck[i]]) {
                isValid = false;
                alert('Missing parameter: ' + arrCheck[i]);
                break;
            }
        }

        return isValid
    }
    onChangeInput = (Event, id) => {
        let copyState = { ...this.state };
        copyState[id] = Event.target.value;
        this.setState({
            ...copyState
        })
    }

    handleEditUserFromParent = (user)=>{
        let imageBase64 = '';
        if (user.image)
        {
            imageBase64 = new Buffer(user.image,'base64').toString('binary');
        }
        
        //console.log('check handleedit from parent: ',user);
        this.setState({
            email: user.email,
            password: 'HARDCODE',
            firstName: user.firstName,
            lastName: user.lastName,
            phoneNumber: user.phoneNumber ,
            address: user.address,
            gender: user.gender,
            role: user.roleId,
            position: user.positionId,
            avatar: '',
            previewImgURL: imageBase64,
            action: CRUD_ACTIONS.EDIT,
            userEditId: user.id
        })
    }
    render() {
        let genders = this.state.genderArr;
        let language = this.props.language;
        let roles = this.state.roleArr;
        let positions = this.state.positionArr;
        let isGetGenders = this.props.isLoadingGender;
        // console.log('hoidanit check props from redux: ', this.props.genderRedux);
        // console.log('roles check props from redux: ', this.props.roleRedux);

        let { email, password, firstName, lastName, phoneNumber,
            address, gender, position, role, avatar } = this.state;


        return (
            <div className='user-redux-container'>
                <div className="title" >User Redux ERIC</div>

                <div className='user-redux-body'>
                    <div className='container'>
                        <div className='row'>
                            <div className='col-12 my-3'><FormattedMessage id="manage-user.Add" /></div>
                            <div className='col-12'>{isGetGenders === true ? 'Loaing genders' : ''}</div>
                            <div className='col-3'>
                                <label><FormattedMessage id="manage-user.Email" /></label>
                                <input className="form-control" type='email'
                                    value={email}
                                    disabled={this.state.action === CRUD_ACTIONS.EDIT ? true:false}
                                    onChange={(Event) => { this.onChangeInput(Event, 'email') }}></input>
                            </div>
                            <div className='col-3'>
                                <label><FormattedMessage id="manage-user.Password" /></label>
                                <input className="form-control" type='password'
                                    value={password}
                                    disabled={this.state.action===CRUD_ACTIONS.EDIT?true:false}
                                    onChange={(Event) => { this.onChangeInput(Event, 'password') }}></input>
                            </div>
                            <div className='col-3'>
                                <label><FormattedMessage id="manage-user.Firstname" /></label>
                                <input className="form-control" type='text'
                                    value={firstName}
                                    onChange={(Event) => { this.onChangeInput(Event, 'firstName') }}></input>
                            </div>
                            <div className='col-3'>
                                <label><FormattedMessage id="manage-user.Lastname" /></label>
                                <input className="form-control" type='text'
                                    value={lastName}
                                    onChange={(Event) => { this.onChangeInput(Event, 'lastName') }}></input>
                            </div>
                            <div className='col-3'>
                                <label><FormattedMessage id="manage-user.Address" /></label>
                                <input className="form-control" type='text'
                                    value={address}
                                    onChange={(Event) => { this.onChangeInput(Event, 'address') }}></input>
                            </div>
                            <div className='col-9'>
                                <label><FormattedMessage id="manage-user.Phone-number" /></label>
                                <input className="form-control" type='text'
                                    value={phoneNumber}
                                    onChange={(Event) => { this.onChangeInput(Event, 'phoneNumber') }}></input>
                            </div>
                            <div className='col-3'>
                                <label><FormattedMessage id="manage-user.Gender" /></label>
                                <select id="inputState" className="form-control"
                                    value={gender}
                                    onChange={(Event) => { this.onChangeInput(Event, 'gender') }}
                                >
                                    {genders && genders.length > 0 &&
                                        genders.map((item, index) => {
                                            return (
                                                <option key={index} value={item.keyMap}>
                                                    {language === LANGUAGES.VI ? item.valueVI : item.valueEN}</option>
                                            )
                                        })}


                                </select>
                            </div>
                            <div className='col-3'>
                                <label><FormattedMessage id="manage-user.RoleID" /></label>
                                <select id="inputState" className="form-control"
                                    value={role}
                                    onChange={(Event) => { this.onChangeInput(Event, 'role') }}>
                                    {roles && roles.length > 0 && roles.map((item, index) => {
                                        return (
                                            <option key={index} value={item.keyMap}>
                                                {language === LANGUAGES.VI ? item.valueVI : item.valueEN}</option>
                                        );
                                    })}

                                </select>
                            </div>
                            <div className='col-3'>
                                <label><FormattedMessage id="manage-user.Position" /></label>
                                <select id="inputState" className="form-control"
                                    value={position}
                                    onChange={(Event) => { this.onChangeInput(Event, 'position') }}>
                                    {positions && positions.length > 0 && positions.map((item, index) => {
                                        return (
                                            <option key={index} value={item.keyMap}>
                                                {language === LANGUAGES.VI ? item.valueVI : item.valueEN}</option>
                                        );
                                    })}
                                </select>
                            </div>
                            <div className='col-3'>
                                <label><FormattedMessage id="manage-user.Image" /></label>
                                <div className='preview-img-container'>
                                    <input id="previewImg" type='file' hidden
                                        onChange={(Event) => this.handleOnChangeImage(Event)}></input>
                                    <label className='label-upload' htmlFor='previewImg'>Tải ảnh
                                        <i className='fas fa-upload'></i></label>
                                    <div className='preview-image'
                                        style={{ backgroundImage: `url(${this.state.previewImgURL})` }}
                                        onClick={() => this.openPreviewImg()}></div>
                                </div>
                            </div>
                            <div className='col-12 my-3'>
                                <button className={this.state.action === CRUD_ACTIONS.EDIT ? 'btn btn-warning' : 'btn btn-primary'}
                                    onClick={() => { this.handleSaveUser() }}
                                >
                                    {this.state.action === CRUD_ACTIONS.EDIT ?
                                        <FormattedMessage id="manage-user.Edit"/>
                                        :
                                        <FormattedMessage id="manage-user.Save"/>
                                    }
                                </button>
                            </div>
                            <div className='col-12 mb-5'>
                                <TableManagerUser
                                    handleEditUserFromParentKey={this.handleEditUserFromParent}
                                    action={this.state.action}
                                />
                            </div>
                        </div>
                    </div>
                </div>

                {this.state.isOpen === true &&
                    <LightBox
                        mainSrc={this.state.previewImgURL}
                        onCloseRequest={() => this.setState({ isOpen: false })}
                    />}
            </div>

        )
    }

}

const mapStateToProps = state => {
    return {
        language: state.app.language,
        genderRedux: state.admin.genders,
        isLoadingGender: state.admin.isLoadingGender,
        roleRedux: state.admin.roles,
        positionRedux: state.admin.position,
        listUsers: state.admin.users

    };
};

const mapDispatchToProps = dispatch => {
    return {
        // processLogout: () => dispatch(actions.processLogout()),
        // changeLanguageAppRedux: (language) => dispatch(actions.changeLanguageApp(language))
        getGenderStart: () => dispatch(actions.fetchGenderStart()),
        getPositionStart: () => dispatch(actions.fetchPositionStart()),
        getRoleStart: () => dispatch(actions.fetchRoleStart()),
        createNewUser: (data) => dispatch(actions.createNewUser(data)),
        fetchUserRedux: () => dispatch(actions.fetchAllUserStart()),
        editAUserRedux: (data) => dispatch(actions.editAUser(data))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(UserRedux);
