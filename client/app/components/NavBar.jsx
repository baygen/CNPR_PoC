import React from 'react';
import { Link, } from 'react-router-dom';
import style from './styles';

export default class NavigationBar extends React.Component {

  render() {
    const { location: { pathname }, computedMatch } = this.props
    // console.log('header mounted url')
    // console.log(this.props)


    return (
      <div style={style.navbar}>
        <img src={'/pics/smart_boom_gate2.png'} style={style.navbarPicture} />
        <Link style={pathname === '/list' ? style.navbarLinkActive : style.navbarLink} to='/list'>White List</Link>
        <Link style={pathname === '/recognition' ? style.navbarLinkActive : style.navbarLink} to='/recognition'>Recognition</Link>
        <Link style={pathname === '/log' ? style.navbarLinkActive : style.navbarLink} to='/log'>Log's</Link>
        <Link style={pathname === '/config' ? style.navbarLinkActive : style.navbarLink} to='/config'>Config</Link>
        <div/>
      </div>)
  }
}
