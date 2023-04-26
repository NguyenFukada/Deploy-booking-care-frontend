import axios from '../axios';
const handleLoginApi = (email, password) => {
    return axios.post('/api/login',{email, password});
}

const getAllUsers = (inputId) => {
    //template string
    return axios.get(`/api/get-all-users?id=${inputId}`)
}
const createNewUserService = (data) => {
    return axios.post('/api/create-new-user',data)
}
const deleteUserService = (userId) => {
    //return axios.delete('/api/delete-user',{id:userId})
    return axios.delete('/api/delete-user',{
        data: {
            id: userId
        }
    });
}

const editUserService = (inputData) => {
    return axios.put('/api/edit-user',inputData
    );
}
const getAllCodeService = (inputType) => {
    return axios.get(`/api/allcode?type=${inputType}`)
}

const getTopDoctorHomeService = (limit) => {
    return axios.get(`/api/top-doctor-home?limit=${limit}`)
}
const getAllDoctors = () => {
    return axios.get(`/api/get-all-doctors`)
}
const saveDetailDoctorService = (data) => {
    return axios.post(`/api/save-info-doctors`, data)
}
const getDetailInforDoctor = (inputId) => {
    return axios.get(`/api/get-detail-doctor-by-id?id=${inputId}`)
}
const saveBulkSchedule = (data) => {
    return axios.post(`/api/bulk-create-schedule`, data)
}
const getScheduleByDate = (doctorId,date) => {
    return axios.get(`/api/get-schedule-doctor-by-date?doctorId=${doctorId}&date=${date}`)
}
const getExtraInforDoctorById = (doctorId) => {
    return axios.get(`/api/get-extra-infor-doctor-by-id?doctorId=${doctorId}`)
}
const getProfilerDoctorById = (doctorId) => {
    return axios.get(`/api/get-profile-doctor-by-id?doctorId=${doctorId}`)
}
const postBookAppointment = (data) => {
    return axios.post(`/api/patient-book-appointment`, data)
}
const postVerifyPatientBookAppointment = (data) => {
    return axios.post(`/api/verify-book-appointment`, data)
}
const createNewSpecialty = (data) => {
    return axios.post(`/api/create-new-specialty`, data)
}
const getAllSpecialty = () => {
    return axios.get(`/api/get-all-specialty`)
}
const getDetailSpecialtyById = (data) => {
    return axios.get(`/api/get-detail-specialty-by-id?id=${data.id}&&location=${data.location}`)
}

const createNewClinic = (data) => {
    return axios.post(`/api/create-new-clinic`, data)
}
const getAllClinic = () => {
    return axios.get(`/api/get-clinic`)
}
const getDetailClinicById = (data) => {
    return axios.get(`/api/get-detail-clinic-by-id?id=${data.id}`)
}

const getListPatientForDoctor = (data) => {
    return axios.get(`/api/get-list-patient-for-doctor?doctorId=${data.doctorId}&&date=${data.date}`)
}
const postSendRemedy = (data) => {
    return axios.post(`/api/send-remedy`, data)
}
export { handleLoginApi, getAllUsers, createNewUserService, 
    deleteUserService, editUserService, getAllCodeService, getTopDoctorHomeService,
    getAllDoctors, saveDetailDoctorService, getDetailInforDoctor, saveBulkSchedule, getScheduleByDate,
    getExtraInforDoctorById, getProfilerDoctorById, postBookAppointment, postVerifyPatientBookAppointment, getAllSpecialty,
    createNewSpecialty, getDetailSpecialtyById, createNewClinic, getAllClinic, getDetailClinicById, getListPatientForDoctor, postSendRemedy }