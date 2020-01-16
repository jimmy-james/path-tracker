// this gets invoked here and expo-location will start emitting location changes every second.
import '../_mockLocation'
import React, { useEffect, useState } from 'react'
import { StyleSheet } from 'react-native'
import { Text } from 'react-native-elements'
import { SafeAreaView } from 'react-navigation'
import { requestPermissionsAsync, watchPositionAsync, Accuracy } from 'expo-location'
import Map from '../components/Map'

const TrackCreateScreen = () => {
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
            }, (location) => {
                // record this information on the map

            })
        } catch(e) {
            setErr(e)
        }
    }

    useEffect(() => {
        startWatching()
    }, [])

    return (
        <SafeAreaView forceInset={{ top: 'always' }}>
            <Text h3>Create a Track</Text>
            <Map />
            { err ? <Text>Please enable location services</Text> : null }
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({})

export default TrackCreateScreen
