import React, { useContext } from 'react'
import { Input, Button } from 'react-native-elements'
import Spacer from './Spacer'
import { Context as LocationContext } from '../context/LocationContext'

const TrackForm = () => {
    const { state: { name, recording, locations }, changeName, startRecording, stopRecording } = useContext(LocationContext)
console.log(locations.length)
    return <>
        <Spacer>
            <Input placeholder="Enter Name" value={name} onChangeText={changeName} />
        </Spacer>
        {recording ? <Button title="Stop Recording" onPress={stopRecording} /> : <Button title="Start Recording" onPress={startRecording} />}
    </>
}

export default TrackForm
