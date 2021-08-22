import React from 'react'
import {Input} from 'antd';
import debounce from "lodash.debounce";
import 'antd/dist/antd.css'
import styles from './search.module.css'

function Search(props) {

    const debouncedSearch =
        debounce(e => props.setSearchText(e.target.value), 500);

    return (
        <div className={styles.searchWrapper}>
            <img style={{ paddingLeft: '10px' }} src="icons/searchIcon.svg" alt="" />
            <Input onChange={debouncedSearch} bordered={false} placeholder="Search" />
        </div>
    )
}

export default Search
