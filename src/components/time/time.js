import React, {Component} from 'react';
import './style.css'

class Time extends Component  {
    constructor(props) {
        super(props);
        this.state = {
            time: new Date(),
            utc: 0,
            hours: (new Date().getUTCHours() < 10) ? `0${new Date().getUTCHours()}` : new Date().getUTCHours(),
            minutes: (new Date().getUTCMinutes() < 10) ? `0${new Date().getUTCMinutes()}` : new Date().getUTCMinutes(),
            seconds: (new Date().getUTCSeconds() < 10) ? `0${new Date().getUTCSeconds()}` : new Date().getUTCSeconds()
        }
    }
    componentDidMount() {
        this.intervalID = setInterval(() => this.tick(), 1000);
    }
    componentWillUnmount() {
        clearInterval(this.intervalID);
    }
    tick() {
        let date = new Date();
        date.setMilliseconds(this.state.utc * 60 * 60 * 1000);
        this.setState({
            time: date,
            utc: this.props.time || 0,
            hours: (this.state.time.getUTCHours() < 10) ? `0${this.state.time.getUTCHours()}` : this.state.time.getUTCHours(),
            minutes: (new Date().getUTCMinutes() < 10) ? `0${new Date().getUTCMinutes()}` : new Date().getUTCMinutes(),
            seconds: (new Date().getUTCSeconds() < 10) ? `0${new Date().getUTCSeconds()}` : new Date().getUTCSeconds()
    });
    }

    render () {
        return (
            <div className='timeModule'>
                <h3>{this.state.hours}:{this.state.minutes}:{this.state.seconds}</h3>
                <h4>{this.state.time.getUTCDate(this.utc)}, {this.state.time.toLocaleString('en', { weekday: 'long' })}</h4>
                <h4>{this.state.time.toLocaleString('en', { month: 'short' })}, {this.state.time.getUTCFullYear()}</h4>
            </div>
        )
    }
};

export default Time;