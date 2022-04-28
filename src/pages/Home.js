import React, { useContext, useState } from 'react'
import {
  StyleSheet,
  Text,
  View,
  Image,
  Modal,
  FlatList,
  TouchableOpacity,
  TextInput
} from 'react-native'
import { AuthContext } from '../contexts/AuthContext'
import { SpeechContext } from '../contexts/SpeechContext'
import { GDriveContext } from '../contexts/GDriveContext'

const Home = () => {
  const { user, SignIn, SignOut, getToken } = useContext(AuthContext)
  const { micPressed, results, labelMode, modeTextHandler, filename, changeFilename } = useContext(SpeechContext)
  const { files, listDriveFiles } = useContext(GDriveContext)

  const [modalVisible, setModalVisible] = useState(false)
  const [modalText, setModalText] = useState(false)
  const [text, setText] = useState('')

  const Item = ({ title, onPress }) => (

  <View style={styles.docListButtonsView}>
  <TouchableOpacity
    style={styles.docListButtons}
    onPress={onPress}
    >
    <Text style={styles.docListButtonsText} numberOfLines={1}>{title}</Text>
  </TouchableOpacity>
  </View>
  )

  const renderItem = ({ item }) => (
    <Item
        title={item.name}
        onPress={() => handlePress(item.name)}
    />
  )

  const handlePress = (filename) => {
    changeFilename(filename)
    setModalVisible(false)
  }

  return (
      <View
        style={styles.screen}>

      {/* Document List Popup */}
      <View>
        <Modal
                animationType="slide"
                transparent={true}
                visible={modalVisible}
                onRequestClose={() => {
                  setModalVisible(!modalVisible)
                }}
              >
              <View style={styles.screen} >

                    <View paddingBottom={15}/>

                    <View height={60}>
                    <TouchableOpacity
                        onPress={() => setModalVisible(false)}
                        style={styles.docListFileButton} >

                        <Image
                            style={styles.docImage}
                            source={require('../../img/folder-open-solid.png')}
                        />
                    </TouchableOpacity>

                    <TouchableOpacity
                        onPress={() => { setModalVisible(false); setModalText(true) }}
                        style={styles.docListNewButton} >

                        <Text style={styles.docListNewText}>+</Text>
                    </TouchableOpacity>
                    </View>

                    <View paddingBottom={15}/>

                    <FlatList
                            data={files}
                            keyExtractor={item => item.id}
                            renderItem={renderItem}
                          />

              </View>

        </Modal>
      </View>

      {/* New Document Popup */}
      <View>
        <Modal
          transparent={true}
          visible={modalText}
          onRequestClose={() => {
            setModalText(!modalText)
          }}
        >
          <View style={styles.screen}>
            <View style={styles.docListNewBorder}>
            <TextInput
              style={styles.docListNewInput}
              autoFocus={true}
              placeholder='Enter Document Name'
              onChangeText={(newText) => setText(newText)}
              value={text}
              // eslint-disable-next-line no-unused-expressions
              onSubmitEditing={() => { (changeFilename(text), setModalText(false), setText('')) }}
            />
            </View>

            <TouchableOpacity
              onPress={() => { setModalText(false) }}
              style={styles.docListNewButtonExit} >

              <Text style={styles.docListNewExit}>X</Text>
            </TouchableOpacity>



          </View>
        </Modal>
      </View>

      {/* Setting and Account Information Bar */}
      <View
        style={styles.infoDisplay} >
        <Image
            style={styles.settingsImage}
            source={require('../../img/gear-solid.png')}
        />

        {
            user
              ? <TouchableOpacity
                    style={styles.authButton}
                    onPress={SignOut}>
                    <Text
                        styles={styles.textWhite}>
                            {user.givenName}
                    </Text>
                  </TouchableOpacity>
              : <TouchableOpacity
                    style={styles.authButton}
                    onPress={SignIn}>
                    <Text
                        styles={styles.textWhite}>
                            SignIn
                    </Text>
                  </TouchableOpacity>
        }

      </View>

        {/* Document name Display */}
        <View style={styles.docDisplay} >
            <Text
                style={styles.docTitle}>
                    {filename}{'\n'}
            </Text>
            <View style={styles.docLine}></View>
            <Text
                style={styles.docText}
                numberOfLines={4}>
                    {results[0]}
            </Text>
        </View>

        {/* Mode Display */}
        <View style={styles.modeDisplay} >
            <Text style={styles.modeTitle}>
                Mode{'\n'}
            </Text>
            <View style={styles.modeLine}></View>
            <Text style={styles.modeText}>
                {labelMode}
            </Text>
        </View>

        {/* Mic Button */}
        <TouchableOpacity
          onPress={micPressed}
          style={styles.micButton} >

          <Image
            style={styles.micImage}
            source={require('../../img/microphone-solid.png')}
          />

        </TouchableOpacity>

        {/* Document Button */}
        <TouchableOpacity
          onPress={() => { listDriveFiles(); setModalVisible(true) }}

          style={styles.docButton} >

          <Image
            style={styles.docImage}
            source={require('../../img/folder-open-solid.png')}
          />

        </TouchableOpacity>

        {/* Mode Button */}
        <TouchableOpacity
          onPress={modeTextHandler}
          style={styles.modeButton} >

          <Image
            style={styles.modeImage}
            source={require('../../img/lightbulb-solid.png')}
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

  authButton: {
    top: -30,
    left: 310,
    width: 60,
    height: 35,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 5,
    borderRadius: 20,
    color: '#E0E2DB',
    backgroundColor: '#ad6f05'
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
    // fontFamily: 'OpenSans-Bold',
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
  },

  docListButtonsView: {
    backgroundColor: '#2F2F2F',
    paddingTop: 2,
    paddingBottom: 2
  },

  docListButtons: {
    backgroundColor: '#171717',
    color: '#FFFCF7',
    borderRadius: 20,
    width: 300,
    fontSize: 10,
    paddingTop: 10,
    paddingBottom: 10
  },

  docListButtonsText: {
    color: '#FFFCF7',
    fontSize: 20,
    fontWeight: 'bold',
    paddingLeft: 10,
    paddingRight: 10
  },

  docListFileButton: {
    left: -125,
    width: 60,
    height: 60,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 10,
    borderRadius: 100,
    backgroundColor: '#ad6f05'
  },

  docListNewButton: {
    left: 125,
    top: -60,
    width: 60,
    height: 60,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 0,
    borderRadius: 100,
    backgroundColor: '#ad6f05'
  },

  docListNewText: {
    top: -5,
    justifyContent: 'center',
    alignItems: 'center',
    color: '#E0E2DB',
    fontSize: 50,
    textTransform: 'capitalize',
    fontWeight: 'bold'
  },


  docListNewButtonExit: {
    left: 0,
    top: -50,
    width: 60,
    height: 60,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 0,
    borderRadius: 100,
    backgroundColor: '#ad6f05'
  },

  docListNewExit: {
  top: -5,
  justifyContent: 'center',
  alignItems: 'center',
  color: '#E0E2DB',
  fontSize: 50,
  textTransform: 'capitalize',
  fontWeight: 'bold'
  },

  docListNewInput: {
  top: 0,
  justifyContent: 'center',
  alignItems: 'center',
  color: '#E0E2DB',
  fontSize: 20,
  textTransform: 'capitalize',
  fontWeight: 'bold'
  },

  docListNewBorder: {
    backgroundColor: '#171717',
    color: '#FFFCF7',
    top: -100,
    borderRadius: 20,
    width: 300,
    fontSize: 10,
    paddingTop: 10,
    paddingLeft: 10,
    paddingRight: 10,
    paddingBottom: 10
  }

})
