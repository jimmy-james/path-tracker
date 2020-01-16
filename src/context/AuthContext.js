import createDataContext from './createDataContext'
import trackerApi from '../api/tracker'

const authReducer = (state, action) => {
    switch (action.type) {
    
        default:
            break;
    }
}

// sign in, sign up, sign out
const signup = (dispatch) => {
    return async ({ email, password }) => {
        // make api request
        // if we sign up, modify state to say we are authenticated
        // if signing up fails, error message
        try {
            const response = await trackerApi.post('/signup', { email, password })
            console.log(response.data)
        } catch(e) {
            console.log(e.message)
        }
    }
}

const signin = (dispatch) => {
    return ({ email, password }) => {
        // make api request
        // if we sign up, modify state to say we are authenticated
        // if signing up fails, error message

    }
}

const signout = (dispatch) => {
    return ({ email, password }) => {
        // make api request
        // if we sign up, modify state to say we are signed out
        // if signing up fails, error message

    }
}

export const { Provider, Context } = createDataContext(
    authReducer,
    {
        signup,
        signin,
        signout,
    },
    { isSignedIn: false }
)
