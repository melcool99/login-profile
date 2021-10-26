import { Box, Button, Container, TextField, Typography } from '@mui/material'
import React, { useContext } from 'react'
import { useHistory } from 'react-router'
import AuthContext from '../store/auth-context'

const Profile: React.FC = () => {
  const history = useHistory()
  const authCtx = useContext(AuthContext)
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const data = new FormData(event.currentTarget)
    const password = data.get('newpassword')
  
    fetch(
      'https://identitytoolkit.googleapis.com/v1/accounts:update?key=[APIKEY]',
      {
        method: 'POST',
        body: JSON.stringify({
          idToken: authCtx.token,
          password,
          returnSecureToken: false,
        }),
        headers: {
          'Content-Type': 'application/json',
        },
      }
    ).then(res => {
      history.replace('/')
    })
  }

  return (
    <>
      <Container component='main' maxWidth='xs'>
        <Typography component='h1' variant='h5'>
          Your User Profile
        </Typography>
        <Typography>New Password</Typography>
        <Box component='form' onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
          <TextField
            margin='normal'
            required
            fullWidth
            
            name='newpassword'
            label='Password'
            type='password'
            id='newpassword'
          />
          <Button
            type='submit'
            fullWidth
            variant='contained'
            sx={{ mt: 3, mb: 2 }}>
            Change Password
          </Button>
        </Box>
      </Container>
    </>
  )
}

export default Profile
