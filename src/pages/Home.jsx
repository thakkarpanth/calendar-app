import React from 'react'
import 'antd/dist/antd.css'
import styles from './home.module.css'
import Header from '../components/Header'
import Events from '../components/Events'
import Calendar from 'react-calendar';
import './Calendar.css';
import moment from 'moment'
import 'react-perfect-scrollbar/dist/css/styles.css';
import PerfectScrollbar from 'react-perfect-scrollbar'


function Home() {
    const [tag, setTag] = React.useState(null);
    const [searchText, setSearchText] = React.useState('');
    const [seatFilter, setSeatFilter] = React.useState([]);
    const [filteredData, setFilteredData] = React.useState([]);
    const [date, setDate] = React.useState(new Date());
    const [eventDates, setEventDates] = React.useState([]);
    const [loading , setLoading] = React.useState(false);
    const [data , setData] = React.useState([]);

    const fetchEvents = async () => {
        try{
            setLoading(true);
            const response = await fetch(`http://localhost:8080/api/events?search=${searchText}`);
            const events  = (await response.json()).data;
            setData(events || []);
            setLoading(false);
        } 
        catch(e){
            console.log('Error from api call ' , e);
        }
    }

    const getDates = async () => {
        try{
            const response = await fetch('http://localhost:8080/api/events/dates' ); 
            const eventDates = (await response.json()).data;  
            setEventDates(eventDates);
        }
        catch(e){
            console.log('Error from api call for dates ' , e);
        }
    }

    const filterData = async () => {
        setLoading(true); 
        const timeStamp = moment(new Date(date).toISOString()).unix();
        let tempData = data.filter(event => ((date ? moment(event.date, 'DD-MM-YYYY').unix() >= timeStamp : true)  && (seatFilter.length === 0 ? true : seatFilter.includes(event.status)) && (tag ? event.category === tag : true)));
        setFilteredData(tempData);
        setLoading(false);
    }

    React.useEffect(()=>{
        fetchEvents();
    }, [searchText])

    React.useEffect(()=>{
        filterData();
    },[data])

    React.useEffect(()=>{
        getDates();
    },[])

    React.useEffect(() => {
        filterData();
    }, [date, searchText, tag, seatFilter])

    return (
        <div className={styles.container}>
            <Header tag={tag} setSeatFilter={setSeatFilter} seatFilter={seatFilter} setTag={setTag} searchText={searchText} setSearchText={setSearchText} />
            <div className={styles.mainBody}>
                <div className={styles.eventDetails}>
                    <PerfectScrollbar>
                        <Events loading={loading} date={date} filteredData={filteredData} />
                    </PerfectScrollbar>
                </div>
                <div className={styles.calendar}>
                    <Calendar
                        value={date}
                        onChange={(e) => setDate(e)}
                        tileClassName={({ date, view }) => {
                            for (let eventDate of eventDates) {
                                if (eventDate === moment(date).format("DD-MM-YYYY")) {
                                    return 'highlight'
                                }
                                // return 'normal'
                            }

                        }}
                    />
                </div>
            </div>
        </div>
    )
}

export default Home
