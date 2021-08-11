import React, { useEffect } from 'react';
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

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
import UserPosts from './components/UserPosts';
import PostDetails from './components/PostDetails';

import {
  USERS_ACTION_TYPES,
  POSTS_ACTION_TYPES,
  USER_ACTION_TYPES,
} from './actions/actions';

import './App.sass';

import { fetchPosts } from './services/posts.service';
import { fetchUsers } from './services/users.service';
import { fetchCurrentUser } from './services/currentUser.service';

function App (props) {
  const {
    postUsers,
    enableUsersFetching,
    disableUsersFetching,
    uploadPosts,
    enablePostsFetching,
    disablePostsFetching,
    postUser,
  } = props;
  const getUsers = async () => {
    enableUsersFetching();
    await fetchUsers().then(res => {
      postUsers(res);
      disableUsersFetching();
    });
  };
  const getPosts = async () => {
    enablePostsFetching();
    await fetchPosts().then(res => {
      uploadPosts(res);
      disablePostsFetching();
    });
  };
  const getCurrentUser = async () => {
    await fetchCurrentUser()
      .then(res => postUser(res))
      .catch(err => console.error(err));
  };
  useEffect(() => {
    getUsers();
    getPosts();
    getCurrentUser();
  }, []);
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
        </PageContainer>
      </div>
    </BrowserRouter>
  );
}

const mapStateToProps = state => state;

const mapDispatchToProps = dispatch => {
  return {
    postUsers: newUsers =>
      dispatch({ type: USERS_ACTION_TYPES.POST_USERS, newUsers }),
    enableUsersFetching: () =>
      dispatch({ type: USERS_ACTION_TYPES.ENABLE_USERS_ISFETCHING }),
    disableUsersFetching: () =>
      dispatch({ type: USERS_ACTION_TYPES.DISABLE_USERS_ISFETCHING }),

    uploadPosts: newPosts =>
      dispatch({ type: POSTS_ACTION_TYPES.UPLOAD_POSTS, newPosts }),
    enablePostsFetching: () =>
      dispatch({ type: POSTS_ACTION_TYPES.ENABLE_POSTS_ISFETCHING }),
    disablePostsFetching: () =>
      dispatch({ type: POSTS_ACTION_TYPES.DISABLE_POSTS_ISFETCHING }),

    postUser: newUser =>
      dispatch({ type: USER_ACTION_TYPES.POST_USER, newUser }),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
