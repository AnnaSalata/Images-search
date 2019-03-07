import React from 'react';
import './GridItem.scss';
import like from "../../assets/images/heart.png";

export class GridItem extends React.Component {
    imgRef = React.createRef();
    divRef = React.createRef();
    state = {
        clientHeight: 0
    };

    onImageLoad = () => {
        const {clientHeight} = this.imgRef.current;
        this.setState(state => ({...state, clientHeight}))
    };

    componentDidMount() {
        console.log(this.imgRef.current.clientHeight);
        this.imgRef.current.addEventListener('load', this.onImageLoad);
    }

    componentWillUnmount() {
        this.imgRef.current.removeEventListener('load', this.onImageLoad);
    }

    calcSpans = () => {
        const spans = Math.ceil(this.state.clientHeight / 10);
        return `span ${spans}`;
    };

    render() {
        const {imgUrl, likes, userName} = this.props;
        return <div style={{gridRowEnd: this.calcSpans()}} ref={this.divRef} className="grid-item">
            <img ref={this.imgRef} src={imgUrl} className="grid-item__img" alt=""/>
            <div className="grid-item__likes">
                <img src={like} className="grid-item__likes__img"/>
                {likes}
            </div>
            <div className="grid-item__username">
                {userName}
            </div>
        </div>

    }
}