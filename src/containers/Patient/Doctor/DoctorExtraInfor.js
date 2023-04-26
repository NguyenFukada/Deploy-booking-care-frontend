import React, { Component } from 'react';
import { connect } from "react-redux";
import { LANGUAGES } from '../../../utils';
import './DoctorExtraInfor.scss'
import Select from 'react-select';
import { getScheduleByDate } from '../../../services/userService';
import { set } from 'lodash';
import { getExtraInforDoctorById } from '../../../services/userService';
import { FormattedMessage } from 'react-intl';
import NumberFormat from 'react-number-format'
class DoctorExtraInfor extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isShowDetailInfor: false,
            extraInfor: {},
        }
    }
    async componentDidMount() {
        if(this.props.doctorIdFromParent){
            let res = await getExtraInforDoctorById(this.props.doctorIdFromParent);
            if (res && res.errCode === 0) {
                this.setState({
                    extraInfor: res.data
                })
            }
        }
        

    }
    showHiddenDetailDoctorInfor = (status) => {
        this.setState({
            isShowDetailInfor: status
        }
        )
    }

    async componentDidUpdate(prevProps, prevState, snapshot) {
        if (this.props.doctorIdFromParent != prevProps.doctorIdFromParent) {
            let res = await getExtraInforDoctorById(this.props.doctorIdFromParent);
            if (res && res.errCode === 0) {
                this.setState({
                    extraInfor: res.data
                })
            }

        }

    }

    render() {
        let { isShowDetailInfor, extraInfor } = this.state;
        let { language } = this.props;
        return (
            <div className='doctor-extra-infor-container'>
                <div className='content-up'>
                    <div className='text-address'>
                        <FormattedMessage id="patient.extra-infor-doctor.address" />
                    </div>
                    <div className='name-clinic'>{extraInfor && extraInfor.nameClinic ? extraInfor.nameClinic : ''}</div>
                    <div className='detail-address'>
                        {extraInfor && extraInfor.addressClinic ? extraInfor.addressClinic : ''}
                    </div>
                </div>
                <div className='content-down'>
                    {isShowDetailInfor === false &&
                        <div className='short-infor'>
                            <FormattedMessage id="patient.extra-infor-doctor.price" />
                            {extraInfor && extraInfor.priceTypeData && language === LANGUAGES.VI &&
                                <NumberFormat className='currency'
                                    value={extraInfor.priceTypeData.valueVi} displayType={'text'} thousandSeparator={true} suffix={'VND'} />
                            }
                            {extraInfor && extraInfor.priceTypeData && language === LANGUAGES.EN &&
                                <NumberFormat className='currency'
                                    value={extraInfor.priceTypeData.valueEn} displayType={'text'} thousandSeparator={true} suffix={'$'} />
                            }
                            <span
                                onClick={() => this.showHiddenDetailDoctorInfor(true)}>
                                <FormattedMessage id="patient.extra-infor-doctor.Detail Information" />
                            </span>
                        </div>
                    }
                    {isShowDetailInfor === true &&
                        <>
                            <div className='title-price'></div>
                            <div className='detail-infor'>
                                <div className='price'>
                                    <span className='left'>
                                        <FormattedMessage id="patient.extra-infor-doctor.price" />
                                    </span>
                                    <span className='right'>{extraInfor && extraInfor.priceTypeData && language === LANGUAGES.VI &&
                                        <NumberFormat className='currency'
                                            value={extraInfor.priceTypeData.valueVi} displayType={'text'} thousandSeparator={true} suffix={'VND'} />
                                    }
                                        {extraInfor && extraInfor.priceTypeData && language === LANGUAGES.EN &&
                                            <NumberFormat className='currency'
                                                value={extraInfor.priceTypeData.valueEn} displayType={'text'} thousandSeparator={true} suffix={'$'} />
                                        }
                                    </span>
                                    <div className='note'>
                                        {extraInfor && extraInfor.note ? extraInfor.note : ''}
                                    </div>
                                </div>

                            </div>
                            <div className='payment'>
                                <FormattedMessage id="patient.extra-infor-doctor.The-method-payment" />
                                {extraInfor && extraInfor.paymenTypeData
                                    && language === LANGUAGES.VI
                                    ? extraInfor.paymenTypeData.valueVi : ''}
                                {extraInfor && extraInfor.paymenTypeData
                                    && language === LANGUAGES.EN
                                    ? extraInfor.paymenTypeData.valueEn : ''}
                            </div>
                            <div className='hide-price'>
                                <span
                                    onClick={() => this.showHiddenDetailDoctorInfor(false)}>
                                    <FormattedMessage id="patient.extra-infor-doctor.Hide price" />
                                </span></div>
                        </>
                    }

                </div>

            </div>
        )

    }
}

const mapStateToProps = state => {
    return {
        language: state.app.language,
    };
};

const mapDispatchToProps = dispatch => {
    return {
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(DoctorExtraInfor);
