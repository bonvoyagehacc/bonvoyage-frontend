import axios from 'axios'
import { API_URL } from '/src/config'

export const sendZippedImages = (zipped_images, user_token) => {
    console.log("zipped:", zipped_images)
    let body = { zipped : zipped_images }
    let axiosConfig = { 
        headers: { 
        "x-access-token": user_token,
        'Content-Type' : zipped_images.type
        }
    }
    return axios.post(API_URL + "/photo/upload", body, axiosConfig ).then(
        res => res.data
    )
}