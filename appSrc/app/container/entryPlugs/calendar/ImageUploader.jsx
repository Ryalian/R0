import React from "react";
import axios from "axios";
import ExifOrientationImg from "react-exif-orientation-img";

export default class ImageUploader extends React.Component {
    constructor(props) {
        super(props);

        this.handleSelect = this.handleSelect.bind(this);
        this.handleSave = this.handleSave.bind(this);

        this.state = {
            uploadImagesList: [],
            uploadedList: [],
            selectedList: []
        };
    }

    componentDidMount() {
        axios.get('/api/getImagesList')
            .then(({data}) => {
                this.setState({
                    uploadedList: data.items
                })
            })
    }

    handleSelect(event) {
        let imagesList = Array.from(event.target.files);

        this.setState({
            uploadImagesList: imagesList,
        })
    }

    handleSave() {
        let imageData = new FormData();
        // this.state.imagesList.forEach()
        imageData.append('file', this.state.uploadImagesList[0], this.state.uploadImagesList[0].name)
        
        axios.post(`/api/uploadFile`, imageData)
            .then(({data}) => {
                this.setState({
                    selectedList: [...this.state.selectedList, data.file],
                    uploadImagesList: []
                })
                console.log(data)
            })
    }

    render() {
        return(
            <div className={"image-uploader"}>
                {/* Server Images List */}
                <div className="image-selected-gallery">
                    {
                        this.state.uploadedList.map(
                            (image, idx) => <ExifOrientationImg src={image} key={`image_${idx}`}/>
                        )
                    }
                </div>
                {/* Uploaded images list */}
                <div className="image-selected-gallery">
                    {
                        this.state.selectedList.map(
                            (image, idx) => <ExifOrientationImg src={image} key={`image_${idx}`}/>
                        )
                    }
                </div>
                {/* Upload image button */}
                {this.state.uploadImagesList.length? <button onClick={this.handleSave}>Save</button> : null}
                <label htmlFor="upload-input">
                    <span>Select Upload Image</span>
                </label>

                {/* Uploading images list  */}
                <input type="file" id="upload-input" multiple accept='image/*' onChange={this.handleSelect}/>
                <div className="image-upload-gallery">
                    {
                        this.state.uploadImagesList.map( file => URL.createObjectURL(file) ).map(
                            (image, idx) => <ExifOrientationImg src={image} key={`image_${idx}`}/>
                        )
                    }
                </div>
            </div>
        )
    }
}