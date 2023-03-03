import React from 'react';
import "../sass/sidebar.scss";
import { Link, useLocation } from "react-router-dom";

import logo from "../assets/images/logo.png";
import sidebar_items from "../assets/JsonData/sidebar_routes.json";

const SidebarItem = ({title, icon, active}) => {
  const isActive = active ? 'active': '';
  return (
    <div className="sidebar__item">
      <div className={`sidebar__item--single ${isActive}`}>
        <i className={icon}></i>
        <span>{title}</span>
      </div>
    </div>
  )
}

function Sidebar() {
  const location = useLocation().pathname;
  const i = sidebar_items.findIndex(item => item.route === location);
  return (
    <div className="sidebar">
      <div className="sidebar__logo">
        <img src={logo} alt="company logo" />
      </div>
      {sidebar_items.map((item, index) => (
        <Link key={index} to={item.route}>
          <SidebarItem title={item.display_name} icon={item.icon} active={i === index} />
        </Link>
      ))}
    </div>
  )
}

export default Sidebar;
