import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import Slider from 'react-slick';



class HomeFooter extends Component {
    
    render() {
        
        return(
            <div className='home-footer'>
            <p>&copy; 2023 Nguyen Quoc Cuong. <a href='#'>More information, please click this link!</a></p>
                </div>
        )
    }

}

const mapStateToProps = state => {
    return {
        isLoggedIn: state.user.isLoggedIn,
        language: state.app.language,
    };
};

const mapDispatchToProps = dispatch => {
    return {}
};

export default connect(mapStateToProps, mapDispatchToProps)(HomeFooter);
