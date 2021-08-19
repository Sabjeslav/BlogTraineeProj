import React from "react";
import { BrowserRouter, Redirect, Route, Switch } from "react-router-dom";

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
import PostDetails from "./components/PostDetails";

import "./App.sass";

function App() {
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
          </Switch>
        </PageWrapper>
      </div>
    </BrowserRouter>
  );
}

export default App;
