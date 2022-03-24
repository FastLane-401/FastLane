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
  Image,
  PermissionsAndroid
} from 'react-native'


import Voice from '@react-native-voice/voice'


//Global variables
var inputs = new Array()
var session_title = "# Mindful Mode Session\n"
var mode = "mindful"
const RNFS = require('react-native-fs')
var path = RNFS.DocumentDirectoryPath + '/new_session.md'



const App = () => {
  const [isListening, setIsListening] = useState(false)
  const [results, setResults] = useState([])
  const [partialResults, setPartialResults] = useState([])
  const [error, setError] = useState()
  const [read, setRead] = useState()

  const [countDoc, setCountDoc] = useState(0)
  const [countMode, setCountMode] = useState(0)

  const [modeDisplay, setModeDisplay] = useState(mode)
  const modeDisplayHandler = event => setModeDisplay(mode)


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
    //path = RNFS.DocumentDirectoryPath + '/voicelog.md'

    if(results.value[0] == "clear session")

    {
        RNFS.writeFile(path, session_title, 'utf8')
          .then((success) => {
            console.log('Cleared session')
          })
          .catch((err) => {
            console.log('PROBLEM HERE')
            console.log(err.message)
          })
    }
    else if(results.value[0].startsWith("rename session"))
    {
        console.log('Renaming Session File Name')
        RNFS.moveFile(path, RNFS.DocumentDirectoryPath+'/'+results.value[0].slice(15)+".md")
        path = RNFS.DocumentDirectoryPath+'/'+results.value[0].slice(15)+".md"
    }
    else if(results.value[0].startsWith("rename title"))
    {
        session_title = "# "+results.value[0].slice(13)+"\n"
        console.log('Renaming Title')

        RNFS.writeFile(path, session_title, 'utf8')
          .then((success) => {
            console.log('Cleared session')
          })
          .catch((err) => {
            console.log('PROBLEM HERE')
            console.log(err.message)
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
    else if(results.value[0].startsWith("select mode"))
    {
        if(results.value[0].slice(12) == "mindful")
        {
            console.log('Mindful Mode Selected')
        }
        else if(results.value[0].slice(12) == "command")
        {
            console.log('Command Mode Selected')
        }
        else if(results.value[0].slice(12) == "editing")
        {
            console.log('Assisted Editing Mode Selected')
        }
        else
        {
            console.log('Incorrect Mode Specified')
        }

    }
    else
    {
        /* if you want text to persist in the file between button presses, use
         * appendFile() instead of writeFile(). You should also probably modify
         * the second parameter to ' ' + e.value[0] so text strings don't run
         * together between button presses. */
        inputs.push(results.value[0])
        if(inputs.length == 1)
        {
        RNFS.writeFile(path, session_title, 'utf8')
          .then((success) => {
            console.log('Cleared session')
          })
          .catch((err) => {
            console.log('PROBLEM HERE')
            console.log(err.message)
          })
        }

        RNFS.appendFile(path, '- ' +results.value[0]+'\n', 'utf8')
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
      //const path = RNFS.DocumentDirectoryPath + '/voicelog.txt'

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

  const renderMode = () => {
    if(mode == "mindful")
    {
        mode = "command"
    }
    else if(mode == "command")
    {
        mode = "editing"
    }
    else if(mode == "editing")
    {
        mode = "mindful"
    }
    else
    {
        mode = "error"
    }
  }

  return (
    <View
      style={styles.screen}>

      {/* Setting and Account Information Bar*/}
      <View
        style={styles.infoDisplay} >
        <Image
            style={styles.settingsImage}
            source={require("../img/gear-solid.png")}
        />
        <View style={styles.accountImage}></View>
      </View>

      {/* Document name Display */}
      <View
        style={styles.docDisplay} >
        <Text style={styles.docTitle}>Document{'\n'}</Text>
        <View style={styles.docLine}></View>
        <Text
        style={styles.docText}
        numberOfLines={4}>{results[0]}</Text>
      </View>

      {/* Mode Display */}
      <View
        style={styles.modeDisplay} >
        <Text style={styles.modeTitle}>Mode{'\n'}</Text>
        <View style={styles.modeLine}></View>
        <Text style={styles.modeText}>{mode}</Text>
      </View>

      {/* Mic Button */}
      <TouchableOpacity
        onPress={startRecognizing}
        style={styles.micButton} >

        <Image
            style={styles.micImage}
            source={require("../img/microphone-solid.png")}
        />
      </TouchableOpacity>

      {/* Document Button */}
      <TouchableOpacity
        onPress={() => setCountDoc(countDoc + 1)}
        style={styles.docButton} >

        <Image
            style={styles.docImage}
            source={require("../img/folder-open-solid.png")}
        />
      </TouchableOpacity>


      {/* Mode Button */}
      <TouchableOpacity
        onPress={renderMode()}
        onPress={modeDisplayHandler}

        style={styles.modeButton} >

        <Image
            style={styles.modeImage}
            source={require("../img/lightbulb-solid.png")}
        />
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

  infoDisplay: {
    top: -30,
    left: 0,
    width: 400,
    height: 60,
    padding: 10,
    backgroundColor: '#171717',
    color: '#FFFCF7',
    fontSize: 30
  },

  settingsImage: {
    top: 5,
    left: 15,
    width: 35,
    height: 35,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 10,
    borderRadius: 100,
    backgroundColor: '#171717'
  },

  accountImage: {
    top: -30,
    left: 330,
    width: 35,
    height: 35,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 10,
    borderRadius: 100,
    backgroundColor: '#ad6f05'
  },

  micButton: {
    top: 120,
    left: 0,
    width: 100,
    height: 100,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 10,
    borderRadius: 100,
    backgroundColor: '#f39900'
  },

  micImage: {
      width: 45,
      height: 60,
      justifyContent: 'center',
      alignItems: 'center',
      padding: 10,
      borderRadius: 100,
      backgroundColor: '#f39900'
    },

  docButton: {
    top: 45,
    left: -125,
    width: 60,
    height: 60,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 10,
    borderRadius: 100,
    backgroundColor: '#ad6f05'
  },

  docImage: {
    left: 2,
    width: 35,
    height: 30,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 10,
    backgroundColor: '#ad6f05'
  },

  modeButton: {
    top: -15,
    left: 125,
    width: 60,
    height: 60,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 10,
    borderRadius: 100,
    backgroundColor: '#ad6f05'
  },

  modeImage: {
    width: 25,
    height: 35,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 10,
    backgroundColor: '#ad6f05'
  },


  docDisplay: {
    top: 15,
    left: 0,
    width: 300,
    height: 250,
    alignItems: 'center',
    padding: 10,
    borderRadius: 25,
    backgroundColor: '#171717',
    color: '#FFFCF7',
    fontSize: 30
  },

  docLine: {
    top: -25,
    left: 0,
    width: 300,
    height: 5,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#2F2F2F',
    color: '#FFFCF7',
    fontSize: 30
  },

  docTitle: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#171717',
    color: '#E0E2DB',
    fontSize: 30
  },

  docText: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#171717',
    color: '#FFFCF7',
    fontSize: 25,
    fontWeight: 'bold'
  },

  modeDisplay: {
    top: 65,
    left: 0,
    width: 300,
    height: 175,
    alignItems: 'center',
    padding: 10,
    borderRadius: 25,
    backgroundColor: '#171717',
    color: '#FFFCF7',
    fontSize: 30
  },

  modeLine: {
    top: -25,
    left: 0,
    width: 300,
    height: 5,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#2F2F2F',
    color: '#FFFCF7',
    fontSize: 30
  },

  modeTitle: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#171717',
    color: '#E0E2DB',
    //fontFamily: 'OpenSans-Bold',
    fontSize: 30
  },

  modeText: {
    top: 0,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#171717',
    color: '#FFFCF7',
    fontSize: 40,
    textTransform: 'capitalize',
    fontWeight: 'bold'
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

/*
      <Text
        style={styles.modeDisplay} >
        <Text style={styles.boldText}>{'             '}Mode{'\n\n'}</Text>
        {labelMode}
        {mode}
        {'\n'}
        {modeDisplay}
      </Text>

      <TouchableOpacity
        onPress={modeTextHandler}
        onPress={renderMode()}
        onPress={modeDisplayHandler}

        style={styles.modeButton} >
        <Text
          style={styles.textAlabaster} >
          MODE
        </Text>
      </TouchableOpacity>




  const [labelMode, setLabelMode] = useState('Command')
  const modeTextHandler = event => setLabelMode('Mindful')
      <Text
        style={styles.modeDisplay} >
        <Text style={styles.modeTitle}>{'             '}Mode{'\n\n'}</Text>
        {labelMode}
        {mode}
        {'\n'}
        {modeDisplay}
        <Text style={styles.modeText}>{modeDisplay}</Text>
      </Text>
*/