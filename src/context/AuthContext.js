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
        case 'clear_error_message':
            return {
                ...state,
                errorMessage: ''
            }
        case 'signin':
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
            type: 'signin',
            payload: response.data.token
        })
        // navigate to mainFlow
        navigate('TrackList')
    } catch(e) {
        dispatch({
            type: 'add_error',
            payload: `Something went wrong with signing up: ${e.message}`
        })
    }
}

const signin = (dispatch) => async ({ email, password }) => {
    // make api request
    // if we sign up, modify state to say we are authenticated
    // if signing up fails, error message
    try {
        const response = await trackerApi.post('signin', { email, password })
        await AsyncStorage.setItem('token', response.data.token)
        dispatch({
            type: 'signin',
            payload: response.data.token,
        })
        // navigate to mainFlow
        navigate('TrackList')
    } catch(e) {
        dispatch({
            type: 'add_error',
            payload: `Something went wrong with signing in: ${e}`
        })
    }
}

const signout = (dispatch) => {
    return ({ email, password }) => {
        // make api request
        // if we sign up, modify state to say we are signed out
        // if signing up fails, error message

    }
}

// checks for token already existing in storage before sending to loginFlow
const tryLocalSignin = dispatch => async () => {
    const token = await AsyncStorage.getItem('token')

    if (token) {
        dispatch({ type: 'signin', payload: token })
        navigate('TrackList')
    } else {
        navigate('Signup')
    }
}

// to use when navigating away from loginFlow page
const clearErrorMessage = (dispatch) => () => {
    dispatch({ type: 'clear_error_message' })
}

export const { Provider, Context } = createDataContext(
    authReducer,
    {
        signup,
        signin,
        signout,
        clearErrorMessage,
        tryLocalSignin,
    },
    { token: null, errorMessage: '' }
)
