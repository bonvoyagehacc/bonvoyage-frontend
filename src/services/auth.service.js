import axios from 'axios'
import { API_URL } from '/src/config'

class AuthService {

    userRegister = (username, password) => {
        let body = { username: username , password: password}
        return axios.post(API_URL + "/auth/register", body).then(resp => {
            if (resp.accessToken != null && resp.accessToken != undefined) {
                localStorage.setItem('localData', JSON.stringify({accessToken: resp.accessToken}));
            }
            return resp.data;
        })
    }

    login(username, password) {
        let body = {username: username, password: password}
        return axios.post(API_URL + "/auth/login", body).then(resp => {
            if (resp.accessToken != null && resp.accessToken != undefined) {
                localStorage.setItem('localData', JSON.stringify({accessToken: resp.accessToken}));
            }
            return resp.data
        })
    }

    logout() {
        localStorage.removeItem('localData');
    }
}

export default new AuthService();
