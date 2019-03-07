import React from 'react';
import './Grid.scss';
import {GridItem} from './GridItem'

export const Grid = ({items}) => {
    return <div className="grid">
        {items.map(item => <GridItem key={item.id} imgUrl={item.urls.regular} likes={item.likes}
                                     userName={item.user.name}/>)}
    </div>
};