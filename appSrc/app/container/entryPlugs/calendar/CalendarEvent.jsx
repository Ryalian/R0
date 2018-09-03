import React from "react";
import axios from "axios";
import queryString from "query-string";
import ExifOrientationImg from "react-exif-orientation-img";
import { getTime } from "date-fns";
import { Link } from "react-router-dom";
import { getFormattedDate } from "../../../util";

import RInput from '../../../components/RInput';
import RTextArea from '../../../components/RTextArea';
import DatePicker from "./DatePicker";
import ImageSelector from "./ImageSelector";
import config from "./config";


const DISPLAY_CONTENT_FORM = 'DISPLAY_CONTENT_FORM',
    DISPLAY_CONTENT_SELECT_IMAGE = 'DISPLAY_CONTENT_SELECT_IMAGE',
    DISPLAY_CONTENT_START_DATE = 'DISPLAY_CONTENT_START_DATE',
    DISPLAY_CONTENT_END_DATE = 'DISPLAY_CONTENT_END_DATE';

export default class CalendarEvent extends React.Component {
    constructor(props) {
        super(props);

        this.loadATFields = this.loadATFields.bind(this);
        this.loadLCL = this.loadLCL.bind(this);
        this.handleTitleChange = this.handleTitleChange.bind(this);
        this.handleDescriptionChange = this.handleDescriptionChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.loadEvent = this.loadEvent.bind(this);
        this.renderForm = this.renderForm.bind(this);
        this.renderImagePicker = this.renderImagePicker.bind(this);
        this.renderDatePicker = this.renderDatePicker.bind(this);
        this.renderContent = this.renderContent.bind(this);

        this.currentPath = this.props.match.url;

        let query = queryString.parse(this.props.location.search);

        let {startDate, endDate} = query;
        // if there's startDay, set endDate to startDate
        endDate = endDate || startDate;
        this.state = {
            title: "",
            startDate: startDate? new Date(+startDate) : new Date(),
            endDate:  endDate? new Date(+endDate) : new Date(),
            description: "",
            displayContent: DISPLAY_CONTENT_FORM,
            modifyStartDay: false,
            modifyEndDay: false,
            selectedImages: [],
            id: null,
            query
        }
    }

    componentDidMount() {
        this.loadATFields();
        this.loadLCL();
        if(this.state.query.eventId) {
            this.loadEvent();
        }
    }

    componentDidUpdate(prevProps, prevState) {
        if(this.props !== prevProps || this.state !== prevState) {
            this.loadATFields();
            this.loadLCL();
        }
    }

    loadEvent() {
        axios.get('/api/calendar')
            .then(({data}) => {
                let selectedEvent = data
                                    .events
                                    .find(event => event.id === +this.state.query.eventId);
                this.setState({
                    ...selectedEvent
                })
            })
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
                (<React.Fragment>
                    <div>From:</div>
                    <div onClick={()=>{ this.setState({displayContent: DISPLAY_CONTENT_START_DATE})}}>
                        {`${getFormattedDate(this.state.startDate)}`}
                    </div>
                </React.Fragment>),
                (<React.Fragment>
                    <div>To:</div>
                    <div onClick={()=>{ this.setState({displayContent: DISPLAY_CONTENT_END_DATE})}}>
                        {`${getFormattedDate(this.state.endDate)}`}
                    </div>
                </React.Fragment>)
            ]
        });
    }

    renderForm() {
        //TODO: Use div
        return (
            <React.Fragment>
                <RInput value={this.state.title} inputLabel={"Title"} onChange={this.handleTitleChange}/>
                <RTextArea value={this.state.description} inputLabel={"Description"} onChange={this.handleDescriptionChange}/>

                {this.state.selectedImages.map((image, idx) => <ExifOrientationImg key={idx} src={image.src}/>)}
                <button
                    className={"RButton-lg"}
                    onClick={()=>{this.setState({displayContent: DISPLAY_CONTENT_SELECT_IMAGE})}}>
                    +
                </button>
            </React.Fragment>
        )
    }

    renderImagePicker() {
        return (<ImageUploader />)
    }

    renderDatePicker(selectedPicker) {
        let handleSelect = date => {
            this.setState({
                displayContent: DISPLAY_CONTENT_FORM,
                [selectedPicker]: date
            });
        }
        return (
            <DatePicker
                selectedDay={this.state[selectedPicker]}
                onSelect={handleSelect}
            />)
    }

    renderContent() {
        switch (this.state.displayContent) {
            case DISPLAY_CONTENT_FORM:
                return this.renderForm();

            case DISPLAY_CONTENT_START_DATE:
                return this.renderDatePicker('startDate');

            case DISPLAY_CONTENT_END_DATE:
                return this.renderDatePicker('endDate');

            case DISPLAY_CONTENT_SELECT_IMAGE:
                return <ImageSelector
                            onclose={()=> this.setState({displayContent: DISPLAY_CONTENT_FORM})}
                            onSubmit={(imagesList) => this.setState({selectedImages: imagesList})}
                            />;

            default:
                return this.renderForm();
        }
    }

    handleTitleChange(event) {
        this.setState({
            title: event.target.value
        })
    }

    handleDescriptionChange(event) {
        this.setState({
            description: event.target.value
        })
    }

    handleSubmit() {
        const { startDate, endDate } = this.state;
        let payload = {
            ...this.state,
            startDate: startDate? getTime(startDate) : new Date(),
            endDate:  endDate? getTime(endDate)  : new Date(),
            id: Math.random() * 100000000 >> 0
        }

        axios.post('/api/calendar/configEvent', payload)
            .then(({data}) => {
                console.log(data)
            });

        this.props.history.push({
            pathname: `/calendar`
        });
    }

    render() {

        return (
            <div className="calendar-config-event">
                { this.renderContent() }
            </div>
        )
    }
}