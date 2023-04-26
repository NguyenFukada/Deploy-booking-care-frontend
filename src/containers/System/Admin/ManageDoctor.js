import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import './ManageDoctor.scss';
import * as actions from "../../../store/actions"
import MarkdownIt from 'markdown-it';
import MdEditor from 'react-markdown-editor-lite';
import { CRUD_ACTIONS, LANGUAGES } from '../../../utils'
// import style manually
import 'react-markdown-editor-lite/lib/index.css';
import Select from 'react-select';
import { getDetailInforDoctor } from "../../../services/userService"
import { compose } from 'redux';

// Initialize a markdown parser
const mdParser = new MarkdownIt(/* Markdown-it options */);
// Finish!

class ManageDoctor extends Component {

    constructor(props) {
        super(props);
        this.state = {
            contentMarkDown: '',
            contentHTML: '',
            selectedDoctor: '',
            description: '',
            listDoctors: [],
            hasOldData: false,

            // save to doctor_info table
            listPrice: [],
            listPayment: [],
            listProvince: [],
            listClinic: [],
            listSpecialty: [],

            selectedPrice: '',
            selectedPayment: '',
            selectedProvince: '',
            selectedClinic: '',
            selectedSpecialty: '',

            nameClinic: '',
            addressClinic: '',
            note: '',
            clinicId : '',
            specialtyId: '',
        }
    }
    componentDidMount() {
        this.props.fetchAllDoctors();
        this.props.getRequiredDoctorInfor();
    }

    buildDataInputSelect = (inputData, type) => {
        let result = [];
        let { language } = this.props;
        if (inputData && inputData.length > 0) {
            if (type === 'USERS') {
                inputData.map((item, index) => {
                    let object = {};
                    let labelVi = `${item.lastName} ${item.firstName}`;
                    let labelEn = `${item.firstName} ${item.lastName}`;
                    object.label = language === LANGUAGES.VI ? labelVi : labelEn;
                    object.value = item.id;
                    result.push(object);
                })
            } else {
                if (type === 'PRICE') {
                    inputData.map((item, index) => {
                        let object = {};
                        let labelVi = `${item.valueVI}`;
                        let labelEn = `${item.valueEN} USD`;
                        object.label = language === LANGUAGES.VI ? labelVi : labelEn;
                        object.value = item.keyMap;
                        result.push(object);
                    })
                }
                if (type === 'PAYMENT' || type === 'PROVINCE') {
                    inputData.map((item, index) => {
                        let object = {};
                        let labelVi = `${item.valueVI}`;
                        let labelEn = `${item.valueEN}`;
                        object.label = language === LANGUAGES.VI ? labelVi : labelEn;
                        object.value = item.keyMap;
                        result.push(object);
                    })
                }
                if (type === 'SPECIALTY') {
                    inputData.map((item, index) => {
                        let object = {};
                        object.label = item.name;
                        object.value = item.id;
                        result.push(object);
                    })
                }
                if (type === 'CLINIC') {
                    inputData.map((item, index) => {
                        let object = {};
                        object.label = item.name;
                        object.value = item.id;
                        result.push(object);
                    })
                }
            }

        }
        return result;
    }
    componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevProps.allDoctors != this.props.allDoctors) {
            let dataSelect = this.buildDataInputSelect(this.props.allDoctors, 'USERS');
            this.setState({
                listDoctors: dataSelect,
            })
        }
        if (prevProps.language !== this.props.language) {
            let dataSelect = this.buildDataInputSelect(this.props.allDoctors, 'USERS');
            let { resPrice, resPayment, resProvince, resClinic } = this.props.allRequiredDoctorInfor;
            let dataPrice = this.buildDataInputSelect(resPrice, 'PRICE');
            let dataPayment = this.buildDataInputSelect(resPayment, 'PAYMENT');
            let dataProvince = this.buildDataInputSelect(resProvince, 'PROVINCE');
            let dataClinic = this.buildDataInputSelect(resClinic,'CLINIC')
            this.setState({
                listDoctors: dataSelect,
                listPrice: dataPrice,
                listPayment: dataPayment,
                listProvince: dataProvince,
                listClinic: dataClinic
            })
        }
        if (prevProps.allRequiredDoctorInfor !== this.props.allRequiredDoctorInfor) {
            let { resPrice, resPayment, resProvince, resSpecialty, resClinic } = this.props.allRequiredDoctorInfor;
            let dataPrice = this.buildDataInputSelect(resPrice, 'PRICE');
            let dataPayment = this.buildDataInputSelect(resPayment, 'PAYMENT');
            let dataProvince = this.buildDataInputSelect(resProvince, 'PROVINCE');
            let dataSpecialty = this.buildDataInputSelect(resSpecialty,'SPECIALTY');
            let dataClinic = this.buildDataInputSelect(resClinic, 'CLINIC')
            this.setState({
                listPrice: dataPrice,
                listPayment: dataPayment,
                listProvince: dataProvince,
                listSpecialty: dataSpecialty,
                listClinic: dataClinic,
            })
        }
    }
    handleEditorChange = ({ html, text }) => {
        this.setState({
            contentMarkDown: text,
            contentHTML: html,
        })
    }
    handleSaveContentMarkDown = () => {
        let { hasOldData } = this.state;

        this.props.saveDetailDoctor({
            contentHTML: this.state.contentHTML,
            contentMarkDown: this.state.contentMarkDown,
            description: this.state.description,
            doctorId: this.state.selectedDoctor.value,
            action: hasOldData === true ? CRUD_ACTIONS.EDIT : CRUD_ACTIONS.CREATE,

            selectedPrice: this.state.selectedPrice.value,
            selectedPayment: this.state.selectedPayment.value,
            selectedProvince: this.state.selectedProvince.value,
            nameClinic: this.state.nameClinic,
            addressClinic: this.state.addressClinic,
            note: this.state.note,
            specialtyId: this.state.selectedSpecialty.value,
            clinicId: this.state.selectedClinic && this.state.selectedClinic.value ? this.state.selectedClinic.value :''

        })
    }
    handleChangeSelect = async (selectedDoctor) => {
        this.setState({ selectedDoctor });
        let { listPayment, listPrice, listProvince, listSpecialty, listClinic } = this.state;

        let res = await getDetailInforDoctor(selectedDoctor.value)
        if (res && res.errCode === 0 && res.data && res.data.MarkDown) {
            let markdown = res.data.MarkDown;
            let addressClinic = '', nameClinic = '', note = '',
                paymentId = '', priceId = '', provinceId = '', selectedPayment='', specialtyId = '',
                selectedProvince = '', selectedPrice = '', selectedSpecialty = '', clinicId = '', selectedClinic = '';
            
            if (res.data.Doctor_Infor){
                addressClinic = res.data.Doctor_Infor.addressClinic;
                nameClinic = res.data.Doctor_Infor.nameClinic;
                note = res.data.Doctor_Infor.note;
                paymentId = res.data.Doctor_Infor.paymentId;
                priceId = res.data.Doctor_Infor.priceId;
                provinceId = res.data.Doctor_Infor.provinceId ;
                specialtyId = res.data.Doctor_Infor.specialtyId;
                clinicId = res.data.Doctor_Infor.clinicId;
                selectedPayment = listPayment.find(item => {
                    return item && item.value === paymentId
                })
                selectedPrice = listPrice.find(item => {
                    return item && item.value === priceId
                })
                selectedProvince = listProvince.find(item => {
                    return item && item.value === provinceId
                })

                selectedSpecialty = listSpecialty.find(item =>{
                    return item && item.value === specialtyId
                })
                selectedClinic = listClinic.find(item => {
                    return item && item.value === clinicId
                })
                
            }
            
            this.setState({
                contentHTML: markdown.contentHTML,
                contentMarkDown: markdown.contentMarkDown,
                description: markdown.description,
                hasOldData: true,
                addressClinic: addressClinic,
                nameClinic: nameClinic,
                note: note,
                selectedPayment: selectedPayment,
                selectedPrice: selectedPrice,
                selectedProvince: selectedProvince,
                selectedSpecialty: selectedSpecialty,
                selectedClinic: selectedClinic

            })
        } else {
            this.setState({
                contentHTML: '',
                contentMarkDown: '',
                description: '',
                hasOldData: false,
                addressClinic: '',
                nameClinic: '',
                note: '',
                selectedPayment: '',
                selectedPrice: '',
                selectedProvince: '',
                selectedSpecialty: '',
                selectedClinic: ''



            })
        }
    };
    handleOnChangeText = (Event, id) => {
        let stateCopy = { ...this.state };
        stateCopy[id] = Event.target.value
        this.setState({
            ...stateCopy
        })
    }
    handeleChangeSelectDoctorInfor = (selectedDoctor, name) => {
        let stateName = name.name;
        let stateCopy = { ...this.state };
        stateCopy[stateName] = selectedDoctor; // gán state gián tiếp
        this.setState({
            ...stateCopy
        })
    }
    render() {
        let { hasOldData } = this.state;
        console.log('hoidan it check state: ',this.state);
        return (
            <div className='manage-doctor-container'>
                <div className='manage-doctor-title'>
                    <FormattedMessage id="admin.manage-doctor.title" />
                </div>
                <div className='more-infor'>
                    <div className='content-left form-group'>
                        <label><FormattedMessage id="admin.manage-doctor.choose_doctor" /></label>
                        <Select
                            value={this.state.selectedDoctor}
                            onChange={this.handleChangeSelect}
                            options={this.state.listDoctors}
                            placeholder={<FormattedMessage id="admin.manage-doctor.choose_doctor" />}
                        />
                    </div>
                    <div className='content-right '>
                        <label><FormattedMessage id="admin.manage-doctor.intro" /></label>
                        <textarea className='form-control'
                            onChange={(Event) => this.handleOnChangeText(Event, 'description')}
                            value={this.state.description}>
                            Dont care
                        </textarea>

                    </div>

                </div>
                <div className='more-info-extra row'>
                    <div className='col-4 form-group'>
                        <label><FormattedMessage id="admin.manage-doctor.price" /></label>
                        <Select
                            value={this.state.selectedPrice}
                            onChange={this.handeleChangeSelectDoctorInfor}
                            options={this.state.listPrice}
                            placeholder={<FormattedMessage id="admin.manage-doctor.price" />}
                            name='selectedPrice'
                        />
                    </div>
                    <div className='col-4 form-group'>
                        <label><FormattedMessage id="admin.manage-doctor.payment" /></label>
                        <Select
                            value={this.state.selectedPayment}
                            onChange={this.handeleChangeSelectDoctorInfor}
                            options={this.state.listPayment}
                            placeholder={<FormattedMessage id="admin.manage-doctor.payment" />}
                            name="selectedPayment"
                        />
                    </div>
                    <div className='col-4 form-group'>
                        <label><FormattedMessage id="admin.manage-doctor.province" /></label>
                        <Select
                            value={this.state.selectedProvince}
                            onChange={this.handeleChangeSelectDoctorInfor}
                            options={this.state.listProvince}
                            placeholder={<FormattedMessage id="admin.manage-doctor.province" />}
                            name="selectedProvince"
                        />
                    </div>

                    <div className='col-4 form-group'>
                        <label><FormattedMessage id="admin.manage-doctor.nameClinic" /></label>
                        <input className='form-control'
                            onChange={(Event) => this.handleOnChangeText(Event, 'nameClinic')}
                            value={this.state.nameClinic}></input>
                    </div>
                    <div className='col-4 form-group'>
                        <label><FormattedMessage id="admin.manage-doctor.addressClinic" /></label>
                        <input className='form-control'
                        onChange={(Event) => this.handleOnChangeText(Event, 'addressClinic')}
                        value={this.state.addressClinic}></input>
                    </div>
                    <div className='col-4 form-group'>
                        <label> <FormattedMessage id="admin.manage-doctor.note" /></label>
                        <input className='form-control'
                            onChange={(Event) => this.handleOnChangeText(Event, 'note')}
                            value={this.state.note}></input>
                    </div>
                </div>
                <div className='row'>
                    <div className='col-4 form-group'>
                        <label><FormattedMessage id="admin.manage-doctor.specialty" /></label>
                        <Select
                            value={this.state.selectedSpecialty}
                            onChange={this.handeleChangeSelectDoctorInfor}
                            name="selectedSpecialty"
                            options={this.state.listSpecialty}
                            placeholder={<FormattedMessage id="admin.manage-doctor.specialty" />}
                        />
                    </div>
                    <div className='col-4 form-group'>
                        <label><FormattedMessage id="admin.manage-doctor.select-clinic" /></label>
                        <Select
                            value={this.state.selectedClinic}
                            onChange={this.handeleChangeSelectDoctorInfor}
                            options={this.state.listClinic}
                            name= "selectedClinic"
                            placeholder={<FormattedMessage id="admin.manage-doctor.select-clinic" />}
                        />
                    </div>
                </div>
                <div className='manage-doctor-editor'>
                    <MdEditor style={{ height: '300px' }}
                        renderHTML={text => mdParser.render(text)}
                        onChange={this.handleEditorChange}
                        value={this.state.contentMarkDown} />
                </div>
                
                <button
                    onClick={() => this.handleSaveContentMarkDown()}
                    className={hasOldData === true ? "save-content-doctor" : "create-content-doctor"}>
                    {hasOldData === true ?
                        <span><FormattedMessage id="admin.manage-doctor.save" /></span> :
                        <span><FormattedMessage id="admin.manage-doctor.add" /></span>}

                </button>
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        allDoctors: state.admin.allDoctors,
        language: state.app.language,
        allRequiredDoctorInfor: state.admin.allRequiredDoctorInfor
    };
};

const mapDispatchToProps = dispatch => {
    return {
        fetchAllDoctors: () => dispatch(actions.fetchAllDoctors()),
        saveDetailDoctor: (data) => dispatch(actions.saveDetailDoctor(data)),
        getRequiredDoctorInfor: () => dispatch(actions.getRequiredDoctorInfor()),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ManageDoctor);
