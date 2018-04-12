import React, { Component } from 'react'
import Widget from '../../components/Widget'

import './loginPage.css'


class LoginPage extends Component {
    
    fazLogin = (event) => {
        event.preventDefault()
        const login = this.inputLogin.value
        const senha = this.inputSenha.value
        const infosDoUsuario = {
            login: login, // ES5-
            senha // ES6
        }
        fetch('http://localhost:3001/login', {
            method: 'POST',
            body: JSON.stringify(infosDoUsuario)
        })
        .then((respostaDoServer) => {
            if(!respostaDoServer.ok) {
                throw respostaDoServer
            } 
            return respostaDoServer.json()
        })
        .then((respostaPronta) => {
            console.log('TOKEN', respostaPronta.token)
            localStorage.setItem('TOKEN', respostaPronta.token)
            this.props.history.push('/')
        })
        .catch((erroQueAconteceu) => {
            erroQueAconteceu.json().then((erro) => {
                console.log('Erro', erro)
            })
        })
    }

    render() {
        console.log('teste de render')
        return (
<div className="loginPage">
    <div className="container">
        <Widget>
            <h1 className="loginPage__title">Twitelum</h1>
            <form className="loginPage__form" action="/" onSubmit={this.fazLogin } >
                <div className="loginPage__inputWrap">
                    <label className="loginPage__label" htmlFor="login">Login</label> 
                    <input
                        className="loginPage__input"
                        type="text"
                        id="login"
                        value="omariosouto"
                        ref={ (inputLoginDoDOM) => this.inputLogin = inputLoginDoDOM }
                        name="login"/>
                </div>
                <div className="loginPage__inputWrap">
                    <label className="loginPage__label" htmlFor="senha">Senha</label> 
                    <input className="loginPage__input"
                           type="password"
                           id="senha"
                           value="123456"
                           ref={ (inputSenhaDoDOM) => this.inputSenha = inputSenhaDoDOM }
                           name="senha"/>
                </div>
                {/* <div className="loginPage__errorBox">
                    Mensagem de erro!
                </div> */}
                <div className="loginPage__inputWrap">
                    <button className="loginPage__btnLogin" type="submit">
                        Logar
                    </button>
                </div>
            </form>
        </Widget>
    </div>
</div>
        )
    }
}


export default LoginPage