import React, { useContext } from 'react'
import { Input, Button } from 'react-native-elements'
import Spacer from './Spacer'
import { Context as LocationContext } from '../context/LocationContext'
import useSaveTrack from '../hooks/useSaveTrack'

const TrackForm = () => {
    const { state:
        { name, recording, locations },
        changeName,
        startRecording,
        stopRecording
    } = useContext(LocationContext)
    const [saveTrack] = useSaveTrack()

    return <>
        <Spacer>
            <Input placeholder="Enter Name" value={name} onChangeText={changeName} />
        </Spacer>
        {recording ?
            <Spacer><Button title="Stop Recording" onPress={stopRecording} /></Spacer> :
            <Spacer><Button title="Start Recording" onPress={startRecording} /></Spacer>}
        {!recording && locations.length ?
            <Spacer><Button title="Save Recording" onPress={saveTrack} /></Spacer> :
            null}
    </>
}

export default TrackForm
