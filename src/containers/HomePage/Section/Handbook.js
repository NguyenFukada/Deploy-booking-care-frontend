import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import Slider from 'react-slick';



class Handbook extends Component {
    
    render() {
        
        return(
            <div className='section-share section-handbook'>
                <div className='section-container'>
                    <div className='section-header'>
                        <span className='title-section'>Cẩm nang</span>
                        <button className='btn-section'>Tất cả bài viết</button>
                    </div>
                <div className='section-body'>
                <Slider {...this.props.settings}>
                    <div className='section-customize'>
                        <div className='bg-image section-handbook'/>
                        <div>Kinh nghiệm khám bệnh  1</div>
                    </div>
                    <div className='section-customize'>
                    <div className='bg-image section-handbook'/>
                        <div>Kinh nghiệm khám bệnh  2</div>
                    </div>
                    <div className='section-customize section-handbook'>
                    <div className='bg-image section-handbook'/>
                        <div>Kinh nghiệm khám bệnh  3</div>
                    </div>
                    <div className='section-customize'>
                    <div className='bg-image section-handbook'/>
                        <div>Kinh nghiệm khám bệnh  4</div>
                    </div>
                    <div className='section-customize'>
                    <div className='bg-image section-handbook'/>
                        <div>Kinh nghiệm khám bệnh  5</div>
                    </div>
                </Slider>
                </div>
                </div>
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

export default connect(mapStateToProps, mapDispatchToProps)(Handbook);
