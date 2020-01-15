import React from 'react'
import { View, StyleSheet, Text, Button } from 'react-native'

const SigninScreen = ({ navigation }) => {
    return <>
        <Text style={{ fontSize: 48 }}>SIGNIN SCREEN</Text>
        <Button title="Go to signup " onPress={() => navigation.navigate('Signup')} />
        <Button title="Go to main flow " onPress={() => navigation.navigate('mainFlow')} />
    </>
}

const styles = StyleSheet.create({})

export default SigninScreen
