import React, { Component } from "react";
import TokenService from "../../services/token-service";
import { Link } from "react-router-dom";
import AudioMenu from './AudioMenu'
import "./header.css";

class Header extends Component {

  renderLoginLink() {
    return (
      <nav>
        <Link to="/login">Login</Link> 
        <Link to="/register">Register</Link>
        <Link to="/contact">Contact</Link>
      </nav>
    );
  }
  renderHeaderLink() {
    return (
      <Link to='/'>Space Battleship</Link>
    )
  }
  renderHeaderNoLink(){
    return (
      `Space Battleship`
    )
  }
  handleLogoutClick = () => {
    this.context.handleTheme()
    TokenService.clearAuthToken()
  }
  renderLogoutLink() {
    return (
      <div>
        <nav>
          <Link onClick={this.handleLogoutClick} to="/login">
            Logout
          </Link>
        </nav>
      </div>
    );
  }
  render() {
    return (
      <div>
        <header>
          <h1>{TokenService.hasAuthToken()
            ? this.renderHeaderNoLink()
            : this.renderHeaderLink()}
          </h1>
          <AudioMenu />
          <span>
            {TokenService.hasAuthToken()
              ? this.renderLogoutLink()
              : this.renderLoginLink()}
          </span>
        </header>
      </div>
    );
  }
}
export default Header;
