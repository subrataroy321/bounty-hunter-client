import React, {Component} from 'react';


class NewBountyForm extends Component {

    state = {
        name: this.props.current.name || '',
        wantedFor: this.props.current.wantedFor || '',
        client: this.props.current.client || '',
        reward: this.props.current.reward || '',
        ship: this.props.current.ship || '',
        captured: this.props.current.captured || false,
        id: this.props.current._id || ''
    }

    submitForm = (e) => {
        e.preventDefault()
        let whichMethod = this.state.id ? 'PUT' : 'POST'

        fetch('http://localhost:8000/bounties/'+this.state.id,{
            method: whichMethod,
            body: JSON.stringify(this.state),
            headers: {
                'Content-Type': 'application/json'
            }
        })
        .then(response => response.json())
        .then(result => {
            this.setState({
                name: '',
                wantedFor: '',
                client: '',
                reward: '',
                ship: '',
                captured: false
            },() => {
                this.props.refreshBounties()
            })
        })
        .catch(error => {
            console.log('Error in fetch while submitting form:', error)
        })
    }

    storeInput = (e) => {
        if (e.target.name === 'captured') {
            this.setState({ captured: e.target.checked})
        } else {
            this.setState({ [e.target.name]: e.target.value})
        }
    }

    render() {
        return(
            <div className="bounty-form">
                <h2>{this.state.id ? 'Edit Bounty' : 'Add New Bounty'}</h2>
                <form onSubmit={this.submitForm}>
                    <div>
                        <label htmlFor="name" >Name: </label>
                        <input name="name" value={this.state.name} onChange={this.storeInput}/>
                    </div>
                    <div>
                        <label htmlFor="wantedFor" >wantedFor: </label>
                        <input name="wantedFor" value={this.state.wantedFor} onChange={this.storeInput}/>
                    </div>
                    <div>
                        <label htmlFor="client"> Client: </label>
                        <input name="client" value={this.state.client} onChange={this.storeInput}/>
                    </div>
                    <div>
                        <label htmlFor="reward" >Reward: </label>
                        <input type="number" name="reward" value={this.state.reward} onChange={this.storeInput}/>
                    </div>
                    <div>
                        <label htmlFor="ship" >Ship: </label>
                        <input name="ship" value={this.state.ship} onChange={this.storeInput}/>
                    </div>
                    <div>
                        <label htmlFor="captured" >Captured: </label>
                        <input type="checkbox" name="captured" checked={this.state.captured ? "checked" : "" } onChange={this.storeInput}/>
                    </div>
                    <input type="submit" value="Bountify!"/>
                </form>
            </div>
        )
        
    }
}

export default NewBountyForm;