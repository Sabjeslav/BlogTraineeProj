import React from 'react';
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom';
import './App.sass';
import SignUpForm from './components/NewUserForm';
import Header from './components/Header';
import PageContainer from './components/PageContainer';
import PostCreation from './components/PostCreation';
import Profile from './components/Profile';
import Users from './components/Users';
import SignInForm from './components/SignInForm';

function App () {
  return (
    <BrowserRouter>
      <div className='light-theme'>
        <PageContainer>
          <Header />
          <Switch>
            <Route exact path='/'>
              <Redirect to='/users' component={Users} />
            </Route>
            <Route path='/signUp' component={SignUpForm} />
            <Route path='/users' component={Users} />
            <Route path='/newPost' component={PostCreation} />
            <Route path='/profile' component={Profile} />
            <Route path='/signIn' component={SignInForm} />
          </Switch>
        </PageContainer>
      </div>
    </BrowserRouter>
  );
}

export default App;
