import React from 'react';
import axios from 'axios';
import { Link } from "react-router-dom";
import { getTime } from 'date-fns';

import RInput from '../../../components/RInput';

export default class CreateEvent extends React.Component {
    constructor(props) {
        super(props);

        const { startDate } = this.props;
        this.state = {
            title: '',
            time: startDate? new Date(+startDate) : new Date(),
            content: ''
        }

        this.handleTitleChange = this.handleTitleChange.bind(this);
        this.handleTimeChange = this.handleTimeChange.bind(this);
        this.handleContentChange = this.handleContentChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleTitleChange(event) {
        this.setState({
            title: event.target.value
        })
    }

    handleTimeChange(event) {
        this.setState({
            time: event.target.value
        })
    }

    handleContentChange(event) {
        this.setState({
            content: event.target.value
        })
    }

    handleSubmit() {
        this.props.onSubmit();
        
        let payload = {
            ...this.state,
            time: getTime(this.props.date) || 0
        }

        axios.post('/api/calendar/createEvent', payload)
            .then(({data}) => {
                console.log(data)
            });
    }

    componentDidMount() {
    }

    componentDidUpdate() {
    }

    render() {
        return (
            <div className="calendar-create-event">
                <div>
                    <label>Title: </label> <RInput value={this.state.title} onChange={this.handleTitleChange}/>
                </div>

                <div>
                    <label>Time: </label> <RInput value={this.state.time} onChange={this.handleTimeChange}/>
                </div>

                <div>
                    <label>Content: </label> <RInput value={this.state.content} onChange={this.handleContentChange}/>
                </div>

                <Link to="/calendar"><button>back</button></Link>
                <button onClick={this.handleSubmit}>Submit</button>
            </div>
        )
    }
}