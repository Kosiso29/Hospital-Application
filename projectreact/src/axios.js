import axios from 'axios';

//http://ceid.ngrok.io.ngrok.io/HospitalApp/api/v1/AddUser
//https://jsonplaceholder.typicode.com/users
//http://102.164.38.38/HospitalApp/api/v1/GetAllUser

const instance = axios.create({
    // baseURL: 'http://102.164.38.38/HospitalApp/api/v1'
    baseURL: 'http://localhost:5000'
});

export default instance;