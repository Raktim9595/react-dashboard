import React, { useRef, useState, useEffect } from 'react';
import "../sass/themeMenu.scss";
import { useDispatch } from 'react-redux';
import themeAction from "../redux/actions/ThemeAction";

const mode_settings = [
  {
      id: 'light',
      name: 'Light',
      background: 'light-background',
      class: 'theme-mode-light'
  },
  {
      id: 'dark',
      name: 'Dark',
      background: 'dark-background',
      class: 'theme-mode-dark'
  }
]

const color_settings = [
  {
      id: 'blue',
      name: 'Blue',
      background: 'blue-color',
      class: 'theme-color-blue'
  },
  {
      id: 'red',
      name: 'Red',
      background: 'red-color',
      class: 'theme-color-red'
  },
  {
      id: 'cyan',
      name: 'Cyan',
      background: 'cyan-color',
      class: 'theme-color-cyan'
  },
  {
      id: 'green',
      name: 'Green',
      background: 'green-color',
      class: 'theme-color-green'
  },
  {
      id: 'orange',
      name: 'Orange',
      background: 'orange-color',
      class: 'theme-color-orange'
  },
]



function ThemeMenu() {
  const dispatch = useDispatch();
  const menu_ref = useRef(null);
  const menu_toggle_ref = useRef(null);
  const [currMode, setcurrMode] = useState("light");
  const [currColor, setcurrColor] = useState("blue");

  const clickOutsideRef = (content_ref, toggle_ref) => {
    document.addEventListener('mousedown', (e) => {
        // user click toggle
        if (toggle_ref.current && toggle_ref.current.contains(e.target)) {
            content_ref.current.classList.toggle('active')
        } else {
            // user click outside toggle and content
            if (content_ref.current && !content_ref.current.contains(e.target)) {
                content_ref.current.classList.remove('active')
            }
        }
    })
  }

  useEffect(() => {
    const themeClass = mode_settings.find(e => e.class === localStorage.getItem("themeMode", 'theme-mode-light'));
    const colorClass = color_settings.find(e => e.class === localStorage.getItem("colorMode", 'theme-mode-light'));
    // console.log(themeClass, colorClass)
    if(themeClass !== undefined) setcurrMode(themeClass.id);
    if(colorClass !== undefined) setcurrColor(colorClass.id);
  }, []);

  const setActiveMenu = () => menu_ref.current.classList.add("active");
  const closeMenu = () =>  menu_ref.current.classList.remove("active");
  clickOutsideRef(menu_ref, menu_toggle_ref);

  const setMode = mode => {
    setcurrMode(mode.id);
    localStorage.setItem("themeMode", mode.class);
    dispatch(themeAction.setMode(mode.class));
  }

  const setColor = color => {
    setcurrColor(color.id);
    localStorage.setItem("colorMode", color.class);
    dispatch(themeAction.setColor(color.class));
  }

  return (
    <div>
      <button onClick={() => setActiveMenu()} ref={menu_toggle_ref} className="dropdown__toggle">
        <i className="bx bx-palette"></i>
      </button>
      <div ref={menu_ref} className="theme-menu">
        <h4>Theme Settings</h4>
        <button onClick={() => closeMenu()} className="theme-menu__close">
          <i className="bx bx-x"></i>
        </button>
        <div className="theme-menu__select">
          <span>Choose Mode</span>
          <ul className="mode-list">
            {
              mode_settings.map((item, index) => (
                <li key={index} onClick={() => setMode(item)} >
                  <div className={`mode-list__color ${item.background} ${item.id === currMode ? 'active' : ''}`} >
                    <i className="bx bx-check" />
                  </div>
                  <p className="mode-list__name">{item.name}</p>
                </li>
              ))
            }
          </ul>
        </div>
        <div className="theme-menu__select">
          <span>Choose Color</span>
          <ul className="mode-list">
            {
              color_settings.map((item, index) => (
                <li key={index} onClick={() => setColor(item)} >
                  <div className={`mode-list__color ${item.background} ${item.id === currColor ? 'active' : ''}`}>
                    <i className="bx bx-check" />
                  </div>
                  <p className="mode-list__name">{item.name}</p>
                </li>
              ))
            }
          </ul>
        </div>
      </div>
    </div>
  )
}

export default ThemeMenu;
