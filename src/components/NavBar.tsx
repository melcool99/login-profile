import React, { useContext } from 'react'
import AppBar from '@mui/material/AppBar'
import Box from '@mui/material/Box'
import Toolbar from '@mui/material/Toolbar'
import Typography from '@mui/material/Typography'
import Button from '@mui/material/Button'
import { useHistory } from 'react-router'
import AuthContext from '../store/auth-context'

const Navbar:React.FC = () => {
  const history = useHistory()
  const authCtx = useContext(AuthContext)

  return (
    <>
   <Box sx={{ flexGrow: 1 }} component='nav'>
        <AppBar position='static'>
          <Toolbar>
            <Typography component='h1' variant='h4' sx={{ flexGrow: 1 }}>
              React Auth
            </Typography>

            <Button
              color='inherit'
              sx={{ mt: 3, mr: 2, mb: 2 }}
              onClick={() => history.push('/')}>
              Home
            </Button>
            <Button
              color='inherit'
              sx={{ mt: 3, mr: 2, mb: 2 }}
              onClick={() => history.push('/profile')}>
              Profile
            </Button>
            <Button
              variant='outlined'
              color='secondary'
              onClick={() => {
                authCtx.logout()
                history.replace('/signin')
              }}
              sx={{ mt: 3, mb: 2 }}>
              Logout
            </Button>
          </Toolbar>
        </AppBar>
      </Box>
    </>
  )
}

export default Navbar
