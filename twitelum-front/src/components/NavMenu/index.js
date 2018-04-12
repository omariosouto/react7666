import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import './navMenu.css'

class NavMenu extends Component {
    render() {
        return (
            <nav className="navMenu">
                <ul className="navMenu__lista">
                <li className="navMenu__item">
                    <a className="navMenu__link">
                        Bem vindo(a): <br />
                        <strong>{ this.props.usuario }</strong>
                    </a>
                </li>
                <li className="navMenu__item">
                    <a className="navMenu__link" href="">Página Inicial</a>
                </li>
                <li className="navMenu__item">
                    <a className="navMenu__link">Hashtags</a>
                </li>
                <li className="navMenu__item">
                    <Link to="/login" className="navMenu__link">Logout</Link>
                </li>
                </ul>
            </nav>
        )
    }
}

export default NavMenu