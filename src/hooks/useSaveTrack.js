/**
 * ability to save track requires track and location contexts to work together.
 * this custom hook will allow interaction between the two contexts.
 */

 import { useContext } from 'react'
 import { Context as TrackContext } from '../context/TrackContext'
 import { Context as LocationContext } from '../context/LocationContext'

 export default () => {
    // pull data from location context, the put that into track action from track context
    const { createTrack } = useContext(TrackContext)
    const { state: { locations, name } } = useContext(LocationContext)
    console.log(createTrack)
    const saveTrack = () => {
        createTrack(name, locations)
    }

    // expose reusable function for other components to save track
    return [saveTrack]
 }
