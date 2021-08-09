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
import { Provider } from 'react-redux';
import currentUserStore from './store/currentUser.store';
import Forbidden from './components/Forbidden';
import ProtectedRoute from './components/ProtectedRoute';

function App () {
  return (
    <BrowserRouter>
      <div className='light-theme'>
        <PageContainer>
          <Provider store={currentUserStore}>
            <Header />
            <Switch>
              <Route exact path='/'>
                <Redirect to='/users' component={Users} />
              </Route>
              <Route path='/signUp' component={SignUpForm} />
              <Route path='/users' component={Users} />
              <ProtectedRoute path='/newPost' component={PostCreation} />
              <ProtectedRoute path='/profile' component={Profile} />
              <Route path='/signIn' component={SignInForm} />
              <Route exact path='/forbidden' component={Forbidden} />
            </Switch>
          </Provider>
        </PageContainer>
      </div>
    </BrowserRouter>
  );
}

export default App;
