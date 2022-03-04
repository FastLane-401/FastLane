import React, { useState, useEffect } from 'react'
import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableHighlight,
  PermissionsAndroid
} from 'react-native'
import Voice from '@react-native-voice/voice'

const VoiceInput = () => {
  const [isListening, setIsListening] = useState(false)
  const [results, setResults] = useState([])
  const [partialResults, setPartialResults] = useState([])
  const [error, setError] = useState()
  const [read, setRead] = useState()

  const requestRecordPermission = async () => {
    await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.RECORD_AUDIO
    )
  }

  const onStart = () => {
    console.log('Starting Listening')
    setIsListening(true)
  }

  const onEnd = (e) => {
    console.log('Ending Listening')
    setIsListening(false)
  }

  const onError = (error) => {
    console.log('Error: ', error)
    setError(error.message)
    setIsListening(false)
  }

  const onResults = (results) => {
    console.log('Results: ', results)
    setResults(results.value)
    const RNFS = require('react-native-fs')
    const path = RNFS.DocumentDirectoryPath + '/voicelog.txt'

    /* if you want text to persist in the file between button presses, use
     * appendFile() instead of writeFile(). You should also probably modify
     * the second parameter to ' ' + e.value[0] so text strings don't run
     * together between button presses. */
    RNFS.writeFile(path, results.value[0], 'utf8')
      .then((success) => {
        console.log('FILE WRITTEN: ' + path)
      })
      .catch((err) => {
        console.log('PROBLEM HERE')
        console.log(err.message)
      })
    stopRecognizing()
  }

  const onPartialResults = (partialResults) => {
    console.log('Partial Results: ', partialResults)
    setPartialResults(partialResults.value[0])
  }

  useEffect(() => {
    Voice.onSpeechStart = onStart
    Voice.onSpeechEnd = onEnd
    Voice.onSpeechError = onError
    Voice.onSpeechResults = onResults
    Voice.onSpeechPartialResults = onPartialResults

    return () => {
      Voice.destroy().then(Voice.removeAllListeners)
    }
  }, [])

  const startRecognizing = async () => {
    console.log('test')
    try {
      await Voice.start('en-US')
      setError('')
      setResults([])
      setPartialResults([])
      setIsListening(false)
      setRead('')
    } catch (e) {
      console.error(e)
    }
  }

  const stopRecognizing = async () => {
    try {
      await Voice.stop()
    } catch (e) {
      console.error(e)
    }
  }

  const _cancelRecognizing = async () => {
    try {
      await Voice.cancel()
    } catch (e) {
      console.error(e)
    }
  }

  const _destroyRecognizer = async () => {
    try {
      await Voice.destroy()
      setError('')
      setResults([])
      setPartialResults([])
      setIsListening(false)
      setRead('')
    } catch (e) {
      console.error(e)
    }
  }

  const _readVoiceLog = async () => {
    try {
      const RNFS = require('react-native-fs')
      const path = RNFS.DocumentDirectoryPath + '/voicelog.txt'

      RNFS.readFile(path, 'utf8')
        .then((data) => {
          console.log('FILE READ: ' + path)
          setRead(data)
        })
        .catch((error) => {
          console.log(error.message)
        })
    } catch (e) {
      console.error(e)
    }
  }

  useEffect(() => {
    requestRecordPermission()
  }, [])

  return (
    <View style={styles.container}>
      <Text style={styles.welcome}>Welcome to FastLane!</Text>
      <Text style={styles.instructions}>
        Press the button and start speaking.
      </Text>
      <Text style={styles.stat}>{`Started: ${isListening}`}</Text>
      <Text style={styles.stat}>{`Error: ${error}`}</Text>
      <Text style={styles.stat}>Results</Text>
      {results.map((result, index) => {
        return (
          <Text key={`result-${index}`} style={styles.stat}>
            {result}
          </Text>
        )
      })}
      <Text style={styles.stat}>Partial Results</Text>
      <Text>{partialResults}</Text>
      <Text style={styles.stat}>{`was written to the file: ${read}`}</Text>
      <TouchableHighlight onPress={startRecognizing}>
        <Image style={styles.button} source={require('../button.png')} />
      </TouchableHighlight>
      <TouchableHighlight onPress={stopRecognizing}>
        <Text style={styles.action}>Stop Recognizing</Text>
      </TouchableHighlight>
      <TouchableHighlight onPress={_cancelRecognizing}>
        <Text style={styles.action}>Cancel</Text>
      </TouchableHighlight>
      <TouchableHighlight onPress={_destroyRecognizer}>
        <Text style={styles.action}>Destroy</Text>
      </TouchableHighlight>
      <TouchableHighlight onPress={_readVoiceLog}>
        <Text style={styles.action}>Read</Text>
      </TouchableHighlight>
    </View>
  )
}

const styles = StyleSheet.create({
  button: {
    width: 50,
    height: 50
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF'
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10
  },
  action: {
    textAlign: 'center',
    color: '#0000FF',
    marginVertical: 5,
    fontWeight: 'bold'
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5
  },
  stat: {
    textAlign: 'center',
    color: '#B0171F',
    marginBottom: 1
  }
})

export default VoiceInput
