export const carrega = () => {
    return (dispatch) => {
        fetch(`http://localhost:3001/tweets?X-AUTH-TOKEN=${localStorage.getItem('TOKEN')}`)
            .then((respostaDoServer) => respostaDoServer.json())
            .then((tweetsDoServidor) => {
                dispatch({ type: 'CARREGA_TWEETS', tweets: tweetsDoServidor })
            })
    }
}
