import React, { useContext } from 'react'
import {
  StyleSheet,
  Text,
  View,
  Image,
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

        {/* Document name Display */}
        <Text
          style={styles.docDisplay} >
          <Text style={styles.boldText}>         Document{'\n\n'}</Text>
          {props.results[0]}
        </Text>

        {/* Mode Display */}
        <Text
          style={styles.modeDisplay} >
          <Text style={styles.boldText}>{'             '}Mode{'\n\n'}</Text>
          {props.labelMode}
        </Text>

        {/* Mic Button */}
        <TouchableOpacity
          onPress={props.startRecognizing}
          style={styles.micButton} >

          <Image
            style={styles.micImage}
            source={require("../../img/microphone-solid.png")}
          />

        </TouchableOpacity>

        {/* Document Button */}
        <TouchableOpacity
          onPress={() => props.setCountDoc(props.countDoc + 1)}
          style={styles.docButton} >

          <Image
            style={styles.docImage}
            source={require("../../img/folder-open-solid.png")}
          />

        </TouchableOpacity>

        {/* Mode Button */}
        <TouchableOpacity
          onPress={props.modeTextHandler}
          style={styles.modeButton} >

          <Image
            style={styles.modeImage}
            source={require("../../img/lightbulb-solid.png")}
          />

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

  modeImage: {
    width: 25,
    height: 35,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 10,
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
