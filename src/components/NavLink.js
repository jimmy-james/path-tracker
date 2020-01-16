import React from 'react'
import { StyleSheet, TouchableOpacity } from 'react-native'
import { Text } from 'react-native-elements'
import Spacer from './Spacer'
// for child components that do not come with navigation object
import { withNavigation } from 'react-navigation'

const NavLink = ({ routeName, linkText, navigation }) => {
    return (
        <Spacer>
            <TouchableOpacity onPress={() => navigation.navigate(routeName)}>
                <Text style={styles.link}>{linkText}</Text>
            </TouchableOpacity>
        </Spacer>
    )
}

const styles = StyleSheet.create({
    link: {
        color: 'blue',
        textAlign: 'center'
    }
})

export default withNavigation(NavLink)
