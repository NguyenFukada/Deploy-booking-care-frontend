import React, { Component } from 'react';
import { connect } from "react-redux";
import { FormattedMessage } from 'react-intl';
import './BookingModal.scss'
import { Modal } from 'reactstrap';
import Select from 'react-select';
import DoctorSchedule from '../DoctorSchedule';
import ProfileDoctor from './ProfileDoctor';
import _ from 'lodash'
import { handleLoginApi } from '../../../../services/userService';
import DatePicker from '../../../../components/Input/DatePicker';
import * as actions from '../../../../store/actions'
import { LANGUAGES } from '../../../../utils';
import { postBookAppointment } from '../../../../services/userService'
import { toast } from 'react-toastify';
import moment from 'moment';
import localizaion from "moment/locale/vi";
class BookingModal extends Component {
    constructor(props) {
        super(props);
        this.state = {
            fullName: '',
            phoneNumber: '',
            email: '',
            address: '',
            reason: '',
            selectedGender: '',
            genders: '',
            doctorId: '',
            birthday: '',
            timeType: ''
        }
    }
    async componentDidMount() {
        this.props.getGender()

    }

    buildDataGender = (data) => {
        let result = [];
        let language = this.props.language;
        if (data && data.length > 0) {
            data.map(item => {
                let object = {};
                object.label = language === LANGUAGES.VI ? item.valueVI : item.valueEN;
                object.value = item.keyMap;
                result.push(object);
            })
        }
        return result
    }
    async componentDidUpdate(prevProps, prevState, snapshot) {

        if (this.props.language !== prevProps.language) {
            this.setState({
                genders: this.buildDataGender(this.props.genders)
            })
        }
        if (this.props.genders !== prevProps.genders) {
            this.setState({
                genders: this.buildDataGender(this.props.genders)
            })
        }
        if (this.props.dataScheduleTime !== prevProps.dataScheduleTime ){
            if (this.props.dataScheduleTime && !_.isEmpty(this.props.dataScheduleTime)) {
                let doctorId = this.props.dataScheduleTime.doctorId;
                let timeType = this.props.dataScheduleTime.timeType;
                this.setState({
                    doctorId: doctorId,
                    timeType: timeType
                })
            }
        }

    }
    handleOnChangeInput = (Event, id) => {
        let valueInput = Event.target.value
        let stateCopy = { ...this.state }
        stateCopy[id] = valueInput;
        this.setState({
            ...stateCopy
        })
    }
    handleOnChangeDatePicker = (date) => {
        this.setState({
            birthday: date[0]
        })
    }
    buildTimeBooking = (dataScheduleTime) => {
        let { language } = this.props;
        if (dataScheduleTime && !_.isEmpty(dataScheduleTime)) {
            let time = language === LANGUAGES.VI ? dataScheduleTime.timeTypeData.valueVi : dataScheduleTime.timeTypeData.valueEn;
            let date = language === LANGUAGES.VI ? moment.unix(+dataScheduleTime.date / 1000).format('dddd-DD/MM/YYYY')
                : moment.unix(+dataScheduleTime.date / 1000).locale('en').format('ddd-MM/DD/YYYY');
            return `${time} - ${date}`
        }
        return ''
    }
    buildDoctorName = (dataScheduleTime) => {
        let { language } = this.props;
        if (dataScheduleTime && !_.isEmpty(dataScheduleTime)) {
            let name = language === LANGUAGES.VI ? `${dataScheduleTime.doctorData.lastName} ${dataScheduleTime.doctorData.firstName}`
            :
                `${dataScheduleTime.doctorData.lastName} ${dataScheduleTime.doctorData.firstName}`
            return name;
        }
        return ''
    }
    handleChangeSelect = (selectedOption) => {
        this.setState({
            selectedGender: selectedOption
        })
    }
    hanleConfirmBooking = async () =>{
        // validate input
        let date = new Date(this.state.birthday).getTime();
        let timeString = this.buildTimeBooking(this.props.dataScheduleTime);
        let doctorName = this.buildDoctorName(this.props.dataScheduleTime);
        let res = await postBookAppointment({
            //!data.email || !data.timeType || !data.date || !data.doctorId
            fullName: this.state.fullName,
            phoneNumber: this.state.phoneNumber,
            email: this.state.email,
            address: this.state.address,
            reason: this.state.reason,
            date: this.props.dataScheduleTime.date,
            birthday: date,
            selectedGender: this.state.selectedGender.value,
            doctorId: this.state.doctorId,
            birthday: this.state.birthday,
            timeType: this.state.timeType,
            language : this.props.language,
            timeString: timeString,
            doctorName: doctorName
        })  
        if (res && res.errCode === 0){
            toast.success('Booking appointment success!');
            this.props.closeBookingModal();
        }
        else{
            toast.error('Booking appointment failed')
        }
    }
    render() {
        let { isOpenModal, closeBookingModal, dataScheduleTime } = this.props;
        let doctorId = '';
        if (dataScheduleTime && !_.isEmpty(dataScheduleTime)) {
            doctorId = dataScheduleTime.doctorId
        }
        return (
            <Modal
                isOpen={isOpenModal} className={'booking-modal-container'}
                centered
                size='lg'
            >
                <div className='booking-modal-content'>
                    <div className='booking-modal-header'>
                        <span className='content-left'> <FormattedMessage id="patient.booking modal.title" /></span>
                        <span className='content-right'
                            onClick={closeBookingModal}><i className='fas fa-times'></i></span>

                    </div>
                    <div className='booking-modal-body'>
                        {/* {JSON.stringify(dataScheduleTime)} */}
                        <div className='doctor-infor'>
                            <ProfileDoctor
                                doctorId={doctorId}
                                isShowDescriptionDoctor={false}
                                dataScheduleTime={dataScheduleTime}
                                isShowLinkDetail={false}
                                isShowPrice={true}
                            />
                        </div>

                        <div className='row'>
                            <div className='col-6 form-group'>
                                <label><FormattedMessage id="patient.booking modal.Fullname" /></label>
                                <input className='form-control'
                                    value={this.state.fullName}
                                    onChange={(Event) => this.handleOnChangeInput(Event, 'fullName')}
                                ></input>
                            </div>
                            <div className='col-6 form-group'>
                                <label><FormattedMessage id="patient.booking modal.Gender" /></label>
                                <Select
                                    value={this.state.selectedGender}
                                    onChange={this.handleChangeSelect}
                                    options={this.state.genders}
                                />
                            </div>
                            <div className='col-6 form-group'>
                                <label><FormattedMessage id="patient.booking modal.phoneNumber" /></label>
                                <input className='form-control'
                                    value={this.state.phoneNumber}
                                    onChange={(Event) => this.handleOnChangeInput(Event, 'phoneNumber')}></input>
                            </div>
                            <div className='col-6 form-group'>
                                <label><FormattedMessage id="patient.booking modal.email" /></label>
                                <input className='form-control'
                                    value={this.state.email}
                                    onChange={(Event) => this.handleOnChangeInput(Event, 'email')}></input>
                            </div>
                            <div className='col-12 form-group'>
                                <label><FormattedMessage id="patient.booking modal.address" /></label>
                                <input className='form-control'
                                    value={this.state.address}
                                    onChange={(Event) => this.handleOnChangeInput(Event, 'address')}></input>
                            </div>
                            <div className='col-12 form-group'>
                                <label><FormattedMessage id="patient.booking modal.reason" /></label>
                                <input className='form-control'
                                    value={this.state.reason}
                                    onChange={(Event) => this.handleOnChangeInput(Event, 'reason')}></input>
                            </div>
                            <div className='col-6 form-group'>
                                <label><FormattedMessage id="patient.booking modal.birthday" /></label>
                                <DatePicker
                                    className="form-control"
                                    onChange={this.handleOnChangeDatePicker}
                                    value={this.state.birthday}

                                />
                            </div>
                            <div className='col-6 form-group'>
                                <label>DoctorId</label>
                                <input className='form-control'></input>
                            </div>

                        </div>
                    </div>
                    <div className='booking-modal-footer'>
                        <button className='btn-booking-confirm'
                            onClick={() => this.hanleConfirmBooking()}><FormattedMessage id="patient.booking modal.btn-confirm" /></button>
                        <button className='btn-booking-cancel'
                            onClick={closeBookingModal}>Hủy</button>
                    </div>
                </div>
            </Modal>
        )

    }
}

const mapStateToProps = state => {
    return {
        language: state.app.language,
        genders: state.admin.genders,
    };
};

const mapDispatchToProps = dispatch => {
    return {
        getGender: () => dispatch(actions.fetchGenderStart()),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(BookingModal);
