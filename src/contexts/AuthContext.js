import { GoogleSignin } from '@react-native-google-signin/google-signin'
import auth from '@react-native-firebase/auth'
import React, {
  createContext,
  useState,
  useEffect
} from 'react'
import { processColor } from 'react-native'

const AuthContext = createContext()
GoogleSignin.configure({
  webClientId: '1029380188507-3hq5hda1p1n25sumkpuakjskv76sc067.apps.googleusercontent.com'
})

const AuthProvider = ({ children }) => {
  const [loading, setLoading] = useState(false)
  const [user, setUser] = useState()

  useEffect(() => {
    auth().onAuthStateChanged(setUser)
  }, [])

  const authenticated = !!user

  const SignIn = async () => {
    try {
      const { idToken } = await GoogleSignin.signIn()
      const googleCredential = auth.GoogleAuthProvider.credential(idToken)
      const credentials = await auth().signInWithCredential(googleCredential)

      if (!credentials) return

      setLoading(true)
      setUser(credentials)
    } catch (e) {
      console.error(e)
    } finally {
      setLoading(false)
    }
  }

  const SignOut = async () => {
    try {
      await GoogleSignin.signOut()
      setUser(null)
      auth().signOut()
    } catch (e) {
      console.error(e)
    }
  }

  return (
    <AuthContext.Provider value={{
      user,
      loading,
      authenticated,
      SignIn,
      SignOut
    }}
    >
      { children }
    </AuthContext.Provider>
  )
}

export { AuthContext, AuthProvider }
