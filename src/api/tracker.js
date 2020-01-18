import axios from 'axios'
// soon to be deprecated to own repo
import { AsyncStorage } from 'react-native'

const instance = axios.create({
    // use ngrok so phone or emulator can access the express server
    // ngrok exposes the server's port to our local computer for access.
    // it only lasts for 8 hours
    baseURL: 'http://088cf108.ngrok.io'
})

instance.interceptors.request.use(
    // auto-called when making request
    // config has the url, method, headers of request
    async (config) => {
        const token = await AsyncStorage.getItem('token')
        if (token) {
            config.headers.Authorization = `Bearer ${token}`
        }
        return config
    },
    // auto-called when error in request
    (err) => {
        return Promise.reject(err)
    }
)

export default instance
