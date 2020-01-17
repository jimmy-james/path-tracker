import React, { useState, useEffect } from 'react'
import {
    Accuracy,
    requestPermissionsAsync,
    watchPositionAsync,
} from 'expo-location'

export default (callback) => {
    const [err, setErr] = useState(null)

    const startWatching = async() => {
        try {
            await requestPermissionsAsync()
            // track user's location without moving around in development
            // this watchPositionAsync is buggy, so we wrote the _mockLocation above for development testing
            await watchPositionAsync({
                accuracy: Accuracy.BestForNavigation,
                timeInterval: 1000,
                distanceInterval: 10,
            // called anytime we see a new location
            }, callback)
        } catch(e) {
            setErr(e)
        }
    }

    useEffect(() => {
        startWatching()
    }, [])

    return [err]
}
