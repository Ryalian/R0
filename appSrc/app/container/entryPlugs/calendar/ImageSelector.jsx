import React from "react";
import axios from "axios";
import SelectableImage from "./SelectableImage";

import ImageUploader from './ImageUploader';

export default class ImageSelector extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            uploadedImagesList: []
        }

        this.handleClose = this.handleClose.bind(this);
        this.handleSelectItem = this.handleSelectItem.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    componentDidMount() {

        axios.get('/api/getImagesList')
            .then(({data}) => {
                this.setState({
                    uploadedImagesList: data.items.map(item => {
                        return {
                            src: item,
                            isSelected: false
                        }
                    })
                })
            })
    }

    handleClose() {
        this.props.onclose()
    }

    handleSelectItem(idx) {
        let newList = [...this.state.uploadedImagesList];

        newList[idx].isSelected = !newList[idx].isSelected;
        this.setState({
            uploadedImagesList: newList
        })
    }

    handleSubmit() {
        let selectedImages = this.state.uploadedImagesList.filter(image => image.isSelected);
        console.log(selectedImages)
        this.props.onSubmit(selectedImages)
    }

    render() {
        return(
            <div className={"image-uploader"}>
                <button className="close-btn RButton-lg" onClick={this.handleClose}>x</button>
                <button className="close-btn RButton-lg" onClick={this.handleSubmit}>o</button>

                {/* Server Images List */}
                <div className="image-selected-gallery">
                    {
                        this.state.uploadedImagesList.map(
                            (image, idx) => (
                                <SelectableImage
                                    image={image}
                                    id={idx}
                                    onSelect={this.handleSelectItem}
                                    key={`image_${idx}`}
                                />
                            )
                        )
                    }
                </div>

                <ImageUploader />
            </div>
        )
    }
}