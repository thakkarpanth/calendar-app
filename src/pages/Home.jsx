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
    
    const [tag, setTag] = React.useState('');
    const [searchText, setSearchText] = React.useState('');
    const [seatFilter, setSeatFilter] = React.useState([]);
    const [date, setDate] = React.useState(new Date());
    const [eventDates, setEventDates] = React.useState([]);
    const [loading , setLoading] = React.useState(false);
    const [data , setData] = React.useState([]);
    const [page , setPage] = React.useState(0); 
    const [count , setCount] = React.useState(0);

    const fetchEvents = async (pageParam = page) => {
        try{
            setLoading(true);
            const response = await fetch(`http://localhost:8080/api/events?search=${searchText}&date=${date}&seatFilter=${seatFilter.join(',')}&tag=${tag}&page=${pageParam}`);
            const resJson = await response.json(); 
            
            
            if(pageParam === 0)
                setData(resJson.data || []);
            else 
                setData([... data , ... resJson.data || []])
            setCount(resJson.count);
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


    React.useEffect(()=>{
        fetchEvents(0);
        setPage(0); 
    }, [date, searchText, tag, seatFilter])


    React.useEffect(()=>{
        getDates();
    },[])


    React.useEffect(() =>{
        fetchEvents();
    },[page])

    return (
        <div className={styles.container}>
            <Header tag={tag} setSeatFilter={setSeatFilter} seatFilter={seatFilter} setTag={setTag} searchText={searchText} setSearchText={setSearchText} />
            <div className={styles.mainBody}>
                <div className={styles.eventDetails}>
                    <PerfectScrollbar>
                        <Events count={count} page={page} setPage={setPage} loading={loading} date={date} filteredData={data} />
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
                            }

                        }}
                    />
                </div>
            </div>
        </div>
    )
}

export default Home
