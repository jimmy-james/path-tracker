import axios from 'axios'

export default axios.create({
    // use ngrok so phone or emulator can access the express server
    // ngrok exposes the server's port to our local computer for access.
    // it only lasts for 8 hours
    baseURL: 'http://41b8f720.ngrok.io'
})
