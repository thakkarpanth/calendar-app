import React from 'react'
import styles from './events.module.css'
import moment from 'moment'
import { Skeleton, Spin } from 'antd'


const Card = (props) => {
    return (
        <div className={styles.cardWrapper}>
            <div style={props.event.registered ? { borderBottom: '1px solid #EAEAEA' } : {}} className={styles.cardContainer}>
                <img height="108px" width="144px" src={props.event.img} alt="author" />
                <div className={styles.eventDetails}>
                    <div className={styles.cardHeader}>{props.event.title}</div>
                    <div className={styles.cardTimings}>{props.event.timings} • {props.event.duration}</div>
                    {
                        props.event.registered ?
                            <div className={styles.registeredButton}>
                                REGISTERED
                            </div> :
                            <div className={styles.attendanceBlock}>
                                {props.event.attending ? <img style={{ marginRight: '8px' }} src="icons/attending.svg" alt="attendance icon" /> : null}
                                <div style={{ marginRight: '32px' }}>{props.event.attending}</div>
                                {props.event.seatsLeft > 3 ? <img style={{ marginRight: '8px' }} src="icons/seats.svg" alt="seats icon" /> : <img style={{ marginRight: '8px' }} src="icons/seatsActive.svg" alt="seats icon" />}
                                <div>{props.event.seatsLeft} seats left </div>
                            </div>
                    }
                </div>
            </div>
        </div>
    )
}

function Events(props) {
    let groupBy = {};
    props.filteredData.map(event => {
        if (groupBy[event.date])
            groupBy[event.date].push(event);
        else {
            groupBy[event.date] = [event];
        }
    })
    let flag = false;
    if (Object.keys(groupBy).length === 0) flag = true;
    const observer = React.useRef();
    const lastEventElement = React.useCallback(node => {
        if (props.loading) return;
        if (observer.current) observer.current.disconnect();
        observer.current = new IntersectionObserver(entries => {
            if (entries[0].isIntersecting && (props.filteredData.length < props.count)) {
                props.setPage(props.filteredData.length / 5);
            }
        })
        if (node) observer.current.observe(node);
    }, [props.loading, props.filteredData.length])

    return (
        <div>
            {
                props.loading && props.page === 0 ?
                    <>
                        <Skeleton.Input style={{ width: 200, height: 15 }} />
                        <div style={{ display: 'flex', alignItems: 'center', marginTop: '24px' }}>
                            <Skeleton.Input style={{ width: 200, height: 200, marginRight: '24px' }} />
                            <Skeleton />
                        </div>
                        <div style={{ margin: '40px 0' }}></div>
                        <Skeleton.Input style={{ width: 200, height: 15 }} />
                        <div style={{ display: 'flex', alignItems: 'center', marginTop: '24px' }}>
                            <Skeleton.Input style={{ width: 200, height: 200, marginRight: '24px' }} />
                            <Skeleton />
                        </div>
                        <div style={{ margin: '40px 0' }}></div>
                        <Skeleton.Input style={{ width: 200, height: 15 }} />
                        <div style={{ display: 'flex', alignItems: 'center', marginTop: '24px' }}>
                            <Skeleton.Input style={{ width: 200, height: 200, marginRight: '24px' }} />
                            <Skeleton />
                        </div>
                    </> :
                    <>
                        {
                            (Object.keys(groupBy).length === 0 || (Object.keys(groupBy).length && moment(Object.keys(groupBy)[0], 'DD-MM-YYYY').format('LL') !== moment(props.date, 'DD-MM-YYYY').format('LL'))) ?
                                <div className={styles.noEvent}>No sessions scheduled for  {moment(props.date, 'DD-MM-YYYY').format('dddd')}, <br />{moment(props.date, 'DD-MM-YYYY').format('LL').split(',')[0]} {flag ? 'onwards' : ''}</div> 
                                : null
                        }
                        {
                            Object.keys(groupBy).map((key, index) => {
                                return (
                                    <>
                                        <div style={index === 0 ? {} : { marginTop: '48px' }} className={styles.dateHeader}>{moment(key, 'DD-MM-YYYY').format('ddd') + ', '}{moment(key, 'DD-MM-YYYY').format('LL').split(',')[0]}</div>
                                        {
                                            groupBy[key].map((event, eventIndex) => {
                                                if (groupBy[key].length === eventIndex + 1 && Object.keys(groupBy).length === index + 1) {
                                                    return <div ref={lastEventElement}><Card event={event} key={event.id} /></div>
                                                }
                                                return <div><Card event={event} key={event.id} /></div>
                                            })
                                        }
                                    </>
                                )
                            })
                        }
                    </>
            }
            {props.loading && props.page > 0 ? <Spin /> : null}

        </div>
    )
}

export default Events
