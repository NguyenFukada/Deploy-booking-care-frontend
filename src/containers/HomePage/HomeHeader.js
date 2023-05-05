import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import './HomeHeader.scss'
import appReducer from '../../store/reducers/appReducer'
import logo from '../../assets/logo.svg'
import { LANGUAGES } from "../../utils";
import { changeLanguageApp } from '../../store/actions';
import { withRouter } from 'react-router';
class HomeHeader extends Component {

    changeLanguage = (language) => {
        this.props.changeLanguageAppRedux(language)
        // fire redux event: actions
    }
    returnToHome = () => {
        if (this.props.history) {
            this.props.history.push(`/home`)
        }
    }
    render() {
        let language = this.props.language;
        return (
            <React.Fragment>
                <div className='home-header-container'>
                    <div className='home-header-content'>
                        <div className='left-content'>
                            <i className="fas fa-bars"></i>
                            <img className='header-logo' src={logo} 
                            onClick={()=>this.returnToHome()}/>
                        </div>
                        <div className='center-content'>

                            <div className='child-content'>
                                <div><b> <FormattedMessage id="homeheader.Specialty" />
                                </b></div>
                                <div className='sub-title'><FormattedMessage id="homeheader.Find a doctor by specialty" /></div>
                            </div>
                            <div className='child-content'>
                                <div><b><FormattedMessage id="homeheader.Health facilities" /></b></div>
                                <div className='sub-title'>
                                    <FormattedMessage id="homeheader.Choose hospital's clinic" />
                                </div>
                            </div>
                            <div className='child-content'>
                                <div>
                                    <b>
                                        <FormattedMessage id="homeheader.Doctor" />
                                    </b>
                                </div>
                                <div className='sub-title'>
                                    <FormattedMessage id="homeheader.Choose a good doctor" />
                                </div>

                            </div>
                            <div className='child-content'>
                                <div><b>
                                    <FormattedMessage id="homeheader.Checkup package" /></b></div>
                                <div className='sub-title'>
                                    <FormattedMessage id="homeheader.General health check" /></div>
                            </div>
                        </div>
                        <div className='right-content'>
                            <div className='support'><i className="fas fa-question-circle"></i>Hỗ trợ</div>
                            <div className={language === LANGUAGES.VI ? 'language-vi active' : 'language-vi'}><span onClick={() => this.changeLanguage(LANGUAGES.VI)}>VN</span></div>
                            <div className={language === LANGUAGES.EN ? 'language-en active' : 'language-en'}><span onClick={() => this.changeLanguage(LANGUAGES.EN)}>EN</span></div>
                        </div>
                    </div>
                </div>
                {this.props.isShowBanner === true &&
                    <div className='home-header-banner'>
                        <div className='content-up'>
                            <div className='title1'><FormattedMessage id="banner.title1" /></div>
                            <div className='title2'><FormattedMessage id="banner.title2" /></div>
                            <div className='search'>
                                <i className="fas fa-search"></i>
                                <input type='text' placeholder='Tìm chuyên khoa khám bệnh'>
                                </input>
                            </div>
                        </div>
                        <div className='content-down'>
                            <div className='option'>
                                <div className='child'>
                                    <div className='icon-child'><i className="fas fa-hospital"></i>

                                    </div>
                                    <div className='text-child'>
                                        <FormattedMessage id="option.option1" />
                                    </div>
                                </div>
                                <div className='child'>
                                    <div className='icon-child'><i className="fas fa-mobile-alt"></i>

                                    </div>
                                    <div className='text-child'>
                                        <FormattedMessage id="option.option2" />
                                    </div>
                                </div>
                                <div className='child'>
                                    <div className='icon-child'><i className="fas fa-stethoscope"></i>

                                    </div>
                                    <div className='text-child'>
                                        <FormattedMessage id="option.option3" />
                                    </div>
                                </div>
                                <div className='child'>
                                    <div className='icon-child'><i className="fas fa-flask"></i>

                                    </div>
                                    <div className='text-child'>
                                        <FormattedMessage id="option.option4" />
                                    </div>
                                </div>
                                <div className='child'>
                                    <div className='icon-child'><i className="fas fa-user-md"></i>

                                    </div>
                                    <div className='text-child'>
                                        <FormattedMessage id="option.option5" />
                                    </div>
                                </div>
                                <div className='child'>
                                    <div className='icon-child'><i className="fas fa-briefcase-medical"></i>

                                    </div>
                                    <div className='text-child'>
                                        <FormattedMessage id="option.option6" />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                }
            </React.Fragment>
        );
    }

}

const mapStateToProps = state => {
    return {
        isLoggedIn: state.user.isLoggedIn,
        language: state.app.language,
        userInfo: state.user.userInfo,
    };
};

const mapDispatchToProps = dispatch => {
    return {
        changeLanguageAppRedux: (language) => dispatch(changeLanguageApp(language))
    };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(HomeHeader));
