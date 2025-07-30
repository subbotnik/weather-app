import { registerRootComponent } from 'expo'
import React from 'react'
import App from './src/app'

function ExpoApp() {
  return <App />
}

registerRootComponent(ExpoApp)
export default ExpoApp
