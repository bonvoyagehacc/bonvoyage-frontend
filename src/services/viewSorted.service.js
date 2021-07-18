import axios from 'axios'
import { API_URL } from '/src/config'

export const fetchImages = (user_token) => {
    let axiosConfig = { 
        headers: { 
        "x-access-token": user_token,
        }
    }
    return axios.get(API_URL + "/photo/gallery", axiosConfig ).then(
        res => res.data
    )
}