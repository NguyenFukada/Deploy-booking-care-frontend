import React, { Component } from 'react';
import { connect } from "react-redux";
import { FormattedMessage } from 'react-intl';
import './ManageSpecialty.scss'
import MarkdownIt from 'markdown-it';
import MdEditor from 'react-markdown-editor-lite';
import { CommonUtils } from "../../../utils"
import { createNewSpecialty } from "../../../services/userService"
import {toast} from "react-toastify"

const mdParser = new MarkdownIt(/* Markdown-it options */);

class ManageSpecialty extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name: '',
            imageBase64: '',
            descriptionHTML: '',
            descriptionMarkDown: '',
        }
    }
    async componentDidMount() {


    }


    async componentDidUpdate(prevProps, prevState, snapshot) {

    }
    handleOnChangeInput = (Event, id)=>{
        let stateCopy = {...this.state}
        stateCopy[id] = Event.target.value;
        this.setState({
            ...stateCopy
        })
 
    }
    handleEditorChange = ({ html, text }) => {
        this.setState({
            descriptionMarkDown: text,
            descriptionHTML: html,
        })
    }
    handleOnChangeImage = async (Event) => {
        let data = Event.target.files;
        let file = data[0];
        if (file) {
            let base64 = await CommonUtils.getBase64(file);
            this.setState({
                imageBase64: base64,
                
            })
        }
    }
    hanleSaveSpecialty = async ()=>{
        let data = this.state;
        let res = await createNewSpecialty(data)
        if(res && res.errCode === 0){
            toast.success('Add new specialty success!');
            this.setState({
                name: '',
                imageBase64: '',
                descriptionHTML: '',
                descriptionMarkDown: '',
            })
        }else{
            toast.error('Error !');
        }
        
    }
    render() {

        return (
            <div className='manage-specialty-container'>
                <div className='ms-title'>Quản lý chuyên khoa</div>
    
                <div className='add-new-specialty row'>
                    <div className='col-6 form-group'>
                        <label>Tên chuyên khoa</label>
                        <input className='form-control' type='text' value={this.state.name}
                            onChange={(Event)=>this.handleOnChangeInput(Event,'name')}></input>
                    </div>
                    <div className='col-6 form-group'>
                        <label>Anh chuyên khoa </label>
                        <input className='form-control-file' type='file'
                            onChange={(Event) => this.handleOnChangeImage(Event)}></input>
                    </div>
                    <div className='col-12'>
                        <MdEditor style={{ height: '300px' }}
                            renderHTML={text => mdParser.render(text)}
                            onChange={this.handleEditorChange}
                            value={this.state.descriptionMarkDown} />
                    </div>
                    <div className='col-12'>
                        <button className='btn-save-specialty'
                        onClick={()=>this.hanleSaveSpecialty()}>Save</button>
                    </div>
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

export default connect(mapStateToProps, mapDispatchToProps)(ManageSpecialty);
