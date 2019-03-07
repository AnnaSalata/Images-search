import React from 'react';
import {Option} from "./Option";
import './Header.scss';
import logo from '../../assets/images/white-camera-logo-png-1.png'

export class Header extends React.Component {
    state = {
        isExpand: false
    };

    toggle = () => {
        console.log('Toggle!!');
        this.setState({isExpand: !this.state.isExpand})
    };

    render() {
        const menuItems = this.props
            .menu.map(item => <Option {...item}/>);
        let className = "global-nav ";
        if (this.state.isExpand) {
            className += 'global-nav_expand'
        }
        return <nav className={className}>
            <div className="global-nav__controls controls">
                <div className="controls__close" onClick={this.toggle}>Menu</div>
                <div className="controls__logo"><img className="controls__logo" src={logo} alt=""/></div>
            </div>
            <ul className="global-nav__options">
                {menuItems}
            </ul>
        </nav>
    }
}
