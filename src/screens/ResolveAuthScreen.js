import React, { useContext, useEffect } from 'react'
import { Context as AuthContext } from '../context/AuthContext'

const ResolveAuthScreen = () => {
    const { tryLocalSignin } = useContext(AuthContext)
    // invoke here to remove flash of content when looking for token
    useEffect(() => {
        tryLocalSignin()
    }, [])

    return null
}

export default ResolveAuthScreen
