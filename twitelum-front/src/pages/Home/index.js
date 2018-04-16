import React, { Component, Fragment } from 'react';
import Cabecalho from '../../components/Cabecalho'
import NavMenu from '../../components/NavMenu'
import Dashboard from '../../components/Dashboard'
import Widget from '../../components/Widget'
import TrendsArea from '../../components/TrendsArea'
import Tweet from '../../components/Tweet'
import Modal from '../../components/Modal'


class Home extends Component {
  constructor(props) {
    super()

    this.state = {
      novoTweet: '',
      tweets: [],
      tweetAtivo: {}
    } 
    // Código triste da vida
    this.adicionaTweet = this.adicionaTweet.bind(this)
  }

  componentDidMount() {
    console.log('DidMount')
    fetch(`http://localhost:3001/tweets?X-AUTH-TOKEN=${localStorage.getItem('TOKEN')}`)
      .then((respostaDoServer) => respostaDoServer.json())
      .then((tweetsDoServidor) => {
        console.log(tweetsDoServidor)
        this.setState({
          tweets: tweetsDoServidor
        })    
      })
  }

  // Talk: Anjana Vakil: Learning Functional Programming with JavaScript - JSUnconf 2016
  adicionaTweet(infosDoEvento) {    
    infosDoEvento.preventDefault()
    // Pegar o value do input
    const novoTweet = this.state.novoTweet

    if(novoTweet) {
      // Manda o texto e o TOKEN
      fetch(`http://localhost:3001/tweets?X-AUTH-TOKEN=${localStorage.getItem('TOKEN')}`,
        { method: 'POST' ,body: JSON.stringify({ conteudo: novoTweet })  })
      .then((respostaDoServer) => {
          return respostaDoServer.json()
      })
      .then((tweetProntoDoServer) => {
          console.log(tweetProntoDoServer)
          this.setState({
            tweets: [tweetProntoDoServer, ...this.state.tweets]
          })
      })
    }
  }

  removeTweet = (idDoTweet) => {
    fetch(`http://localhost:3001/tweets/${idDoTweet}?X-AUTH-TOKEN=${localStorage.getItem('TOKEN')}`, {
      method: 'DELETE'
    })
    .then((respostaDoServer) => respostaDoServer.json())
    .then((respostaPronta) => {
        const tweetsAtualizados = this
                .state.tweets.filter((tweetAtual) => tweetAtual._id !== idDoTweet)    
        this.setState({
          tweets: tweetsAtualizados,
          tweetAtivo: {}
        })
    })
  }

  abreModalParaTweet = (idDoTweetQueVaiNoModal, event) => {
    console.log('idDoTweetQueVaiNoModal', idDoTweetQueVaiNoModal)
    // Fazer alguma operação no array de tweets
    const ignoraModal = event.target.closest('.ignoraModal')
    if(!ignoraModal) {
      const tweetAtivo = this.state
                             .tweets
                            .find((tweetAtual) => tweetAtual._id === idDoTweetQueVaiNoModal )
      this.setState({
        tweetAtivo: tweetAtivo
      })
    }
  }

  fechaModal = (event) => {
    const isModal = event.target.classList.contains('modal')
    if(isModal) {
      this.setState({
        tweetAtivo: {}
      })
    }
  }

  render() {

    return (
      <Fragment>
        <Cabecalho>
            <NavMenu usuario="@omariosouto" />
        </Cabecalho>
        <div className="container">
            <Dashboard>
                <Widget>
                    <form className="novoTweet" onSubmit={ this.adicionaTweet }>
                        <div className="novoTweet__editorArea">
                            <span className={`novoTweet__status ${
                              this.state.novoTweet.length > 140
                              ? 'novoTweet__status--invalido' : ''
                            }`}>
                              {this.state.novoTweet.length}/140
                            </span>
                            <textarea
                              value={this.state.novoTweet}
                              onChange={ (event) => { this.setState({ novoTweet: event.target.value }) } }
                              className="novoTweet__editor"
                              placeholder="O que está acontecendo?"></textarea>
                        </div>
                        <button type="submit"
                                disabled={
                                  this.state.novoTweet.length > 140
                                  ? true : false
                                }
                                className="novoTweet__envia">Tweetar</button>
                    </form>
                </Widget>
                <Widget>
                    <TrendsArea />
                </Widget>
            </Dashboard>
            <Dashboard posicao="centro">
                <Widget>
                    <div className="tweetsArea">
                        { this.state.tweets.length === 0
                          ? <div>Mensagem avisando</div> : ''
                        }
                        {
                          Boolean(this.state.tweets.length) && this.state.tweets.map((tweet, index) =>
                            <Tweet 
                              key={tweet._id}
                              removeHandler={() => this.removeTweet(tweet._id)}
                              tweetInfo={tweet}
                              handleModal={(event) => this.abreModalParaTweet(tweet._id, event)}
                              texto={tweet.conteudo}/>
                          )
                        }
                    </div>
                </Widget>
            </Dashboard>
        </div>


        <Modal isAberto={this.state.tweetAtivo._id} fechaModal={this.fechaModal}>
          <Widget>
            <Tweet
              removeHandler={() => this.removeTweet(this.state.tweetAtivo._id)}
              texto={this.state.tweetAtivo.conteudo || '' }
              tweetInfo={this.state.tweetAtivo} />
          </Widget>
        </Modal>


      </Fragment>
    );
  }
}

export default Home;
