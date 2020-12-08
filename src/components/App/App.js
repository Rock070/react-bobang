import './App.css';
import HomePage from '../../pages/HomePage'
import LoginPage from '../../pages/LoginPage'
import SinglePage from '../../pages/SinglePage'
import ListPage from '../../pages/ListPage'
import PostPage from '../../pages/PostPage'
import AboutPage from '../../pages/AboutPage'
import RegisterPage from '../../pages/RegisterPage'
import Header from '../Header'
import { useState, useLayoutEffect } from 'react';
import styled from 'styled-components';
import {
  HashRouter as Router,
  Switch,
  Route,
} from "react-router-dom";
import { AuthContext } from '../../contexts'
import { getMe } from '../../WebAPI';

const Root = styled.div``

function App() {
  const [user, setUser] = useState(null)

  useLayoutEffect(() => {
    getMe().then(res => {
      if(res.ok) {
        setUser(res.data)
      }
    })
  }, [])
  
  return(
    <AuthContext.Provider value={{ user, setUser}}>
      <Root>
        <Router>
          <Header />
          <Switch>
            <Route exact path="/">
              <HomePage /> 
            </Route>
            <Route path="/about">
              <AboutPage />
            </Route>
            <Route path="/list-post">
              <ListPage />
            </Route>
            <Route path="/login">
              <LoginPage />
            </Route>
            <Route path="/posts/:id">
              <SinglePage />
            </Route>
            <Route path="/new-post">
              <PostPage />
            </Route>
            <Route path="/register">
              <RegisterPage />
            </Route>
          </Switch>
        </Router>
      </Root>
    </AuthContext.Provider>
  )}


export default App;