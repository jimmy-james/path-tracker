// this gets invoked here and expo-location will start emitting location changes every second.
import '../_mockLocation'
import React, { useContext } from 'react'
import { StyleSheet } from 'react-native'
import { Text } from 'react-native-elements'
import { SafeAreaView, withNavigationFocus } from 'react-navigation'
import Map from '../components/Map'
import { Context as LocationContext } from '../context/LocationContext'
import useLocation from '../hooks/useLocation'

const TrackCreateScreen = ({ isFocused }) => {
    const { addLocation } = useContext(LocationContext)
    // may also write useLocation(addLocation)
    const [ err ] = useLocation(isFocused, (location) => {
        // when we get a new location
        addLocation(location)
    })
    /**
     * ways to disable tracking when user moves away from screen:
     * - addListener to navigation
     * - NavigationEvents, willBlur
     * - HOC withNavigationFocus, which gives component new prop isFocused: Bool.
     *  This flag tells the component if the user has navigated into (true) or away (false) the component.
     *  However, watchPositionAsync() must be shutdown in a specific way via its subscriber object.
     * 
     */

    return (
        <SafeAreaView forceInset={{ top: 'always' }}>
            <Text h3>Create a Track</Text>
            <Map />
            { err ? <Text>Please enable location services</Text> : null }
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({})

export default withNavigationFocus(TrackCreateScreen)
