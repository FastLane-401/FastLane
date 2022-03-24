import React, { useContext } from 'react'
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity
} from 'react-native'
import { AuthContext } from '../contexts/AuthContext'

const Home = (props) => {
  const { user, SignIn, SignOut } = useContext(AuthContext)
  console.log({ user })
  return (
      <View
        style={styles.screen}>
        {
          user
            ? <TouchableOpacity style={styles.authButton} onPress={SignOut}><Text styles={styles.textWhite}>{user.displayName}</Text></TouchableOpacity>
            : <TouchableOpacity style={styles.authButton} onPress={SignIn}><Text styles={styles.textWhite}>SignIn</Text></TouchableOpacity>
        }
        <Text
          style={styles.docDisplay} >
          <Text style={styles.boldText}>         Document{'\n\n'}</Text>
          {props.results[0]}
        </Text>

        <Text
          style={styles.modeDisplay} >
          <Text style={styles.boldText}>{'             '}Mode{'\n\n'}</Text>
          {props.labelMode}
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
          onPress={() => props.setCountDoc(props.countDoc + 1)}
          style={styles.docButton} >
          <Text
            style={styles.textAlabaster} >
            DOC
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={props.modeTextHandler}
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

  authButton: {
    top: -25,
    right: -125,
    alignItems: 'flex-end',
    padding: 5
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
