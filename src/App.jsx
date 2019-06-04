import React, {Component} from 'react';
import './App.scss';
import {Header} from './components/header/';
import {SearchForm} from "./components/searchForm";
import {Tags} from "./components/tags";
import {Grid} from './components/grid';
import {Footer} from "./components/footer";

const items = [
    {
        title: 'Home',
        href: '#test'
    },
    {
        title: 'About',
        href: '#'
    },
    {
        title: 'Test',
        href: '#'
    },
    {
        title: 'Test',
        href: '#'
    },
    {
        title: 'Test',
        href: '#'
    },
    {
        title: 'Test',
        href: '#'
    },
];

class App extends Component {
    state = {
        tags: [],
        images: [],
        total: 0,
        totalPages: 0,
        currentPage: 1,
        searchValue: '',
        tagValue: ''
    };

    search = (searchValue) => {
        const url = `https://api.unsplash.com/search/photos?page=${this.state.currentPage}&query=${searchValue}&client_id=16766e2454ae30995948ba5b09abdbededcd6ba83fef87a22a80706efa472849`;
        fetch(url)
            .then(response => response.json())
            .then(response => {
                const totalPages = response.total_pages;
                const total = response.total;
                const images = response.results;
                const tags = this.getTags(images);
                this.setState(state => {
                    return {...state, images, totalPages, total, tags, searchValue}
                })
            })
            .catch((e) => console.log(e));
    };

    tagSearch = (tagValue) => {
        this.search(tagValue);
    };

    showMore = () => {
        const {searchValue, currentPage} = this.state;
        const url = `https://api.unsplash.com/search/photos?page=${currentPage + 1}&query=${searchValue}&client_id=16766e2454ae30995948ba5b09abdbededcd6ba83fef87a22a80706efa472849`;
        fetch(url)
            .then(response => response.json())
            .then(response => {
                const totalPages = response.total_pages;
                const total = response.total;
                const images = this.state.images.concat(response.results);
                this.setState(state => {
                    return {...state, images, totalPages, total, searchValue, currentPage: currentPage + 1}
                })
            })
            .catch((e) => console.log(e));
    };

    getTags = (images) => {
        const allTags = [];
        const tags = [];

        for (let image of images) {
            if (image.tags) {
                for (let tag of image.tags) {
                    if (allTags.indexOf(tag) === -1) {
                        allTags.push(tag);
                    }
                }
            }
        }
        while (tags.length < 10) {
            const tagIndex = this.getRandomInt(0, allTags.length - 1);
            const tagVal = allTags[tagIndex];
            if (tags.indexOf(tagVal) === -1) {
                tags.push(tagVal);
            }
        }
        return tags;
    };

    getRandomInt = (min, max) => {
        min = Math.ceil(min);
        max = Math.floor(max);
        return Math.floor(Math.random() * (max - min + 1)) + min;
    };

    render() {
        const picsTags = this.state.tags.map(tag => {
            return <Tags title={tag.title} onClick={this.tagSearch}/>
        });

        return (
            <div className="App">
                <Header menu={items}/>
                <SearchForm onSubmit={this.search}/>
                <div className="tags-section">{picsTags}</div>
                <Grid items={this.state.images}/>
                {
                    (this.state.total !== 0)
                        ? <div className="show-more-section">
                            <button className="show-more-section__btn" onClick={this.showMore}>Show more</button>
                        </div>
                        : null
                }
                <div className="total-count">Total images: {this.state.total}, Total
                    pages: {this.state.totalPages}</div>
                <Footer/>
            </div>

        );
    }
}

export default App;
