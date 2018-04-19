- APIs === Regras de Negócio
- Redux === Fluxo de dados
- React === Faz a parte de view
- Container Components === Guardam as funções da view
- Presentational ``   === Só recebem props e é isso

## JavaScript
- Base de JS: https://www.caelum.com.br/curso-javascript-jquery
- Base de JS Open Source: https://www.youtube.com/watch?v=093dIOCNeIc&list=PLQCmSnNFVYnT1-oeDOSBnt164802rkegc
- Desafios de JS Bacanudos: https://javascript30.com/
- 

## Posts Gerais do Mario
- https://mariosouto.com/

## Dicas da vida:
- CSS: https://www.youtube.com/channel/UCJZv4d5rbIKd4QHMPkcABCw

## Criação de Sites
- Semantica da Web/ Composição de elementos na tela:
    - https://www.alura.com.br/curso-online-introducao-html-css
    - https://medium.com/collabcode/pare-de-chutar-e-aprenda-as-propriedades-css-de-posicionamento-603154655121

- Flexbox: https://flexboxfroggy.com/
- CSS Grid: https://cssgridgarden.com/


<div
    className="notificacaoMsg"
    onAnimationEnd={ () => this.context.store.dispatch({ type: 'REMOVE_NOTIFICACAO' }) } >
    { this.context.store.getState().notificacao }  
    </div>
