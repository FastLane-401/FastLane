/* eslint-disable react-hooks/exhaustive-deps */
import { GoogleSignin } from '@react-native-google-signin/google-signin'
import auth from '@react-native-firebase/auth'
import React, {
  createContext,
  useState,
  useEffect
} from 'react'

const AuthContext = createContext()
GoogleSignin.configure({
  scopes: [
    'https://www.googleapis.com/auth/drive',
    'https://www.googleapis.com/auth/drive.appdata'
  ],
  webClientId: '1029380188507-3hq5hda1p1n25sumkpuakjskv76sc067.apps.googleusercontent.com'
})

const AuthProvider = ({ children }) => {
  const [loading, setLoading] = useState(true)
  const [user, setUser] = useState()

  useEffect(() => {
    console.log('Effect called')
    getUserInfo()
  }, [])

  const SignIn = async () => {
    console.log('Signing in')
    try {
      setLoading(true)
      const userInfo = await GoogleSignin.signIn()
      setUser(userInfo.user)
    } catch (e) {
      console.error(e)
    } finally {
      setLoading(false)
    }
  }

  const SignOut = async () => {
    console.log('Signing out')
    try {
      setLoading(true)
      await GoogleSignin.signOut()
      setUser(null)
    } catch (e) {
      console.error(e)
    } finally {
      setLoading(false)
    }
  }

  const getUserInfo = async () => {
    console.log('Getting user info')
    try {
      setLoading(true)
      const userInfo = await GoogleSignin.signInSilently()
      setUser(userInfo.user)
    } catch (e) {
      console.error(e)
    } finally {
      setLoading(false)
    }
  }

  return (
    <AuthContext.Provider value={{
      user,
      loading,
      SignIn,
      SignOut
    }}
    >
      { children }
    </AuthContext.Provider>
  )
}

export { AuthContext, AuthProvider }
