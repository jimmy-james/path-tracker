import createDataContext from './createDataContext'

const locationReducer = (state, action) => {
    switch (action.type) {
        case 'change_name':
            return {
                ...state,
                name: action.payload,
            }
        case 'add_current_location':
            return {
                ...state,
                currentLocation: action.payload
            }
        case 'add_location':
            return {
                ...state,
                locations: [...state.locations, action.payload]
            }
        case 'start_recording':
            return {
                ...state,
                recording: true,
            }
        case 'stop_recording':
            return {
                ...state,
                recording: false,
            }
        case 'reset':
            return {
                ...state,
                name: '',
                locations: []
            }
        default:
            return state;
    }
}

const changeName = dispatch => (name) => {
    dispatch({
        type: 'change_name',
        payload: name,
    })
}

const startRecording = dispatch => () => {
    // add to current AND locations array
    // record name also -- co-location
    dispatch({
        type: 'start_recording',
    })
}

const stopRecording = dispatch => () => {
    dispatch({
        type: 'stop_recording',
    })
}

const addLocation = dispatch => (location, recording) => {
    dispatch({
        type: 'add_current_location',
        payload: location,
    })
    // anytime addLocation is called while we are recording, we also want to add this location to location state.
    // no point in adding the location to state if we aren't recording.
    if (recording) {
        dispatch({
            type: 'add_location',
            payload: location
        })
    }
}

const reset = dispatch => () => {
    dispatch({
        type: 'reset',
    })
}

export const { Context, Provider } = createDataContext(
    locationReducer,
    {
        startRecording,
        stopRecording,
        addLocation,
        changeName,
        reset,
    },
    // default, initial state
    { name: '', recording: false, locations: [], currentLocation: null }
)