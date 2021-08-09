import React from 'react';
import style from './Header.module.sass';
import { NavLink } from 'react-router-dom';
import { connect } from 'react-redux';

function Header (props) {
  const { isLogged } = props;
  return (
    <div className={style.headerWrapper}>
      <div className={style.headerBody}>
        <div className={style.links}>
          <NavLink
            className={style.link}
            activeClassName={style.activeLink}
            to='/users'
          >
            <div>Users</div>
          </NavLink>
          <NavLink
            className={style.link}
            activeClassName={style.activeLink}
            to='/posts'
          >
            <div>Posts</div>
          </NavLink>
          {isLogged ? null : (
            <NavLink
              className={style.link}
              activeClassName={style.activeLink}
              to='/signUp'
            >
              <div>Sign up</div>
            </NavLink>
          )}
          {isLogged ? (
            <NavLink
              className={style.link}
              activeClassName={style.activeLink}
              to='/newPost'
            >
              <div>New post</div>
            </NavLink>
          ) : null}
        </div>
        <div className={style.profileWrapper}>
          {isLogged ? (
            <NavLink className={style.profileLink} to='/profile'>
              <div>Profile</div>
            </NavLink>
          ) : (
            <NavLink className={style.profileLink} to='/signIn'>
              <div>Sign In</div>
            </NavLink>
          )}
        </div>
      </div>
    </div>
  );
}

const mapStateToProps = state => state.user;

export default connect(mapStateToProps)(Header);
