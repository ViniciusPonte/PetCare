import axios from 'axios';

export const api = axios.create({
    baseURL: "https://petcareapprn.herokuapp.com"
})