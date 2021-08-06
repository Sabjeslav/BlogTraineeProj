import React from 'react';
import style from './Header.module.sass';
import { NavLink } from 'react-router-dom';

function Header () {
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
            to='/signUp'
          >
            <div>Sign up</div>
          </NavLink>
          <NavLink
            className={style.link}
            activeClassName={style.activeLink}
            to='/newPost'
          >
            <div>New post</div>
          </NavLink>
        </div>
        <div className={style.profileWrapper}>
          <NavLink to='/signIn'>
            <div>Sign In</div>
          </NavLink>
          
        </div>
      </div>
    </div>
  );
}

export default Header;
