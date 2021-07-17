import axios from 'axios'
import { API_URL } from '/src/config'

export const sendZippedImages = (zipped_images, user_token) => {
    console.log("zipped:", zipped_images.type)

    let axiosConfig = { 
        headers: { 
        "x-access-token": user_token,
        'Content-Type': 'application/zip'
        }
    }
    return axios.post(API_URL + "/photo/upload", zipped_images, axiosConfig ).then(
        res => res.data
    )
}