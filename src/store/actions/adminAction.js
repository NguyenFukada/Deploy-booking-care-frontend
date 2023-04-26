import { getAllCodeService, createNewUserService, getAllUsers, deleteUserService, 
    editUserService, getTopDoctorHomeService, getAllDoctors, saveDetailDoctorService, getAllSpecialty, getAllClinic } from '../../services/userService';
import actionTypes from './actionTypes';
import { toast } from 'react-toastify';

// export const fetchGenderStart = () => ({
//     type: actionTypes.FETCH_GENDER_START
// })

export const fetchGenderStart = () => {
    return async (dispatch, getState) => {
        try {
            dispatch({
                type: actionTypes.FETCH_GENDER_START
            })
            let res = await getAllCodeService("GENDER");
            if (res && res.errCode === 0) {
                //console.log('check get state: ', getState);
                dispatch(fetchGenderSuccess(res.data));
            }
            else { dispatch(fetchGenderFailed()) }
        } catch (e) {
            dispatch(fetchGenderFailed());
            console.log('error fetch: ', e);
        }
    }

}

export const fetchGenderSuccess = (genderData) => ({
    type: actionTypes.FETCH_GENDER_SUCCESS,
    data: genderData
})

export const fetchGenderFailed = () => ({
    type: actionTypes.FETCH_GENDER_FAILED
})


export const fetchPositionStart = () => {
    return async (dispatch, getState) => {
        try {
            // dispatch({
            //     type: actionTypes.FETCH_POSITION_START
            // })
            let res = await getAllCodeService("POSITION");
            if (res && res.errCode === 0) {
                //console.log('check get state: ', getState);
                dispatch(fetchPositionSuccess(res.data));
            }
            else { dispatch(fetchPositionFailed()) }
        } catch (e) {
            dispatch(fetchPositionFailed());
            console.log('error fetch: ', e);
        }
    }

}
export const fetchPositionSuccess = (positionData) => ({
    type: actionTypes.FETCH_POSITION_SUCCESS,
    data: positionData
})

export const fetchPositionFailed = () => ({
    type: actionTypes.FETCH_POSITION_FAILED
})


export const fetchRoleStart = () => {
    return async (dispatch, getState) => {
        try {
            // dispatch({
            //     type: actionTypes.FETCH_ROLE_START
            // })
            let res = await getAllCodeService("ROLE");
            if (res && res.errCode === 0) {
                //console.log('check get state: ', getState);
                dispatch(fetchRoleSuccess(res.data));
            }
            else { dispatch(fetchRoleFailed()) }
        } catch (e) {
            dispatch(fetchRoleFailed());
            console.log('error fetch: ', e);
        }
    }

}
export const fetchRoleSuccess = (roleData) => ({
    type: actionTypes.FETCH_ROLE_SUCCESS,
    data: roleData
})

export const fetchRoleFailed = () => ({
    type: actionTypes.FETCH_ROLE_FAILED
})

export const createNewUser = (data)=> {
    return async (dispatch, getState) => {
        try {
            let res = await createNewUserService(data);
            console.log('check create user redux: ',res);
            if (res && res.errCode === 0) {
                toast.success("Create a new user succeed!")
                console.log('check get state: ', getState);
                dispatch(saveUserSuccess());
                dispatch(fetchAllUserStart());
            }
            else { dispatch(saveUserFailed()) }
        } catch (e) {
            dispatch(saveUserFailed());
            console.log('error fetch: ', e);
        }
    }
}
export const saveUserSuccess = () => ({
    type: actionTypes.CREATE_USER_SUCCESS
})

export const saveUserFailed = () => ({
    type: actionTypes.CREATE_USER_FAILED
})

export const fetchAllUserStart = ()=> {
return async (dispatch, getState) => {
    try {
        let res = await getAllUsers("ALL");
        //let res1 = await getTopDoctorHomeService('');
        //console.log('check response gettopdoctor: ', res1);
        if (res && res.errCode === 0) {
            dispatch(fetchAllUserSuccess(res.users.reverse()));
        }
        else { dispatch(fetchAllUserFailed()) }
    } catch (e) {
        dispatch(fetchAllUserFailed());
        console.log('error fetch: ', e);
    }
}}
export const fetchAllUserSuccess = (data) => ({
    type: actionTypes.FETCH_ALL_USERS_SUCCESS,
    users: data
})
export const fetchAllUserFailed = () => ({
    type: actionTypes.FETCH_ALL_USERS_FAILED,
})

export const deleteAUser = (userId) => {
    return async (dispatch, getState) => {
        try {
            let res = await deleteUserService(userId);
            //console.log('check create user redux: ', res);
            if (res && res.errCode === 0) {
                toast.success("Delete user succeed!")
                dispatch(deleteAUserSuccess());
                dispatch(fetchAllUserStart());
            }
            else { dispatch(deleteAUserFailed()) }
        } catch (e) {
            toast.error("Delete user failed!")
            dispatch(deleteAUserFailed());
            console.log('error fetch: ', e);
        } 
    }
}

export const deleteAUserSuccess = () => ({
    type: actionTypes.DELETE_USER_SUCCESS
})
export const deleteAUserFailed = () => ({
    type: actionTypes.DELETE_USER_FAILED
})

export const editAUser = (userId) => {
    return async (dispatch, getState) => {
        try {
            let res = await editUserService(userId);
            console.log('check create user redux: ', res);
            if (res && res.errCode === 0) {
                toast.success("Update user succeed!")
                dispatch(editUserSuccess());
                dispatch(fetchAllUserStart());
            }
            else { dispatch(editUserFailed()) }
        } catch (e) {
            toast.error("Update user failed!")
            dispatch(editUserFailed());
            console.log('error fetch: ', e);
        }
    }
}
export const editUserSuccess = () => ({
    type: actionTypes.EDIT_USER_SUCCESS
})
export const editUserFailed = () => ({
    type: actionTypes.EDIT_USER_FAILED
})

export const fetchTopDoctor = () => {
    return async (dispatch, getState) => {
        try {
            let res = await getTopDoctorHomeService('');
            if (res && res.errCode === 0){
                dispatch({
                    type: actionTypes.FETCH_TOP_DOCTORS_SUCCESS,
                    dataDoctors: res.data
                })
            }else{
                dispatch({
                    type: actionTypes.FETCH_TOP_DOCTORS_FAILED,
                })
            }
        } catch (e) {
            console.log('FETCH_TOP_DOCTOR_FAILED:', e);
            dispatch({
                type: actionTypes.FETCH_TOP_DOCTORS_FAILED,
            })
        }
    }
}

export const fetchAllDoctors = () => {
    return async (dispatch, getState) => {
        try {
            let res = await getAllDoctors();
            
            if (res && res.errCode === 0) {
                dispatch({
                    type: actionTypes.FETCH_ALL_DOCTORS_SUCCESS,
                    dataDr: res.data
                })
            } else {
                dispatch({
                    type: actionTypes.FETCH_ALL_DOCTORS_FAILED,
                })
            }
        } catch (e) {
            console.log('FETCH_TOP_DOCTOR_FAILED:', e);
            dispatch({
                type: actionTypes.FETCH_ALL_DOCTORS_FAILED,
            })
        }
    }
}

export const saveDetailDoctor = (data) => {
    return async (dispatch, getState) => {
        try {
            let res = await saveDetailDoctorService(data);

            if (res && res.errCode === 0) {
                toast.success("Save detail info doctor succeed!")
                dispatch({
                    type: actionTypes.SAVE_DETAIL_DOCTOR_SUCCESS,
                })
            } else {
                toast.error("Save detail info doctor failed!")
                dispatch({
                    type: actionTypes.SAVE_DETAIL_DOCTOR_FAILED,
                })
            }
        } catch (e) {
            console.log('SAVE_DETAIL_DOCTOR_FAILED:', e);
            dispatch({
                type: actionTypes.SAVE_DETAIL_DOCTOR_FAILED,
            })
        }
    }
}
export const fetchAllScheduleTime = () => {
    return async (dispatch, getState) => {
        try {
            let res = await getAllCodeService("TIME");

            if (res && res.errCode === 0) {
                dispatch({
                    type: actionTypes.FETCH_ALLCODE_SHEDULE_TIME_SUCCESS,
                    datatime: res.data
                })
            } else {
                dispatch({
                    type: actionTypes.FETCH_ALLCODE_SHEDULE_TIME_FAILED,
                })
            }
        } catch (e) {
            console.log('FETCH_ALLCODE_SHEDULE_TIME_FAILED:', e);
            dispatch({
                type: actionTypes.FETCH_ALLCODE_SHEDULE_TIME_FAILED,
            })
        }
    }
}
export const getRequiredDoctorInfor = () => {
    return async (dispatch, getState) => {
        try {
            dispatch({
                type: actionTypes.FETCH_REQUIRED_DOCTOR_INFOR_START
            })
            let resPrice = await getAllCodeService("PRICE");
            let resPayment = await getAllCodeService("PAYMENT");
            let resProvince = await getAllCodeService("PROVINCE");
            let resSpecialty = await getAllSpecialty();
            let resClinic = await getAllClinic();
            if (resPrice && resPrice.errCode === 0
                && resPayment && resPayment.errCode === 0 && 
                resProvince && resProvince.errCode === 0
                && resSpecialty && resSpecialty.errCode === 0 
                && resClinic && resClinic.errCode === 0){
                let data = {
                    resPrice: resPrice.data,
                    resPayment: resPayment.data,
                    resProvince: resProvince.data,
                    resSpecialty: resSpecialty.data,
                    resClinic: resClinic.data
                }
                dispatch(fetchRequiredDoctorInforSuccess(data));
            }
            else { dispatch(fetchRequiredDoctorInforFailed()) }
        } catch (e) {
            dispatch(fetchRequiredDoctorInforFailed());
            console.log('error fetchRequiredDoctorInforSuccess: ', e);
        }
    }

}

export const fetchRequiredDoctorInforSuccess = (allRequiredData) => ({
    type: actionTypes.FETCH_REQUIRED_DOCTOR_INFOR_SUCCESS,
    data: allRequiredData
})

export const fetchRequiredDoctorInforFailed = () => ({
    type: actionTypes.FETCH_REQUIRED_DOCTOR_INFOR_FAILED
})
