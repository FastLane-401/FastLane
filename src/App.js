/**
 * @format
 * @flow strict-local
 */

import React from 'react'
import { AuthProvider } from './contexts/AuthContext'
import { SpeechProvider } from './contexts/SpeechContext'
import Home from './pages/Home'

const App = () => {
  return (
    <AuthProvider>
      <SpeechProvider>
        <Home />
      </SpeechProvider>
    </AuthProvider>
  )
}

export default App
