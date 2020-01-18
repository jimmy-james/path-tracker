import createDataContext from './createDataContext'

const trackReducer = (state, action) => {
    switch (action.type) {
        case 'fetch_tracks':
            return {
                ...state
            }
        case 'create_track':
            return {
                ...state
            }

        default:
            return state
    }
}

// actions
const fetchTracks = dispatch => () => {}

const createTrack = dispatch => (name, locations) => {
    console.log(name, locations)
}

const deleteTrack = () => {}

export const { Provider, Context } = createDataContext(
    trackReducer,
    {
        fetchTracks,
        createTrack,
    },
    []
)
