import React from 'react';
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom';
import './App.sass';
import AuthForm from './components/AuthForm';
import Header from './components/Header';
import Users from './components/Users';

function App () {
  return (
    <BrowserRouter>
      <div className='light-theme'>
        <Header />
        <Switch>
          <Route exact path='/'>
            <Redirect to='/login' component={AuthForm} />
          </Route>
          <Route path='/login' component={AuthForm} />
          <Route path='/users' component={Users} />
        </Switch>
      </div>
    </BrowserRouter>
  );
}

export default App;
