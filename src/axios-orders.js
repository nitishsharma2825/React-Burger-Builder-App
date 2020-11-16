import axios from 'axios'
const instance=axios.create({
    baseURL:'https://react-burger-app-820c0.firebaseio.com/'
})
export default instance