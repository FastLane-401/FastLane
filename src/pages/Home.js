import React, { useState } from 'react'
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity
} from 'react-native'

const Home = (props) => {
  // Set up functions for buttons
  const [countDoc, setCountDoc] = useState(0)
  const [countMode, setCountMode] = useState(0)

  const [labelMode, setLabelMode] = useState('Command')

  const modeTextHandler = event => setLabelMode('Mindful')

  return (
        <View
            style = {styles.screen}>

            <Text
            style={styles.docDisplay} >
                <Text style={styles.boldText}>         Document{'\n\n'}</Text>
                Long document name...
            </Text>

            <Text
            style={styles.modeDisplay} >
                <Text style={styles.boldText}>{'             '}Mode{'\n\n'}</Text>
                {labelMode}
            </Text>

            <TouchableOpacity
                onPress={props.startRecognizing}
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

export default Home

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
    height: 175,
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
