import { CssBaseline } from '@mui/material'
import React, { useContext } from 'react'
import SignIn from './components/SignIn'
import { Switch, Route, Redirect } from 'react-router-dom'
import Profile from './components/Profile'
import HomePage from './components/HomePage'
import { Layout } from './components/Layout'
import AuthContext from './store/auth-context'
const App = () => {
  const authCtx = useContext(AuthContext)

  return (
    <Layout>
      <CssBaseline />
      <Switch>
        {!authCtx.isLoggedIn && <Route path='/signin' component={SignIn} />}
        {authCtx.isLoggedIn && <Route exact path='/' component={HomePage} />}
        {authCtx.isLoggedIn && <Route path='/profile' component={Profile} />}
        <Route path='*'>
          <Redirect to='/' />
        </Route>
      </Switch>
    </Layout>
  )
}

export default App
