import axios from 'axios'
export default {
    checkAuthenticated() {
        // axios.get(`api/v1/auth/${signInMethod}`)
        //redo this pending reworked endpoints
        const user = 'mikumaku'
        const isNewUser = true
        return {user, isNewUser}
    }
}