import React, {Component} from 'react';
import './App.css';

import Poster from './components/Poster'
import ShowBounty from './components/ShowBounty'
import NewBountyForm from './components/NewBountyForm';

class App extends Component {
  state = {
    bounties: [],
    current: {},
    showForm: false
  
  }

  componentDidMount() {
    this.getBounties()
  }

  getBounties = () => {
    fetch('https://subrata-bounty-hunter.herokuapp.com/')
    .then(response => {
      return response.json()
    })
    .then(bounties => {
      console.log(bounties)
      this.setState({bounties: bounties, current: {}})
    })
    .catch(error => {
      console.log('Error while fetching bounties', error)
    })
  }

  changeCurrent = (bounty) => {
    console.log('change current location just fired!')
    this.setState({
      current: bounty,
      showForm: false
    }, () => {
      console.log('set State is done'+this.state.current)
    })
  }

  toggleForm = () => {
    this.setState({showForm: !this.state.showForm})
  }

  render() {

    let posters = this.state.bounties.map((bounty, i) => {
      return (
      <Poster bounty={bounty} 
              key={i} 
              changeCurrent={this.changeCurrent}
              currentId={this.state.current._id}
              refreshBounties={this.getBounties} />)
    })


    return(
      <div className="App">
        <header className="App-header">
          <h1>Wanted Poster Bulletin Board</h1>
          <p>Reduce crime in your galaxy</p>
        </header>
        <main>
          {posters}
          <ShowBounty current={this.state.current} 
                      refreshBounties={this.getBounties} 
                      showForm={this.state.showForm} 
                      toggleForm={this.toggleForm}/>
          <NewBountyForm current={this.state.current} refreshBounties={this.getBounties} />
        </main>
      </div>
    )
  }



}

export default App;
