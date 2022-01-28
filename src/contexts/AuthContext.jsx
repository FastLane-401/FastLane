import React, {
  createContext,
  useEffect,
  useState
} from 'react'
import { auth } from '../utils/Firebase'

const AuthContext = createContext()

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null)

  useEffect(() => {
    auth.onAuthStateChanged(setUser)
  }, [])

  console.log(user)

  return (
    <AuthContext.Provider value={{ user }}>{ children }</AuthContext.Provider>
  )
}

export { AuthContext, AuthProvider }
