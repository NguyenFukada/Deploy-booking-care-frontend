import React, { Component } from 'react';
import { connect } from "react-redux";
import { Redirect, Route, Switch } from 'react-router-dom';
import './ManageSchedule.scss'
import Select from 'react-select';
import { FormattedMessage } from 'react-intl';
import * as actions from "../../../store/actions";
import { CRUD_ACTIONS, LANGUAGES, dateFormat } from '../../../utils'
import DatePicker from '../../../components/Input/DatePicker';
import { toast } from 'react-toastify';
import moment from 'moment';
import _, { times } from 'lodash';
import { saveBulkSchedule } from '../../../services/userService';
class ManageSchedule extends Component {
    constructor(props) {
        super(props);

        this.state = {
            listDoctors: [],
            selectedDoctorPosition: {},
            currenDate: '',
            rangeTime: []
        }
    }
    componentDidMount() {
        this.props.fetchAllDoctors();
        this.props.fetchAllScheduleTime();
    }
    buildDataInputSelect = (inputData) => {
        let result = [];
        let { language } = this.props;
        if (inputData && inputData.length > 0) {
            inputData.map((item, index) => {
                let object = {};
                let labelVi = `${item.lastName} ${item.firstName}`;
                let labelEn = `${item.firstName} ${item.lastName}`
                object.label = language === LANGUAGES.VI ? labelVi : labelEn;
                object.value = item.id;
                result.push(object);
            })
        }
        return result;
    }
    componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevProps.allDoctors != this.props.allDoctors) {
            let dataSelect = this.buildDataInputSelect(this.props.allDoctors);
            this.setState({
                listDoctors: dataSelect
            })
        }
        if (prevProps.language !== this.props.language) {
            let dataSelect = this.buildDataInputSelect(this.props.allDoctors);
            //console.log('check language: ', dataSelect);
            this.setState({
                listDoctors: dataSelect
            })
        }
        if (prevProps.allScheduleTime !== this.props.allScheduleTime) {
            let data = this.props.allScheduleTime;
            if (data && data.length > 0) {
                data = data.map(item => ({ ...item, isSelected: false }))
            }
            this.setState({
                rangeTime: data
            })
        }
    }
    handleChangeSelect = async (selectedDoctor) => {
        this.setState({ selectedDoctorPosition: selectedDoctor });

    };
    handleOnChangeDatePicker = async (date) => {
        this.setState({
            currenDate: date[0]
        })
    }
    handleClickBtnTime = (time) => {
        let {rangeTime} = this.state;
        if(rangeTime && rangeTime.length > 0){
            rangeTime = rangeTime.map(item => {
                if(item.id === time.id)
                  {
                    item.isSelected = !item.isSelected;
                  }
                  return item;
            })
        
            this.setState({
                rangeTime: rangeTime
            })
        }
    }
    handleSaveSchedule = async () => {
        let { rangeTime, selectedDoctorPosition, currenDate} = this.state;
        let result = [];

        if (!currenDate){
            toast.error("Invalid date!");
            return;
        }
        if (selectedDoctorPosition && _.isEmpty(selectedDoctorPosition)){
            toast.error("Invalid Selected Doctor");
            return;
        }
        // let formatedDate = moment(currenDate).format(dateFormat.SEND_TO_SERVER);
        let formatedDate = new Date(currenDate).getTime();
        if(rangeTime && rangeTime.length > 0){
            let selectedTime = rangeTime.filter(item => item.isSelected === true);
            if (selectedTime && selectedTime.length > 0){
                selectedTime.map(schedule => {
                    let object = {};
                    object.doctorId = selectedDoctorPosition.value;
                    object.date = formatedDate;
                    object.timeType = schedule.keyMap;
                    result.push(object);
                })
            }
            else{
                toast.error("Invalid selected time!");
                return;
            }
        }
        let res = await saveBulkSchedule({
            arrSchedule: result,
            doctorId: selectedDoctorPosition.value,
            formatedDate: ''+formatedDate
        });
        if(res && res.errCode === 0){
            toast.success("Success infor");
        }else{
            toast.error("error saveBulkScheduleDocotr");
        }
    }
    render() {
        let yesterday = new Date(new Date().setDate(new Date().getDate() - 1));
        let { rangeTime } = this.state;
        let { language } = this.props;
        return (
            <div className='manage-schedule-container'>
                <div className='m-s-title'>
                    <FormattedMessage id="manage-schedule.title" />
                </div>
                <div className='container'>
                    <div className='row'>
                        <div className='col-6 form-group'>
                            <label>
                                <FormattedMessage id="manage-schedule.choose_doctor" />
                            </label>
                            <Select
                                value={this.state.selectedDoctorPosition}
                                onChange={this.handleChangeSelect}
                                options={this.state.listDoctors}

                            />
                        </div>
                        <div className='col-6 form-group'>
                            <label>
                                <FormattedMessage id="manage-schedule.choose-date" />
                            </label>
                            <DatePicker
                                className="form-control"
                                onChange={this.handleOnChangeDatePicker}
                                value={this.state.currenDate[0]}
                                minDate={yesterday}
                            />

                        </div>
                        <div className='col-12 pick-hour-container'>
                            {rangeTime && rangeTime.length > 0 &&
                                rangeTime.map((item, index) => {
                                    return (
                                        <button
                                            className={item.isSelected === true ? "btn btn-schedule active" : "btn btn-schedule"}
                                            key={index}
                                            onClick={() => this.handleClickBtnTime(item)}>
                                            {language === LANGUAGES.VI ? item.valueVI : item.valueEN}
                                        </button>
                                    )
                                })
                            }

                        </div>
                        <div className="col-12">
                            <button className='btn btn-primary btn-save-schedule'
                            onClick={() => this.handleSaveSchedule()}>
                                <FormattedMessage id="manage-schedule.Save_info" />
                            </button>
                        </div>

                    </div>
                </div>
            </div>

        )
    }
}

const mapStateToProps = state => {
    return {
        isLoggedIn: state.user.isLoggedIn,
        allDoctors: state.admin.allDoctors,
        language: state.app.language,
        allScheduleTime: state.admin.allScheduleTime
    };
};

const mapDispatchToProps = dispatch => {
    return {
        fetchAllDoctors: () => dispatch(actions.fetchAllDoctors()),
        fetchAllScheduleTime: () => dispatch(actions.fetchAllScheduleTime()),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ManageSchedule);
