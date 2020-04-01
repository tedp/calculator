import React from 'react';
import './Header.scss';
import { ReactComponent as Logo } from './logo.svg';

class Header extends React.Component {

  render() {
    return (
      <div className="Header">
        <a href="https://www.equalexperts.com/" title="EE homepage">
          <Logo />
        </a>
      </div>
    );
  }
}

export default Header;
