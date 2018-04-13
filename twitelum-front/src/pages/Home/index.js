import React, { Component, Fragment } from 'react';
import Cabecalho from '../../components/Cabecalho'
import NavMenu from '../../components/NavMenu'
import Dashboard from '../../components/Dashboard'
import Widget from '../../components/Widget'
import TrendsArea from '../../components/TrendsArea'
import Tweet from '../../components/Tweet'



class Home extends Component {
  constructor(props) {
    super()

    this.state = {
      novoTweet: '',
      tweets: []
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
                          this.state.tweets.map((tweet, index) =>
                            <Tweet key={tweet + index} tweetInfo={tweet} texto={tweet.conteudo} />
                          )
                        }
                    </div>
                </Widget>
            </Dashboard>
        </div>
      </Fragment>
    );
  }
}

export default Home;
