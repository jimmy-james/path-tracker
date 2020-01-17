import { useState, useEffect } from 'react'
import {
    Accuracy,
    requestPermissionsAsync,
    watchPositionAsync,
} from 'expo-location'

export default (shouldTrack, callback) => {
    const [err, setErr] = useState(null)
    const [subscriber, setSubscriber] = useState(null)

    const startWatching = async () => {
        try {
            await requestPermissionsAsync()
            // track user's location without moving around in development
            // this watchPositionAsync is buggy, so we wrote the _mockLocation above for development testing
            const sub = await watchPositionAsync({
                accuracy: Accuracy.BestForNavigation,
                timeInterval: 1000,
                distanceInterval: 10,
                // called anytime we see a new location
            }, callback)
            setSubscriber(sub)
        } catch(e) {
            setErr(e)
        }
    }

    useEffect(() => {
        if (shouldTrack) {
            startWatching()
        } else {
            // stop watching
            console.log(subscriber)
            subscriber.remove()
            setSubscriber(null)
        }
        // we want to run the callback in useEffect anytime the second argument's value [shouldTrack] ever changes
    }, [shouldTrack])

    return [err]
}
