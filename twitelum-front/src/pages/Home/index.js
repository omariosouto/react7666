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
      tweets: ['x']
    } 
    // Código triste da vida
    this.adicionaTweet = this.adicionaTweet.bind(this)
    console.log(props)
    if(!localStorage.getItem('TOKEN')) {
      props.history.push('/login')
    }
  }

  // Talk: Anjana Vakil: Learning Functional Programming with JavaScript - JSUnconf 2016
  adicionaTweet(infosDoEvento) {
    infosDoEvento.preventDefault()
    // Pegar o value do input
    const novoTweet = this.state.novoTweet

    this.setState({
      tweets: [novoTweet, ...this.state.tweets]
    })

  }

  render() {
    console.log('render disparando infinitos')
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
                        { this.state.tweets.map((tweet, index) =>
                          <Tweet key={tweet} texto={tweet} />
                        ) }
                    </div>
                </Widget>
            </Dashboard>
        </div>
      </Fragment>
    );
  }
}

export default Home;
