import { AsyncStorage } from 'react-native'
import createDataContext from './createDataContext'
import trackerApi from '../api/tracker'
import { navigate } from '../navigationRef'

const authReducer = (state, action) => {
    switch (action.type) {
        case 'add_error':
            return {
                ...state,
                errorMessage: action.payload
            }
        case 'signup':
            return {
                token: action.payload,
                errorMessage: ''
            }
        default:
            break;
    }
}

// sign in, sign up, sign out
const signup = (dispatch) => async ({ email, password }) => {
    // make api request
    // if we sign up, modify state to say we are authenticated
    // store token on device (asyncStorage - being deprecated), then to state object
    // if signing up fails, error message
    try {
        const response = await trackerApi.post('/signup', { email, password })
        await AsyncStorage.setItem('token', response.data.token)
        dispatch({
            type: 'signup',
            payload: response.data.token
        })
        // navigate to mainFlow
        navigate('TrackList')
    } catch(e) {
        dispatch({
            type: 'add_error',
            payload: `Something went wrong with signup: ${e.message}`
        })
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
    { token: null, errorMessage: '' }
)
