import React from 'react'
import styles from './header.module.css'
import { Input, Menu, Dropdown } from 'antd';
import 'antd/dist/antd.css'


function Header(props) {

    const [showMenu , setShowMenu] = React.useState(false);
    const handleTagChange = (tag) => {
        if (props.tag === tag) props.setTag(null);
        else props.setTag(tag);
    }

    const handleSearch = (e) => {
        props.setSearchText(e.target.value);
    }

    const saveFilters = () => {
        setShowMenu(false);
    }

    const menu = (
        <Menu style={{ width: '200px' }}>
            <Menu.Item key="0" className={styles.modifiedItem}>
                <div className={styles.menuItem}>
                    <img style={{marginRight: '12px'}} src="icons/orangeDot.svg" alt="" />
                    <div>Filling Fast</div>
                    {/* <Checkbox style={{ padding: '.5rem' }}  value={"Filling Fast"}>
                  <div style={{ marginLeft: '0.5rem' }}>{item.label}</div>
                </Checkbox> */}
                </div>
            </Menu.Item>
            <Menu.Item key="1" className={styles.modifiedItem}>
                <div className={styles.menuItem}>
                    <img style={{marginRight: '12px'}} src="icons/blueDot.svg" alt="" />
                    <div >Available</div>
                </div>
            </Menu.Item>
            <Menu.Item key="2" className={styles.modifiedItem}>
                <div className={styles.menuItem}>
                    <img style={{marginRight: '12px'}} src="icons/grayDot.svg" alt="" />
                    <div>Block</div>
                </div>
            </Menu.Item>
            <Menu.Divider />
            <Menu.Item key="3" className={styles.modifiedItem}>
                <div className={styles.menuItem}>
                    <div style={{cursor: 'pointer'}}>Clear</div>
                    <div style={{flexGrow : 1}}></div>
                    <div style={{color: 'white'}} onClick={saveFilters} className={styles.saveButton}>Save</div>
                </div>
            </Menu.Item>
        </Menu>
    );

    return (
        <div className={styles.container} >
            <div  className={styles.buttonsWrapper}>
                <Dropdown  visible={showMenu} overlay={menu} onClick={(e)=>{setShowMenu(!showMenu)}} >
                    <div className={styles.buttonActive} style={{ border: '1px solid #EAEAEA'}}>Seats</div>
                </Dropdown>
                {/* <Popover
                    content={renderFilterOptions()}
                    trigger="click"
                    overlayInnerStyle={{ maxHeight: '500px', overflow: 'auto', borderRadius: '8px' }}
                    visible={showEdit}
                    onVisibleChange={handleShowEdit}
                >
                    <div className={styles.buttonActive} style={{ border: '1px solid #EAEAEA'}}>Seats</div>
                </Popover> */}
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
                <Input onChange={handleSearch} bordered={false} placeholder="search" />
            </div>
            {/* <Input.Search placeholder="Search"  style={{ width: 240 }} /> */}
        </div>
    )
}

export default Header
