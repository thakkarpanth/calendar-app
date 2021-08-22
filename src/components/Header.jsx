import React from 'react'
import styles from './header.module.css'
import FilterButtons from './FilterButtons';
import Search from './Search';


function Header(props) {

    return (
        <div className={styles.container} >
            <FilterButtons seatFilter={props.seatFilter} setSeatFilter={props.setSeatFilter} tag={props.tag} setTag={props.setTag}/>
            <div style={{ flexGrow: 1 }}></div>
            <Search setSearchText={props.setSearchText} />
        </div>
    )
}

export default Header
