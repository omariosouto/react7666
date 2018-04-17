import { createStore, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'

function tweetsReducer(estadoInicial = [], action = {}) {
    console.log(action)
    // action = { type: 'CARREGA_TWEETS', tweets: tweetsDoServidor }
    if(action.type === 'CARREGA_TWEETS') {
        const novoEstado = action.tweets
        return novoEstado
    }

    return estadoInicial
}

const store = createStore(
        tweetsReducer,
        applyMiddleware(
            thunk
        )
    )

export default store