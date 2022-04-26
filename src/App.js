/**
 * @format
 * @flow strict-local
 */

import React from 'react'
import { AuthProvider } from './contexts/AuthContext'
import { SpeechProvider } from './contexts/SpeechContext'
import { GDriveProvider } from './contexts/GDriveContext'
import Home from './pages/Home'

const App = () => {
  return (
    <AuthProvider>
      <GDriveProvider>
        <SpeechProvider>
          <Home />
        </SpeechProvider>
      </GDriveProvider>
    </AuthProvider>
  )
}

export default App
