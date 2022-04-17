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
import Tts from 'react-native-tts'

// Global variables
const inputs = []
let sessionTitle = '# Mindful Mode Session\n'
const modes = ['command', 'mindful', 'editing']
const RNFS = require('react-native-fs')
let path = RNFS.DocumentDirectoryPath + '/new_session.md'

const App = () => {
  const [isListening, setIsListening] = useState(false)
  const [results, setResults] = useState([])
  const [partialResults, setPartialResults] = useState([])
  const [error, setError] = useState()
  const [read, setRead] = useState()

  const [countDoc, setCountDoc] = useState(0)
  const [countMode, setCountMode] = useState(0)
  const [labelMode, setLabelMode] = useState(modes[0])

  const modeTextHandler = () => {
    labelMode === modes[0]
      ? setLabelMode(modes[1])
      : labelMode === modes[1]
        ? setLabelMode(modes[2])
        : setLabelMode(modes[0])
  }

  const requestRecordPermission = async () => {
    await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.RECORD_AUDIO
    )
  }

  const onStart = () => {
    console.log('Starting Listening')
    setIsListening(true)
  }

  const onEnd = () => {
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
    //path = RNFS.DocumentDirectoryPath + '/voicelog.md'

    if(results.value[0] == "clear session")

    {
        RNFS.writeFile(path, session_title, 'utf8')
          .then((success) => {
            console.log('Cleared session')
            Tts.speak('Current session cleared.')
          })
          .catch((err) => {
            console.log('PROBLEM HERE')
            console.log(err.message)
            Tts.speak('Error clearing session.')
          })
    }
    else if(results.value[0].startsWith("rename session"))
    {
        newName = results.value[0].slice(15).split(' ').join('_')
        console.log('Renaming Session File Name')
        RNFS.moveFile(path, RNFS.DocumentDirectoryPath+'/'+newName+".md")
        path = RNFS.DocumentDirectoryPath+'/'+newName+".md"
        Tts.speak('Current session renamed to ' + results.value[0].slice(15))
    }
    else if(results.value[0].startsWith("rename title"))
    {
        session_title = "# "+results.value[0].slice(13)+"\n"
        console.log('Renaming Title')

        RNFS.writeFile(path, session_title, 'utf8')
          .then((success) => {
            console.log('Cleared session')
            Tts.speak('Current session title renamed to ' + results.value[0].slice(13))
          })
          .catch((err) => {
            console.log('PROBLEM HERE')
            console.log(err.message)
            Tts.speak('Error renaming session title.')
          })
        for(let i = 0; i < inputs.length; i++)
        {
          RNFS.appendFile(path, '- ' +inputs[i]+'\n', 'utf8')
            .then((success) => {
              console.log('FILE WRITTEN: ' + path)
              inputs.push(results.value[0])
            })
            .catch((err) => {
              console.log('PROBLEM HERE')
              console.log(err.message)
            })
        }
    }
    else if (results.value[0].startsWith("select mode")) {
      if (results.value[0].slice(12) == "mindful") {
        console.log('Mindful Mode Selected')
        setLabelMode("Mindful")
        Tts.speak('Mindful Mode Selected')
      }
      else if (results.value[0].slice(12) == "command") {
        console.log('Command Mode Selected')
        setLabelMode("Command")
        Tts.speak('Command Mode Selected')
      }
      else if (results.value[0].slice(12) == "editing") {
        console.log('Assisted Editing Mode Selected')
        setLabelMode("Assisted Editing")
        Tts.speak('Assisted Editing Mode Selected')
      }
      else {
        console.log('Incorrect Mode Specified')
        Tts.speak('Incorrect Mode Specified')
      }
    }

    else if (results.value[0].startsWith("playback session"))
      ttsFilePlayback(results.value[0].slice(17))
    else if (results.value[0].startsWith("play back session"))
      ttsFilePlayback(results.value[0].slice(18))
    else if (results.value[0] == ("playback") || results.value[0] == ("play back"))
      ttsPlayback()
    else {
        /* if you want text to persist in the file between button presses, use
         * appendFile() instead of writeFile(). You should also probably modify
         * the second parameter to ' ' + e.value[0] so text strings don't run
         * together between button presses. */
      inputs.push(results.value[0])
      if (inputs.length === 1) {
        RNFS.writeFile(path, sessionTitle, 'utf8')
          .then((success) => {
            console.log('Cleared session')
          })
          .catch((err) => {
            console.log('PROBLEM HERE')
            console.log(err.message)
          })
      }

      RNFS.appendFile(path, '- ' + results.value[0] + '\n', 'utf8')
        .then((success) => {
          console.log('FILE WRITTEN: ' + path)
          inputs.push(results.value[0])
        })
        .catch((err) => {
          console.log('PROBLEM HERE')
          console.log(err.message)
        })
    }
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
      // const path = RNFS.DocumentDirectoryPath + '/voicelog.txt'

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

  //Event for TTS playback from current session
  const ttsPlayback = async() =>
  {
    RNFS.readFile(path, 'utf8').then((data) =>
    {
        console.log('SESSION PLAYBACK: ' + path)
        Tts.speak(data)
    })
    .catch((error) =>
    {
        console.log(error.message)
        Tts.speak("Unexpected error on playback of current session.")
    })
  }

  //Event for TTS playback from voice session file
  const ttsFilePlayback = async(fileName) =>
  {
    filePath = RNFS.DocumentDirectoryPath + '/' + fileName.split(' ').join('_') + '.md'
    RNFS.readFile(filePath, 'utf8').then((data) =>
    {
        console.log('FILE PLAYBACK: ' + filePath)
        Tts.speak(data)
    })
    .catch((error) =>
    {
        console.log(error.message)
        Tts.speak("Unable to find session file.")
    })
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
