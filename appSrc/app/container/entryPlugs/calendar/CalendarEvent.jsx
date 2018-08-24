import React from "react";
import axios from "axios";
import queryString from "query-string";
import { getTime } from "date-fns";
import { Link } from "react-router-dom";
import { getFormattedDate } from "../../../util";

import RInput from '../../../components/RInput';
import DatePicker from "./DatePicker";
import ImageUploader from "./ImageUploader";
import config from "./config";

export default class CalendarEvent extends React.Component {
    constructor(props) {
        super(props);

        this.loadATFields = this.loadATFields.bind(this);
        this.loadLCL = this.loadLCL.bind(this);
        this.handleTitleChange = this.handleTitleChange.bind(this);
        this.handleContentChange = this.handleContentChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);

        this.currentPath = this.props.match.url;

        let {startDate, endDate} = queryString.parse(this.props.location.search);
        // if there's startDay, set endDate to startDate
        endDate = endDate || startDate;
        this.state = {
            title: "",
            startDate: startDate? new Date(+startDate) : new Date(),
            endDate:  endDate? new Date(+endDate) : new Date(),
            content: "",
            modifyStartDay: false,
            modifyEndDay: false
        }
    }

    componentDidMount() {
        this.loadATFields();
        this.loadLCL();
    }

    componentDidUpdate(prevProps, prevState) {
        if(this.props !== prevProps || this.state !== prevState) {
            this.loadATFields();
            this.loadLCL();
        }
    }

    loadATFields() {
        let backBtn = (
            <Link to={`${this.currentPath}`}>
                <button className="rail-trigger">Back</button>
            </Link>
            );
        let submitBtn = (
            <button className="rail-trigger" onClick={this.handleSubmit}>Submit</button>
        )

        let ATFields = [submitBtn, backBtn];
        this.props.pushAppTask({
            type: 'UPDATE_APP_ACTION',
            content: [...ATFields].map(atfield => {
                return {
                    plugName: config.name,
                    content: atfield
                }
            })
        });
    }

    loadLCL() {
        this.props.pushAppTask({
            type: 'SET_LCL',
            content: [
                (<span>
                    <div>From:</div>
                    <div onClick={()=>{ this.setState({modifyStartDay: true})}}>{`${getFormattedDate(this.state.startDate)}`}</div>
                </span>),
                (<span>
                    <div>To:</div>
                    <div onClick={()=>{ this.setState({modifyEndDay: true})}}>{`${getFormattedDate(this.state.endDate)}`}</div>
                </span>)
            ]
        });
    }

    handleTitleChange(event) {
        this.setState({
            title: event.target.value
        })
    }

    handleContentChange(event) {
        this.setState({
            content: event.target.value
        })
    }

    handleSubmit() {
        let payload = {
            ...this.state,
            time: getTime(this.state.startDate) || 0
        }

        axios.post('/api/calendar/createEvent', payload)
            .then(({data}) => {
                console.log(data)
            });

        this.props.history.push({
            pathname: `/calendar`
        });
    }

    render() {

        return (
            <div className="calendar-create-event">
                {this.state.modifyStartDay
                && <DatePicker 
                    onSelect={(date)=> {
                        this.setState({
                            modifyStartDay:false,
                            modifyEndDay:false,
                            startDate: date
                            })
                        }
                    }
                    selectedDay={this.state.startDate}
                />
                }
                {this.state.modifyEndDay
                && <DatePicker 
                    onSelect={(date)=> {
                        this.setState({
                            modifyEndDay:false,
                            modifyStartDay:false,
                            endDate: date
                            })
                        }
                    }
                    selectedDay={this.state.endDate}
                />
                }

                <RInput value={this.state.title} inputLabel={"Title"} onChange={this.handleTitleChange}/>
                <RInput value={this.state.content} inputLabel={"Content"} onChange={this.handleContentChange}/>

                <ImageUploader />
            </div>
        )
    }
}