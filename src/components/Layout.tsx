import React from 'react'
import Navbar from './NavBar'
import AuthContext from '../store/auth-context'
import { useContext } from 'react'
export const Layout:React.FC = ({children}) => {
 const authCtx = useContext(AuthContext)
  return (
    <>
     {authCtx.isLoggedIn && <Navbar />}
      <main>{children}</main>
    </>
  )
}
