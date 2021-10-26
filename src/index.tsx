import React from 'react'
import ReactDOM from 'react-dom'
import App from './App'
import { createTheme, ThemeProvider } from '@mui/material/styles'
import { BrowserRouter as Router } from 'react-router-dom'
import { AuthContextProvider } from './store/auth-context'


const theme = createTheme()

ReactDOM.render(
  <React.StrictMode>
    <AuthContextProvider>
      <Router>
        <ThemeProvider theme={theme}>
          <App />
        </ThemeProvider>
      </Router>
    </AuthContextProvider>
  </React.StrictMode>,
  document.getElementById('root')
)
