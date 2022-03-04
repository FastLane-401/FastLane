/**
 * @format
 * @flow strict-local
 */

import React, { useState, useEffect } from 'react'
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  PermissionsAndroid
} from 'react-native'
import Voice from '@react-native-voice/voice'

const App = () => {
  const [isListening, setIsListening] = useState(false)
  const [results, setResults] = useState([])
  const [partialResults, setPartialResults] = useState([])
  const [error, setError] = useState()
  const [read, setRead] = useState()

  const [countDoc, setCountDoc] = useState(0)
  const [countMode, setCountMode] = useState(0)
  const [labelMode, setLabelMode] = useState('Command')
  const modeTextHandler = event => setLabelMode('Mindful')

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
    <View
      style={styles.screen}>

      <Text
        style={styles.docDisplay} >
        <Text style={styles.boldText}>         Document{'\n\n'}</Text>
        {results[0]}
      </Text>

      <Text
        style={styles.modeDisplay} >
        <Text style={styles.boldText}>{'             '}Mode{'\n\n'}</Text>
        {labelMode}
      </Text>

      <TouchableOpacity
        onPress={startRecognizing}
        style={styles.micButton} >
        <Text
          style={styles.textWhite} >
          MIC
        </Text>
      </TouchableOpacity>

      <TouchableOpacity
        onPress={() => setCountDoc(countDoc + 1)}
        style={styles.docButton} >
        <Text
          style={styles.textAlabaster} >
          DOC
        </Text>
      </TouchableOpacity>

      <TouchableOpacity
        onPress={() => setCountMode(countMode + 1)}
        onPress={modeTextHandler}
        style={styles.modeButton} >
        <Text
          style={styles.textAlabaster} >
          MODE
        </Text>
      </TouchableOpacity>

    </View>

  )
}

export default App

const styles = StyleSheet.create({

  screen: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#2F2F2F'
  },

  micButton: {
    top: 150,
    left: 0,
    width: 100,
    height: 100,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 10,
    borderRadius: 100,
    backgroundColor: '#f39900'
  },

  docButton: {
    top: 75,
    left: -125,
    width: 60,
    height: 60,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 10,
    borderRadius: 100,
    backgroundColor: '#ad6f05'
  },

  modeButton: {
    top: 15,
    left: 125,
    width: 60,
    height: 60,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 10,
    borderRadius: 100,
    backgroundColor: '#ad6f05'
  },

  docDisplay: {
    top: 25,
    left: 0,
    width: 300,
    height: 250,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 10,
    borderRadius: 25,
    backgroundColor: '#171717',
    color: '#FFFCF7',
    fontSize: 30
  },

  modeDisplay: {
    top: 75,
    left: 0,
    width: 300,
    height: 175,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 10,
    borderRadius: 25,
    backgroundColor: '#171717',
    color: '#FFFCF7',
    fontSize: 30
  },

  textWhite: {
    color: '#FFFCF7'
  },

  textAlabaster: {
    color: '#E0E2DB'
  },

  boldText: {
    fontWeight: 'bold'
  }

})