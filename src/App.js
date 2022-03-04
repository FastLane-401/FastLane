/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, { useState } from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
  Button,
  TouchableOpacity,
  TouchableHighlight,
} from 'react-native';



/* Set up color palette for dark-mode and light-mode */
    //Color pallet for sections
/*

const Section = ({children, title}) => {
  const isDarkMode = useColorScheme() === 'dark';
  return (
    <View style={styles.sectionContainer}>
      <Text
        style={[styles.sectionTitle, {color: isDarkMode ? '#eee' : '#333'}]}>
        {title}
      </Text>
      <Text
        style={[
          styles.sectionDescription,
          {color: isDarkMode ? '#eee' : '#333'},
        ]}>
        {children}
      </Text>
    </View>
  );
};

const App = () => {
  const isDarkMode = useColorScheme() === 'dark';

  const backgroundStyle = {
    backgroundColor: isDarkMode ? '#000' : '#fff',
  };

  return (
    <SafeAreaView style={backgroundStyle}>
      <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />
      <ScrollView
        contentInsetAdjustmentBehavior="automatic"
        style={backgroundStyle}>
        <View
          style={{
            backgroundColor: isDarkMode ? '#000' : '#fff',
          }}>
          <Section title="Step 1">
            Edit <Text style={styles.highlight}>App.js</Text> to change this
            screen and then come back to see your edits.
          </Section>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};





const styles = StyleSheet.create({
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
  },
  highlight: {
    fontWeight: '700',
  },
});

export default App;

*/


/*
const HelloWorldApp = () =>
{
    const [count, setCount] = useState(0);

    return (
        <View
            style = {styles.screen}
        >

            <Text>Hello, world!</Text>
            <Text>You clicked {count} times</Text>
            <Button
                onPress={() => setCount(count + 1)}
                title="I am a Button"
            />

            <TouchableOpacity
                onPress={() => setCount(count - 1)}
                style={styles.largeButton}
            >
                <Text
                    style={styles.textWhite}
                >
                    TO button?
                </Text>
            </TouchableOpacity>
        </View>


    );
};

export default HelloWorldApp

*/

const FastLaneApp = () =>
{
    //Set up functions for buttons
    const [countMic, setCountMic] = useState(0);
    const [countDoc, setCountDoc] = useState(0);
    const [countMode, setCountMode] = useState(0);

    return (
        <View
            style = {styles.screen}>


            <Text style={styles.textAlabaster} >
                Mic button clicked {countMic} times</Text>
            <Text style={styles.textAlabaster} >
                Doc button clicked {countDoc} times</Text>
            <Text style={styles.textAlabaster} >
                Mode button clicked {countMode} times</Text>

            <TouchableOpacity
                onPress={() => setCountMic(countMic + 1)}
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
                style={styles.modeButton} >
                <Text
                    style={styles.textAlabaster} >
                    MODE
                </Text>
            </TouchableOpacity>


        </View>


    );
};

export default FastLaneApp

const styles = StyleSheet.create({

    screen: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#2F2F2F',
      },

    micButton: {
        top: 300,
        left: 0,
        width: 100,
        height: 100,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 10,
        borderRadius: 100,
        backgroundColor: '#f39900',
    },

    docButton: {
        top: 225,
        left: -125,
        width: 60,
        height: 60,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 10,
        borderRadius: 100,
        backgroundColor: '#ad6f05',
    },

    modeButton: {
        top: 165,
        left: 125,
        width: 60,
        height: 60,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 10,
        borderRadius: 100,
        backgroundColor: '#ad6f05',
    },

    textWhite: {
        color: "#FFFCF7"
    },

    textAlabaster: {
        color: "#E0E2DB"
    }

})

