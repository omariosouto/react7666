import Tweet from '../components/Tweet'
import { connect } from 'react-redux'
import * as TweetsAPI from '../apis/TweetsAPI'

// Mapeia as funções para propriedades no Presentational Component
const mapDispatchToProps = (dispatch, propsRecebidas) => {
    return {
        removeHandler: () => {
            dispatch(TweetsAPI.remove(propsRecebidas.tweetInfo._id))
        },
        handleLike: () => {
            dispatch(TweetsAPI.like(propsRecebidas.tweetInfo._id))
        }
    }
}

const TweetPadraoContainer = connect(null, mapDispatchToProps)(Tweet)

export default TweetPadraoContainer



// # Connect na mão sem ajuda da lib
// class TweetPadrao extends Component {
//     removeHandler () { store.dispatch(TweetsAPI.remove()) }      
//     render() {
//         return (
//             <Tweet removeHandler={ removeHandler } { ...this.props } />
//         )
//     }
// }

/// Exemplo de função que retorna função
// function calculadora(numero1, numero2) {
//     return function (numero3) {
//         return numero1 + numero2 + numero3
//     }
// }
// calculadora(2,3)(4)

