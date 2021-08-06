import React from 'react';
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom';
import './App.sass';
import AuthForm from './components/AuthForm';
import Header from './components/Header';
import PageContainer from './components/PageContainer';
import PostCreation from './components/PostCreation';
import Profile from './components/Profile';
import Users from './components/Users';

function App () {
  return (
    <BrowserRouter>
      <div className='light-theme'>
        <PageContainer>
          <Header />
          <Switch>
            <Route exact path='/'>
              <Redirect to='/login' component={AuthForm} />
            </Route>
            <Route path='/login' component={AuthForm} />
            <Route path='/users' component={Users} />
            <Route path='/newPost' component={PostCreation} />
            <Route path='/profile' component={Profile} />
          </Switch>
        </PageContainer>
      </div>
    </BrowserRouter>
  );
}

export default App;
