import React from 'react';
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom';

import SignUpForm from './components/SignUpForm';
import Header from './components/Header';
import PageContainer from './components/PageContainer';
import PostCreation from './components/PostCreation';
import CurrentUserProfile from './components/CurrentUserProfile';
import Users from './components/Users';
import SignInForm from './components/SignInForm';
import Forbidden from './components/Forbidden';
import ProtectedRoute from './components/ProtectedRoute';
import Posts from './components/Posts';
import UserProfile from './components/UserProfile';

import { Provider } from 'react-redux';
import store from './store/store';

import './App.sass';
import UserPosts from './components/UserPosts';
import Spinner from './components/Spinner';
import PostDetails from './components/PostDetails';

function App () {
  return (
    <BrowserRouter>
      <div className='light-theme'>
        <PageContainer>
          <Provider store={store}>
            <Header />
            <Switch>
              <Route exact path='/'>
                <Redirect to='/users' component={Users} />
              </Route>
              <Route path='/signUp' component={SignUpForm} />
              <Route exact path='/users' component={Users} />
              <Route exact path='/users/:id' component={UserProfile} />
              <ProtectedRoute path='/newPost' component={PostCreation} />
              <ProtectedRoute path='/profile' component={CurrentUserProfile} />
              <Route path='/signIn' component={SignInForm} />
              <Route exact path='/forbidden' component={Forbidden} />
              <Route exact path='/posts' component={Posts} />
              <Route exact path='/posts/:id' component={PostDetails} />
              <Route path='/userposts' component={UserPosts} />
            </Switch>
          </Provider>
        </PageContainer>
      </div>
    </BrowserRouter>
  );
}

export default App;
