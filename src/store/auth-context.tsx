import React, { createContext, useState, useEffect, useCallback } from 'react'

interface AuthContextType {
  token: string | null | undefined,
  isLoggedIn: boolean,
  login: (token: string, expirationTime:string) => void
  logout: () => void
}

const AuthContext = createContext<AuthContextType>({
  token:'',
  isLoggedIn: false,
  login: () => {},
  logout: () => {},
})

let logOutTimer: any

const calculateTime = (expirationTime:any) => {
  const currentTime = new Date().getTime()
  const adjustedTime = new Date(expirationTime).getTime()
  const remainingTime = adjustedTime - currentTime
  return remainingTime
}

const retrieveStoredToken = () => {
  const storedToken = localStorage.getItem('token')
  const storedExpTime = localStorage.getItem('expirationTime')
  const remainingTime = calculateTime(storedExpTime)
  if (remainingTime <= 36000){
    localStorage.removeItem('token')
    localStorage.removeItem('expirationTime')
    return null
  }
  return {token:storedToken, duration:remainingTime}
}

export const AuthContextProvider: React.FC = ({ children }) => {
  const tokenData = retrieveStoredToken()
  let initialToken
  if(tokenData){
     initialToken = tokenData.token

  }
  const [token, setToken] = useState(initialToken)
  const userIsLoggedIn = !!token

  const logoutHandler = useCallback(() => {
    setToken(null)
    localStorage.removeItem('token')
    localStorage.removeItem('expirationTime')
    if(logOutTimer){
      clearTimeout(logOutTimer)
    }
  },[])

  const loginHandler = (token: string, expirationTime:string) => {
    setToken(token)
    localStorage.setItem('token', token)
    localStorage.setItem('expirationTime', expirationTime)
    const remainingTime = calculateTime(expirationTime)
    logOutTimer = setTimeout(logoutHandler, remainingTime)
  }

  useEffect(()=>{if(tokenData){
    console.log(tokenData.duration)
    logOutTimer = setTimeout(logoutHandler, tokenData.duration)
  }
  },[tokenData, logoutHandler])


  const contextValue = {
    token: token,
    isLoggedIn: userIsLoggedIn,
    login: loginHandler,
    logout: logoutHandler,
  }

  return (
    <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>
  )
}

export default AuthContext