import React from 'react';
import "../sass/topnav.scss";
import Dropdown from './Dropdown';
import notifications from "../assets/JsonData/notification.json";
import { Link } from 'react-router-dom';
import user_image from "../assets/images/tuat.png";
import userMenu from "../assets/JsonData/user_menus.json";
import ThemeMenu from './ThemeMenu';

const curr_user = {
  display_name: "Raktim",
  image: user_image,
};

const renderUser = user => (
  <div className="nav__right__user">
    <div className="nav__right__user--image">
      <img src={user.image} alt={user.title} />
    </div>
    <p className="nav__right__user--name">
      {user.display_name}
    </p>
  </div>
)

const renderItems = (item, index) => (
  <div key={index} className="notification__container">
    <i className={item.icon} />
    <span>{item.content}</span>
  </div>
)

function Topnav() {
  return (
    <div className="nav__container">
      <div className="nav__search--box">
        <input type="text" name="search" />
        <i className="bx bx-search"></i>
      </div>
      <div className="nav__right">
        <div className="nav__right--item">
          <Dropdown 
            customToggle={() => renderUser(curr_user)}
            contentData={userMenu}
            renderItems={(item,index) => renderItems(item,index)}
          />
        </div>
        <div className="nav__right--item">
          <Dropdown icon="bx bx-bell" contentData={notifications} badge={12} renderItems={(item, index) => renderItems(item, index)} renderFooter={() => <Link to="/">View All</Link>} />
        </div>
        <div className="nav__right--item">
          <ThemeMenu />
        </div>
      </div>
    </div>
  )
}

export default Topnav;
