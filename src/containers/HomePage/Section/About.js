import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import Slider from 'react-slick';



class About extends Component {
    
    render() {
        
        return(
            <div className='section-share section-about'>
                <div className='section-about-header'>
                    Truyền thông nói gì về Rain Aimer 
                <div className='section-about-content'>
                <div className='content-left'>
                <iframe width="100%" height="400" 
                src="https://www.youtube.com/embed/QzdovKFkXSo" 
                title="【HD】Penny Rain - Aimer - Black Bird【中日字幕】" 
                frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; 
                gyroscope; picture-in-picture; web-share" 
                allowFullScreen></iframe>
                </div>
                <div className='content-right'>
                <p>
                Tình cờ hay là cố ý, mà sau khi làm về thị trường chứng khoán, thì công việc tiếp theo của mình là làm tại ngân hàng, một ngân hàng nho nhỏ trên bờ Hồ Hà Nội (Hồ Hoàn Kiếm). Trong video này, mình sẽ chia sẻ góc nhìn của mình về ngày đầu tiên đi làm tại ngân hàng này.
Chi tiết và cụ thể, các bạn cùng theo dõi video này nhé ❤
                </p>
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
        language: state.app.language,
    };
};

const mapDispatchToProps = dispatch => {
    return {}
};

export default connect(mapStateToProps, mapDispatchToProps)(About);
