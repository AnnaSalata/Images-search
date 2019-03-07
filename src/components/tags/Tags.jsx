import React from 'react';
import './Tags.scss';

export class Tags extends React.Component {

    onClick = (e) => {
        e.preventDefault();
        if (this.props.title) {
            this.props.onClick(this.props.title);
        }
    };

    render() {
        const id = Math.ceil(Math.random() * 10000);
        return <div className="tag" onClick={this.onClick} id={id}>
            <label htmlFor={id}>{this.props.label}</label>
            <div className="tag__content" id={id}>
                {this.props.title}
            </div>
        </div>
    }
}
