import React from 'react'
import styles from './events.module.css'
import moment from 'moment'
import { Skeleton } from 'antd'


const Card = (props) => {
    return (
        <div className={styles.cardWrapper}>
            <div style={props.event.registered ? { borderBottom: '1px solid #EAEAEA' } : {}} className={styles.cardContainer}>
                <img height="108px" width="144px" src={props.event.img} alt="" />
                <div className={styles.eventDetails}>
                    <div className={styles.cardHeader}>{props.event.title}</div>
                    <div className={styles.cardTimings}>{props.event.timings}</div>
                    {
                        props.event.registered ?
                            <div className={styles.registeredButton}>
                                REGISTERED
                            </div> :
                            <div className={styles.attendanceBlock}>
                                {props.event.attending ? <img style={{ marginRight: '8px' }} src="icons/attending.svg" alt="" /> : null}
                                <div style={{ marginRight: '32px' }}>{props.event.attending}</div>
                                {props.event.seatsLeft > 3 ? <img style={{ marginRight: '8px' }} src="icons/seats.svg" /> : <img style={{ marginRight: '8px' }} src="icons/seatsActive.svg" alt="" />}
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
    console.log('z1 props ', props.loading);
    return (
        <div>
            {
                props.loading ?
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
                        {(Object.keys(groupBy).length == 0 || (Object.keys(groupBy).length && moment(Object.keys(groupBy)[0], 'DD-MM-YYYY').format('LL') != moment(props.date, 'DD-MM-YYYY').format('LL'))) ? <div className={styles.noEvent}>No sessions scheduled for {moment(props.date, 'DD-MM-YYYY').format('LL')}</div> : null}
                        {
                            Object.keys(groupBy).map((key, index) => {
                                return (
                                    <>
                                        <div style={index == 0 ? {} : { marginTop: '36px' }} className={styles.dateHeader}>{moment(key, 'DD-MM-YYYY').format('LL')}</div>
                                        {
                                            groupBy[key].map(event => <Card event={event} key={event.id} />)
                                        }
                                    </>
                                )
                            })
                        }
                    </>
            }

        </div>
    )
}

export default Events
