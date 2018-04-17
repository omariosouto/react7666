// import { createStore } from 'redux'

const createStore = (tweetsReducer) => {
    let state;
    const subscribers = []

    const dispatch = (action) => {
        state = tweetsReducer(state, action)
        subscribers.forEach( (funcao) => funcao() )
    }

    const subscribe = (funcao) => {
        subscribers.push(funcao)
    }

    dispatch({ type: 'acao vazia inicial da porra toda' })

    return {
        getState: () => {
            return state
        },
        dispatch,
        subscribe
    }
}


function tweetsReducer(estadoInicial = [], action = {}) {
    console.log(action)
    // action = { type: 'CARREGA_TWEETS', tweets: tweetsDoServidor }
    if(action.type === 'CARREGA_TWEETS') {
        const novoEstado = action.tweets
        return novoEstado
    }

    return estadoInicial
}

const store = createStore(tweetsReducer)
console.log(store.getState())

window.store = store