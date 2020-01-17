import React, { useContext } from 'react'
import { View, StyleSheet } from 'react-native'
// like adding an event listener to the navigation object
import { NavigationEvents } from 'react-navigation'
import { Context as AuthContext } from '../context/AuthContext'

import AuthForm from '../components/AuthForm'
import NavLink from '../components/NavLink'

const SigninScreen = () => {
    const { state, signin, clearErrorMessage } = useContext(AuthContext)

    /**
     * onWillFocus = {}
     onDidFocus = {}
     onWillBlur = {}
     onDidBlur = {}
     */
    return <View style={styles.container}>
        <NavigationEvents
            onWillBlur={clearErrorMessage}
        />
        <AuthForm
            headerText="Sign In to Tracker"
            errorMessage={state.errorMessage}
            submitButtonText="Sign In"
            onSubmit={signin}
        />
        <NavLink routeName="Signup" linkText="Don't have an account? Sign up instead" />
    </View>
}

SigninScreen.navigationOptions = () => {
    return {
        header: null,
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        marginBottom: 250
    },
})

export default SigninScreen
