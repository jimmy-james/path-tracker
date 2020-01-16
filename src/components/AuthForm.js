import React, { useState } from 'react'
import { StyleSheet } from 'react-native'
import { Text, Button, Input } from 'react-native-elements'
import Spacer from '../components/Spacer'

const AuthForm = ({ headerText, errorMessage, onSubmit, submitButtonText }) => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    return (
        <>
            <Spacer>
                <Text h3 style={styles.header}>{headerText}</Text>
            </Spacer>
            <Input
                autoCapitalize="none"
                autoCorrect={false}
                label="Email"
                value={email}
                onChangeText={setEmail}
            />
            <Spacer />
            <Input
                secureTextEntry
                autoCapitalize="none"
                autoCorrect={false}
                label="Password"
                value={password}
                onChangeText={setPassword}
            />
            {errorMessage ? <Spacer><Text style={styles.errorMessage}>{errorMessage}</Text></Spacer> : null}
            <Spacer>
                <Button style={styles.button} title={submitButtonText} onPress={() => onSubmit({ email, password })} />
            </Spacer>
        </>
    )
}

const styles = StyleSheet.create({
    header: {
        textAlign: 'center',
        marginBottom: 10,
    },
    button: {
        marginTop: 20
    },
    errorMessage: {
        fontSize: 16,
        color: 'red'
    },
})

export default AuthForm