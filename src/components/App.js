import React from 'react';
import PropTypes from 'prop-types';
import Header from './Header';
import Order from './Order';
import Inventory from './Inventory';
import sampleFishes from '../sample-fishes';
import Fish from './Fish';
import base from '../base';

class App extends React.Component {
    state = {
        fishes: {},
        order: {}
    }

    static propTypes = {
        match: PropTypes.object.isRequired
    }

    componentDidMount() {
        const { params } = this.props.match;
        const localStorageRef = localStorage.getItem(params.storeId);
        if (localStorageRef) {
            this.setState({order : JSON.parse(localStorageRef)});
        }
        this.ref = base.syncState(`${params.storeId}/fishes`, {context: this, state: 'fishes'});
    }

    componentDidUpdate() {
        localStorage.setItem(this.props.match.params.storeId, JSON.stringify(this.state.order));
    }

    componentWillUnmount() {
        base.removeBinding(this.ref);
    }
    
    addFish = (fish) => {
        const fishes = {...this.state.fishes};
        fishes[`fish${Date.now()}`] = fish;
        this.setState({fishes});
    }

    updateFish = (key, updatedFish) => {
        //1.Take copy of current state
        const fishes = this.state.fishes;
        //2.Update that state
        fishes[key] = updatedFish;
        //3.Set that to state
        this.setState({ fishes });
    }

    deleteFish = (key) => {
        //1.Take copy of current state
        const fishes = {...this.state.fishes};
        //2.Update state
        fishes[key] = null;
        //3.Set that state
        this.setState({ fishes });
    }

    loadSampleFishes = () => {
        this.setState({fishes : sampleFishes});
    }

    addToOrder = (key) => {
        //Copy state
        const order = {...this.state.order};
        //Add to order or update number in order
        order[key] = order[key] + 1 || 1;
        //Call setState to update state object
        this.setState({order});
    }
    
    removeFromOrder = (key) => {
       const order = { ...this.state.order };
       delete order[key];
       this.setState({ order });
    }
    
    render() {
        return ( 
            <div className="catch-of-the-day">
                <div className="menu">
                    <Header tagline="Fresh SeaFood Market"/>
                    <ul className="fishes">
                        {Object.keys(this.state.fishes).map(key => <Fish key={key} index={key} details={this.state.fishes[key]} addToOrder={this.addToOrder}/>)}
                    </ul>
                </div>
                <Order fishes={this.state.fishes} order={this.state.order} removeFromOrder={this.removeFromOrder}/>  
                <Inventory fishes={this.state.fishes} addFish={this.addFish} updateFish={this.updateFish} deleteFish={this.deleteFish} loadSampleFishes={this.loadSampleFishes}/>
            </div>
        );
    }
}

export default App;