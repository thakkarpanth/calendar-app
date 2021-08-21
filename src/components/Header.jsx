import React from 'react'
import styles from './header.module.css'
import { Input, Menu, Dropdown, Checkbox } from 'antd';
import 'antd/dist/antd.css'


function Header(props) {

    const [showMenu, setShowMenu] = React.useState(false);
    const [localFilters , setLocalFilters] = React.useState([]);

    const handleTagChange = (tag) => {
        if (props.tag === tag) props.setTag('');
        else props.setTag(tag);
    }

    const handleSearch = (e) => {
        props.setSearchText(e.target.value);
    }

    const saveFilters = () => {
        props.setSeatFilter(localFilters);
        setShowMenu(false);
    }

    const clearFilters = () => {
        setLocalFilters([]);
    }

    React.useEffect(()=>{
        if(showMenu)
            setLocalFilters(props.seatFilter);
    } , [showMenu])
    const menu = (
        <Menu style={{ width: '200px' }}>
            <Checkbox.Group
                value={localFilters}
                onChange={(e) =>{
                    setLocalFilters(e);
                }}
            >
                <Menu.Item key="0" className={styles.modifiedItem}>
                    <div className={styles.menuItem}>
                        <img style={{ marginRight: '12px' }} src="icons/orangeDot.svg" alt="" />
                        <div style={{flexGrow: 1}}>Filling Fast</div>
                        <Checkbox  value={'Filling Fast'}></Checkbox>
                    </div>
                </Menu.Item>
                <Menu.Item key="1" className={styles.modifiedItem}>
                    <div className={styles.menuItem}>
                        <img style={{ marginRight: '12px' }} src="icons/blueDot.svg" alt="" />
                        <div style={{flexGrow: 1}}>Available</div>
                        <Checkbox value={'Available'}></Checkbox>
                    </div>
                </Menu.Item>
                <Menu.Item key="2" className={styles.modifiedItem}>
                    <div className={styles.menuItem}>
                        <img style={{ marginRight: '12px' }} src="icons/grayDot.svg" alt="" />
                        <div style={{flexGrow: 1}}>Block</div>
                        <Checkbox value={'Block'}></Checkbox>
                    </div>
                </Menu.Item>
            </Checkbox.Group>
            <Menu.Divider />
            <Menu.Item key="3" className={styles.modifiedItem}>
                <div className={styles.menuItem}>
                    <div onClick={clearFilters} style={{ cursor: 'pointer' }}>Clear</div>
                    <div style={{ flexGrow: 1 }}></div>
                    <div style={{ color: 'white' }} onClick={saveFilters} className={styles.saveButton}>Save</div>
                </div>
            </Menu.Item>
        </Menu>
    );

    return (
        <div className={styles.container} >
            <div className={styles.buttonsWrapper}>
                <Dropdown visible={showMenu} overlay={menu} onClick={(e) => { setShowMenu(!showMenu) }} >
                    <div className={styles.buttonActive} style={{ border: '1px solid #EAEAEA' }}>Seats</div>
                </Dropdown>
                <div style={{ marginRight: '8px', width: '1px', height: '32px', backgroundColor: '#EAEAEA' }}></div>
                <div onClick={() => handleTagChange('Design')} className={props.tag === 'Design' ? styles.buttonActive : styles.button}>Design</div>
                <div onClick={() => handleTagChange('Product Management')} className={props.tag === 'Product Management' ? styles.buttonActive : styles.button}>Product Management</div>
                <div onClick={() => handleTagChange('Mindfulness')} className={props.tag === 'Mindfulness' ? styles.buttonActive : styles.button}>Mindfulness</div>
                <div onClick={() => handleTagChange('Productivity')} className={props.tag === 'Productivity' ? styles.buttonActive : styles.button}>Productivity</div>
                <div onClick={() => handleTagChange('Mental Health')} className={props.tag === 'Mental Health' ? styles.buttonActive : styles.button}>Mental Health</div>
            </div>
            <div style={{ flexGrow: 1 }}></div>

            <div className={styles.searchWrapper}>
                <img style={{ paddingLeft: '10px' }} src="icons/searchIcon.svg" alt="" />
                <Input onChange={handleSearch} bordered={false} placeholder="Search" />
            </div>
        </div>
    )
}

export default Header
