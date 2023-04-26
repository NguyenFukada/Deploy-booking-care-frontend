import actionTypes from '../actions/actionTypes';
import { getAllCodeService } from '../../services/userService';
const initialState = {
    genders: [],
    roles: [],
    position: [],
    isLoadingGender: false,
    users : [],
    topDoctor: [],
    allDoctors: [],
    allScheduleTime: [],

    allRequiredDoctorInfor : []
}

const adminReducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.FETCH_GENDER_START:
            let copyStateStart = { ...state };
            copyStateStart.isLoadingGender = true;
            return {
                ...copyStateStart
            }
        case actionTypes.FETCH_GENDER_SUCCESS:
            let copyState = { ...state };
            copyState.genders = action.data;
            copyState.isLoadingGender = false;
            return {
                ...copyState
            }
        case actionTypes.FETCH_GENDER_FAILED:
            let copyStateFailed = { ...state };
            copyStateFailed.isLoadingGender = false;
            copyStateFailed.genders = [];
            return {
                ...copyStateFailed
            }

        case actionTypes.FETCH_POSITION_SUCCESS:
            state.position = action.data;
            return {
                ...state
            }
        case actionTypes.FETCH_POSITION_FAILED:
            state.position = [];
            return {
                ...state
            }
        case actionTypes.FETCH_ROLE_SUCCESS:
            state.roles = action.data;
            return {
                ...state
            }
        case actionTypes.FETCH_ROLE_FAILED:
            state.roles = [];
            return {
                ...state
            }
        case actionTypes.FETCH_ALL_USERS_SUCCESS:
            state.users = action.users;
            return {
                ...state
            }
        case actionTypes.FETCH_ALL_USERS_FAILED:
            state.users = [];
            return {
                ...state
            }

        case actionTypes.FETCH_TOP_DOCTORS_SUCCESS:
            state.topDoctor = action.dataDoctors;
            return {
                ...state
            }
        case actionTypes.FETCH_TOP_DOCTORS_FAILED:
            state.topDoctor = [];
            return {
                ...state
            }

        case actionTypes.FETCH_ALL_DOCTORS_SUCCESS:
            state.allDoctors = action.dataDr;
            return {
                ...state
            }
        case actionTypes.FETCH_ALL_DOCTORS_FAILED:
            state.allDoctors = [];
            return {
                ...state
            }
        case actionTypes.FETCH_ALLCODE_SHEDULE_TIME_SUCCESS:
            state.allScheduleTime = action.datatime;
            return {
                ...state
            }
        case actionTypes.FETCH_ALLCODE_SHEDULE_TIME_FAILED:
            state.allScheduleTime = [];
            return {
                ...state
            }
        case actionTypes.FETCH_REQUIRED_DOCTOR_INFOR_SUCCESS:
            state.allRequiredDoctorInfor = action.data;
            return {
                ...state
            }
        case actionTypes.FETCH_REQUIRED_DOCTOR_INFOR_FAILED:
            state.allRequiredDoctorInfor = [];
            return {
                ...state
            }
        default:
            return state;
    }
}


export default adminReducer;