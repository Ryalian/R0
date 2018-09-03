import React from "react";
import ExifOrientationImg from "react-exif-orientation-img";

export default class SelectableImage extends React.Component {
    constructor(props) {
        super(props);

        this.handleClick = this.handleClick.bind(this);
    }

    handleClick() {
        this.props.onSelect(this.props.id)
    }

    render() {
        return (
            <div className={`selectable-image ${this.props.image.isSelected? 'selected-image':''}`} onClick={this.handleClick}>
                <ExifOrientationImg src={this.props.image.src}/>
            </div>
        )
    }
}