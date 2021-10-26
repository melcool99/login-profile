import Avatar from '@mui/material/Avatar'
import Button from '@mui/material/Button'
import TextField from '@mui/material/TextField'
import Box from '@mui/material/Box'
import LockOutlinedIcon from '@mui/icons-material/LockOutlined'
import Typography from '@mui/material/Typography'
import Container from '@mui/material/Container'
import { useState, useContext } from 'react'
import AuthContext from '../store/auth-context'
import { useHistory } from 'react-router'



const SignIn: React.FC = () => {
  const history  = useHistory()
  const authCtx = useContext(AuthContext)

  const [isUser, setIsUser] = useState(true)
  const [isLoading, setIsLoading] = useState(false)

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const data = new FormData(event.currentTarget)
    // eslint-disable-next-line no-console
    const email = data.get('email')
    const password = data.get('password')
    setIsLoading(true)
    let url 
    if (isUser) {
      url = 'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=[APIKEY]'
    } else {
      url = 'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=[APIKEY]'
    }

    fetch(url ,{
          method: 'POST',
          body: JSON.stringify({ email, password, returnSecureToken: true }),
          headers: {
            'Content-Type': 'application/json',
          },
        }
      ).then((res) => {
        setIsLoading(false)
        if (res.ok) {
           return res.json()
        } else {
          res.json().then((data) => {
            let errorMessage = 'Authentication failed'
            throw new Error(errorMessage)
          })
        }
      }).then((data) =>{
        const expirationTime = new Date(new Date().getTime() + (+data.expiresIn *1000))
        authCtx.login(data.idToken, expirationTime.toISOString()); history.replace('/')}).catch(err =>
        alert(err.message) )
       return 
    }
  

  return (
    <Container component='main' maxWidth='xs'>
      <Box
        sx={{
          marginTop: 8,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}>
        <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component='h1' variant='h5'>
          {isUser ? 'Sign in' : 'Sign up'}
        </Typography>
        <Box component='form' onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
          <TextField
            margin='normal'
            required
            fullWidth
            id='email'
            label='Email Address'
            name='email'
            autoComplete='email'
            autoFocus
          />
          <TextField
            margin='normal'
            required
            fullWidth
            name='password'
            label='Password'
            type='password'
            id='password'
            autoComplete='current-password'
          />
          <Button
            fullWidth
            type='submit'
            variant='contained'
            size='large'
            sx={{ mt: 3, mb: 2 }}>
            {isUser ? 'Login' : 'Create Account'}
          </Button>
         {isLoading && <p>Sending data...</p>}
          <Button
            fullWidth
            variant='outlined'
            sx={{ mt: 3, mb: 2 }}
            onClick={() => setIsUser(!isUser)}>
            {isUser ? 'Create new account' : 'Login with existing account'}
          </Button>
        </Box>
      </Box>
    </Container>
  )
}

export default SignIn
