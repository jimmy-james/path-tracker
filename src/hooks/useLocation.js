import { useState, useEffect } from 'react'
import {
    Accuracy,
    requestPermissionsAsync,
    watchPositionAsync,
} from 'expo-location'

export default (shouldTrack, callback) => {
    const [err, setErr] = useState(null)

    /**
     * Do not use helper functions in useEffect that are external.
     * Define helper functions that reference state/context/props inside useEffect.
     * Add state/context/props referenced in those functions within the dependency array.
     */
    useEffect(() => {
        let subscriber;
        // keeping this helper function in here since callback prop is being used in the dependency array anyway.
        // also we can clean up subscriber logic
        const startWatching = async () => {
            try {
                await requestPermissionsAsync()
                // track user's location without moving around in development
                // this watchPositionAsync is buggy, so we wrote the _mockLocation above for development testing
                subscriber = await watchPositionAsync({
                    accuracy: Accuracy.BestForNavigation,
                    timeInterval: 1000,
                    distanceInterval: 10,
                    // called anytime we see a new location
                }, callback)
            } catch(e) {
                setErr(e)
            }
        }

        if (shouldTrack) {
            startWatching()
        } else {
            // stop watching
            if (subscriber) {
                subscriber.remove()
            }
            subscriber = null
        }

        // Cleanup: to be careful, we don't want to keep calling/keep telling watchPositionAsync to create new instantiations of the watcher in case it or any other function we use will do that.
        return () => {
            if (subscriber) {
                subscriber.remove()
            }
        }
        // we want to run the callback in useEffect anytime the second argument's value [shouldTrack] ever changes
        // callback changes when useCallback hook creates a new callback
    }, [shouldTrack, callback])

    return [err]
}
