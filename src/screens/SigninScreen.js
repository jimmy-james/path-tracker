import React, { useContext } from 'react'
import { View, StyleSheet } from 'react-native'
import { Context as AuthContext } from '../context/AuthContext'

import AuthForm from '../components/AuthForm'
import NavLink from '../components/NavLink'

const SigninScreen = () => {
    const { state, signin } = useContext(AuthContext)

    return <View style={styles.container}>
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
