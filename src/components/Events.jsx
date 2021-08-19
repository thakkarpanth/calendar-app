import React from 'react'
import styles from './events.module.css'
import moment from 'moment'


const Card = (props) => {
    return(
        <div className={styles.cardWrapper}>
            <img height="108px" width="144px"  src="icons/author1.svg" alt="" />
            <div className={styles.eventDetails}>
                <div className={styles.cardHeader}>{props.event.title}</div>
                <div className={styles.cardTimings}>{props.event.timings}</div>
                <div className={styles.attendanceBlock}>
                    <div>{props.event.attending}</div>
                    <div style={{marginLeft: '32px'}}>{props.event.seatsLeft} seats left </div>
                </div>
            </div>
        </div>
    )
}

function Events(props) {
    console.log('z1 props ' , props.filteredData);
    let groupBy = {};
    props.filteredData.map(event => {
        if(groupBy[event.date])
            groupBy[event.date].push(event);
        else {
            groupBy[event.date] = [event];
        }
    })
    console.log('z1 group by ' , groupBy);
    return (
        <div>
            {
                Object.keys(groupBy).map(key => {
                    return (
                        <>
                            <div className={styles.dateHeader}>{moment(key,'DD-MM-YYYY').format('LL')}</div>
                            {
                                groupBy[key].map(event => <Card event = {event}/>)
                            }
                        </>
                    )
                })
            }
            {/* <div className={styles.dateHeader}>Fri , 12 December</div>
            {
                props.filteredData.map(event => <Card event={event}/>)
            }
            <div className={styles.dateHeader}>Sat , 27 December</div> */}
            {/* <Card /> */}
            
        </div>
    )
}

export default Events
