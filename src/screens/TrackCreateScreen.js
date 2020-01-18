// this gets invoked here and expo-location will start emitting location changes every second.
import '../_mockLocation'
import React, { useContext, useCallback } from 'react'
import { StyleSheet } from 'react-native'
import { Text } from 'react-native-elements'
import { FontAwesome } from '@expo/vector-icons'
import { SafeAreaView, withNavigationFocus } from 'react-navigation'
import Map from '../components/Map'
import TrackForm from '../components/TrackForm'
import { Context as LocationContext } from '../context/LocationContext'
import useLocation from '../hooks/useLocation'

const TrackCreateScreen = ({ isFocused }) => {
    const { state: { recording }, addLocation } = useContext(LocationContext)
    // useCallback will invoke the same first callback that was used on the first rendering.
    // that is unless passed in second arg changes: state.recording.
    // this change will cause useCallback to invoke the latest callback as a new callback...
    // this will trigger useLocation's useEffect hook to trigger invocation because it's second param (callback) will have changed in memory.
    const callback = useCallback(
        location => {
            addLocation(location || recording, recording)
        },
        [recording],
    )
    // may also write useLocation(addLocation)
    const [ err ] = useLocation(isFocused, callback)
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
            <TrackForm />
        </SafeAreaView>
    )
}

TrackCreateScreen.navigationOptions = {
    title: 'Add Track',
    tabBarIcon: <FontAwesome name="plus" size={20} />
}

const styles = StyleSheet.create({})

export default withNavigationFocus(TrackCreateScreen)
