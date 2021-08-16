import React, { useEffect } from "react";
import { BrowserRouter, Redirect, Route, Switch } from "react-router-dom";
import { connect } from "react-redux";

import SignUpPage from "./pages/SignUpPage";
import Header from "./components/Header";
import PageWrapper from "./components/PageWrapper";
import PostCreation from "./components/PostCreation";
import CurrentUserProfilePage from "./pages/CurrentUserProfilePage";
import UsersPage from "./pages/UsersPage";
import SignInForm from "./components/SignInForm";
import Forbidden from "./components/Forbidden";
import ProtectedRoute from "./components/ProtectedRoute";
import PostsPage from "./pages/PostsPage";
import UserProfile from "./components/Profile";
import UserPostsPage from "./pages/UserPostsPage";
import PostDetails from "./components/PostDetails";

import {
  POSTS_ACTION_TYPES,
  USER_ACTION_TYPES,
  USERS_ACTION_TYPES,
} from "./redux/actions/actions";

import "./App.sass";

import { fetchPosts } from "./services/posts.service";
import { fetchUsers } from "./services/usersService";
import { fetchCurrentUser } from "./services/currentUser.service";

function App(props) {
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
    await fetchUsers().then((res) => {
      postUsers(res);
      disableUsersFetching();
    });
  };
  const getPosts = async () => {
    enablePostsFetching();
    await fetchPosts().then((res) => {
      uploadPosts(res);
      disablePostsFetching();
    });
  };
  const getCurrentUser = async () => {
    await fetchCurrentUser()
      .then((res) => postUser(res))
      .catch((err) => console.error(err));
  };
  useEffect(() => {
    if (localStorage.token) getCurrentUser();
    getUsers();
    getPosts();
  }, []);
  return (
    <BrowserRouter>
      <div className="light-theme">
        <PageWrapper>
          <Header />
          <Switch>
            <Route exact path="/">
              <Redirect to="/users" component={UsersPage} />
            </Route>
            <Route path="/signUp" component={SignUpPage} />
            <Route exact path="/users" component={UsersPage} />
            <Route exact path="/users/:id" component={UserProfile} />
            <ProtectedRoute path="/newPost" component={PostCreation} />
            <ProtectedRoute
              path="/profile"
              component={CurrentUserProfilePage}
            />
            <Route path="/signIn" component={SignInForm} />
            <Route exact path="/forbidden" component={Forbidden} />
            <Route exact path="/posts" component={PostsPage} />
            <Route exact path="/posts/:id" component={PostDetails} />
            <Route path="/userposts" component={UserPostsPage} />
          </Switch>
        </PageWrapper>
      </div>
    </BrowserRouter>
  );
}

const mapStateToProps = (state) => state;

const mapDispatchToProps = (dispatch) => {
  return {
    postUsers: (newUsers) =>
      dispatch({ type: USERS_ACTION_TYPES.POST_USERS, newUsers }),
    enableUsersFetching: () =>
      dispatch({ type: USERS_ACTION_TYPES.ENABLE_USERS_ISFETCHING }),
    disableUsersFetching: () =>
      dispatch({ type: USERS_ACTION_TYPES.DISABLE_USERS_ISFETCHING }),

    uploadPosts: (newPosts) =>
      dispatch({ type: POSTS_ACTION_TYPES.UPLOAD_POSTS, newPosts }),
    enablePostsFetching: () =>
      dispatch({ type: POSTS_ACTION_TYPES.ENABLE_POSTS_ISFETCHING }),
    disablePostsFetching: () =>
      dispatch({ type: POSTS_ACTION_TYPES.DISABLE_POSTS_ISFETCHING }),

    postUser: (newUser) =>
      dispatch({ type: USER_ACTION_TYPES.POST_USER, newUser }),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
