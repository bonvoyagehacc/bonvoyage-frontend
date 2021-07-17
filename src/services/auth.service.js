import axios from 'axios'
import { API_URL } from '/src/config'

export const userRegister = (username, password) => {
    let body = { username: username , password: password}
    return axios.post(API_URL + "/auth/register", body).then(
        res => res.data
    )
}