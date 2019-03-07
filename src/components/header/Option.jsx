import React from 'react';
import './Option.scss';

export const Option = ({href, title}) => {
    return <li className="option">
        <a href={href} className="option__link">
            <span>{title}</span>
        </a>
    </li>;
};