import React from 'react';
import SideBar from './sidebar/sidebar';
import Details from './details';
import SearchBar from './searchbar/searchbar';

// TODO: this should be supplied by the frontend
const nodes = [
    {
        "key": "country_code_1",
        "name": "country_code",
        "filePath": "this/is/the/path/to/country/code.py",
        "description": "This is the description of the country code",
        "tags": ["feature", "test"],
        "predecessors": [],
        "successors": ["dummy_1"],
    },
    {
        "key": "dummy_1",
        "name": "dummy",
        "filePath": "bla/dummy.py",
        "description": "<dummy>",
        "tags": ["test"],
        "predecessors": ["country_code_1"],
        "successors": [],
    },
]

const Catalog = () => {
    
    return <div className="d-flex">
        <SideBar/>
        <Details/>
        <SearchBar nodes={nodes}/>
    </div>
}

export default Catalog;