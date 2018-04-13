import React, { Component } from 'react'
// Aqui fica tudo do roteamento
import { Switch, Route, Redirect } from 'react-router-dom'
import Home from './pages/Home';
import LoginPage from './pages/LoginPage'

function estaAutenticado() {
    if(localStorage.getItem('TOKEN')) {
        return true
    }
    return false
}

class PrivateRoute extends Component {
    render() {
        // const path = this.props.path
        // const component = this.props.component
        if(estaAutenticado()) {
            return (
                <Route { ...this.props } />
            )
        } else {
            return (
                <Redirect to="/login" />
            )
        }
    }
}


const Routes = () => {
    return (
        <Switch> {/*  Ele pega a URL e faz os ifs malditos */}
            <PrivateRoute path="/" exact component={Home}/>
            <Route path="/login" component={LoginPage} />
            <Route path="*" component={ () => (<div>Página 404</div>) } />
        </Switch>
    )
}
export default Routes

// export default class Routes extends Component {
//     render() {
//         return (
//             <Switch> {/*  Ele pega a URL e faz os ifs malditos */}
//                 <Route path="/" exact component={Home}/>
//                 <Route path="/login" component={LoginPage} />
//                 <Route path="*" component={ () => (<div>Página 404</div>) } />
//             </Switch>
//         )
//     }
// }
